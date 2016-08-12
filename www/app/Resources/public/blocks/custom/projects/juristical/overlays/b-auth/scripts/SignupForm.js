/**
 * Created by esolovyev on 05.10.2015.
 */

var msg = require('./config').messages, // Оповещения и сообщения об ошибках
    formats = RG.config.formats, // Регулярное вырожения для проверки

    template = require('../signup-form.ihtml'),

    SignupForm = Ractive.extend({
        template,
        el: 'authContent',
        oninit() {

            RG.logger.debug('SignupForm');

            /**
             * Слушает изменения email и проверят правильность введённых данных
             */
            this.observe('email', this.checkEmail.bind(this));

            /**
             * Слушает изменения имени и проверят правильность введённых данных
             */
            this.observe('first_name', this.checkName.bind(this));

            /**
             * Слушает изменения фамилии и проверят правильность введённых данных
             */
            this.observe('last_name', this.checkName.bind(this));

            /**
             * По нажатию кнопки отправить вызывает событие auth:data:send
             * и передаёт ему данные
             */
            this.on('submit', event => {

                let user = {
                        first_name: this.get('first_name'),
                        last_name: this.get('last_name'),
                        email: this.get('email')
                    },
                    social = this.get('social');

                if(this.get('first_nameNotValid')) {

                    this.notValid(msg.nameNotValid, 'first_name');

                } else if(this.get('last_nameNotValid')) {

                    this.notValid(msg.nameNotValid, 'last_name');

                } else if(this.get('emailNotValid')) {

                    this.notValid(msg.emailNotValid, 'email');

                } else {

                    /**
                     * Публикует событие для других компонентов
                     */
                    RG.events.publish('auth.user.save', {
                        user,
                        social
                    });
                }

                event.original.preventDefault();
            })
        },

        /**
         * Включает загрузку
         */
        loading() {
            this.set('loading', true);
        },

        /**
         * Вызывает сообщение если email не валидный
         */
        notValid(msg, type) {
            var msg = msg || 'Формат данных не верный';
            var type = type || 'email';
            this.callError(msg, type);
        },

        /**
         * Включает вызов ошибки
         */
        callError(msg, type) {
            this.set('loading', false);
            this.set(`${type}ErrorMsg`, null);
            this.set(`${type}ErrorMsg`, msg);
        },

        /**
         * Проверяет правильность email и отключает кнопку отправки, если email не верный
         */
        checkEmail(newEmail, oldEmail) {

            if(newEmail !== oldEmail) {

                if(formats.email.test(newEmail)) {
                    this.set('emailNotValid', false);
                } else {
                    this.set('emailNotValid', true);
                }
            }
        },

        /**
         * Проверяет правильность введённого имени
         */
        checkName(newName, oldName, keypath) {

            if(newName !== oldName) {

                if(formats.name.test(newName)) {
                    this.set(`${keypath}NotValid`, false);
                } else {
                    this.set(`${keypath}NotValid`, true);
                }
            }
        }
    });

module.exports = SignupForm;