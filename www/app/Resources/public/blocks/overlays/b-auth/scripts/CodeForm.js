/**
 * Created by esolovyev on 05.10.2015.
 */

var msg = require('./config').messages, // Оповещения и сообщения об ошибках
    codeFormat = RG.config.formats.conformAtionCode, // Регулярное вырожения для проверки кода

    template = require('../code-form.ihtml'), // подкючение шаблона

    CodeForm = Ractive.extend({
        template,
        el: 'authContent',

        data: {
            merge: false
        },

        oninit() {

            RG.logger.debug('CodeForm');

            this.set('codeNotValid', true); // не заполненый код не ваидный

            /**
             * Слушает изменения код и проверят правильность введённых данных
             */
            this.observe('code', this.checkCode.bind(this));

            this.on('submit', event => {

                let code = this.get('code');
                RG.events.publish(this.get('merge') ? 'auth.send.merge.code' : 'auth.send.confirm.code', code);

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
         * Вызывает сообщение если код не валидный
         */
        notValid() {

            this.callError(msg.codeNotValid);
        },

        /**
         * Включает вызов ошибки
         */
        callError(msg) {
            this.set('loading', false);
            this.set('error', true);
            this.set('errorMsg', null);
            this.set('errorMsg', msg)
        },

        /**
         * Проверяет правильность email и отключает кнопку отправки, если email не верный
         */
        checkCode(newCode, oldCode) {

            if (newCode !== oldCode) {

                if (codeFormat.test(newCode)) {
                    this.set('codeNotValid', false);
                } else {
                    this.set('codeNotValid', true);
                }
            }

        }
    });

module.exports = CodeForm;