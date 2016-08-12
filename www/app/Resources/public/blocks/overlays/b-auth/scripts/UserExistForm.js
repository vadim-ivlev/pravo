/**
 * Created by esolovyev on 13.10.2015.
 */

var template = require('../user-exist-form.ihtml'),

    UserExistForm = Ractive.extend({
        template,
        el: 'authContent',
        oninit() {

            RG.logger.debug('UserExistForm');

            /**
             * По нажатию кнопки отправить вызывает событие auth.user.merge
             * и передаёт ему данные
             */
            this.on('confirm', event => {

                let id = this.get('id');
                /**
                 * Публикует событие для других компонентов
                 */
                RG.events.publish('auth.user.merge', id);

                event.original.preventDefault();
            });

            /**
             * По нажатию кнопки отправить вызывает событие auth.signup
             * и передаёт ему данные
             */
            this.on('decline', event => {

                let user = this.get('user');
                /**
                 * Публикует событие для других компонентов
                 */
                RG.events.publish('auth.signup', {
                    user,
                    social: true,
                    tab: 'registration'});

                event.original.preventDefault();
            });
        },

        /**
         * Включает загрузку
         */
        loading() {
            this.set('loading', true);
        },
    });

module.exports = UserExistForm;