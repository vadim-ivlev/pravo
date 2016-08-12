/**
 * Created by esolovyev on 19.10.2015.
 */

var msg = require('./config').messages, // Оповещения и сообщения об ошибках
    emailFormat = RG.config.formats.email, // Регулярное вырожения для проверки email

    template = require('../email-form.ihtml'), // подкючение шаблона

    EmailForm = Ractive.extend({

        template,

        data: {
            errorMsg: '',
            email: ''
        },

        oninit() {

            RG.logger.debug('EmailForm');

            this.set('emailNotValid', true);

            /**
             * Слушает изменения email и проверят правильность введённых данных
             */
            this.observe('email', this.checkEmail.bind(this));

            /**
             * По нажатию кнопки отправить вызывает событие auth:email:send
             * и передаёт ему введённый email
             */
            this.on('submit', event => {

                var email = this.get('email');

                if(this.get('emailNotValid')) {

                    this.notValid();

                } else {
                    /**
                     * Публикует событие для других компонентов
                     */
                    RG.events.publish('auth.send.email', email);
                }
                
                event.original.preventDefault();
            });

            RG.events.subscribe('auth.disable', topic => {
                this.set('disabled', true);
            });
        },

        /**
         * Включает загрузку
         */
        loading() {
            this.set('loading', true);
            this.set('disabled', true);
        },

        /**
         * Вызывает сообщение если email не валидный
         */
        notValid() {
            this.callError(msg.emailNotValid);
        },

        emailNotFound() {
            this.callError(msg.registrationOffer);
        },

        /**
         * Вызывает сообщение об ошибке, если код отправлен недавно
         */
        codeSend() {
            this.callError(msg.codeIsSent);
        },

        /**
         * Включает вызов ошибки
         */
        callError(msg) {

            var email = this.get('email');

            this.set('loading', false);
            this.set('erorr', true);
            this.set('disabled', false);
            this.set('errorMsg', null);
            this.set('errorMsg', msg);

            $('.b-auth__registration-link').on('click', event => {

                RG.events.publish('auth.signup', {tab: 'registration', user: {email}});
                event.preventDefault();
            });

            $('.b-auth__code-link').on('click', event => {

                RG.events.publish('auth.expect.code', {tab: 'enter', user: {email}});
                event.preventDefault();
            });
        },

        /**
         * Проверяет правильность email и отключает кнопку отправки, если email не верный
         */
        checkEmail(newEmail, oldEmail) {

            if (newEmail !== oldEmail) {

                if (emailFormat.test(newEmail)) {
                    this.set('emailNotValid', false);
                    this.set('error', false);
                } else {
                    this.set('emailNotValid', true);
                }
            }
        }
    });

module.exports = EmailForm;