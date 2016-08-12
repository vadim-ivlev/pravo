/**
 * Created by esolovyev on 09.12.2015.
 */

var msg = RG.config.messages,
    formats = RG.config.formats,
    succesMsg = require('./config').messages.success,
    template = require('../user.ihtml'), // подкючение шаблона

    User = Ractive.extend({

        template,

        data() {
            return {
                firstNameErrorMsg: '',
                lastNameErrorMsg: '',
                emailErrorMsg: '',
                successMsg: '',
                user: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    region: 22
                },
                _:_
            };
        },

        oninit() {

            RG.logger.debug('User');

            this.set('regions', RG.config.regions);

            /**
             * Слушает изменения email и проверят правильность введённых данных
             */
            this.observe('user.email', this.checkEmail.bind(this));

            /**
             * Слушает изменения имени и проверят правильность введённых данных
             */
            this.observe('user.firstName', this.checkName.bind(this));

            /**
             * Слушает изменения фамилии и проверят правильность введённых данных
             */
            this.observe('user.lastName', this.checkName.bind(this));

            /**
             * По нажатию кнопки отправить вызывает событие account:data:send
             * и передаёт ему данные
             */
            this.on('save', this.save.bind(this));

            RG.events.registerList({

                'account.saved': (topic, user) => {

                    RG.logger.info(topic);

                    var region = _.findWhere(RG.config.regions, {id: user.region});

                    this.set('loading', false);
                    this.on('save', this.save.bind(this));

                    this.set('successMsg', null);
                    this.set('successMsg', succesMsg);

                    RG.events.publish('geolocation.region.changed', region);
                },

                'account.profile.user': (topic, user) => {

                    RG.logger.info(topic);

                    this.set('user', user);
                },

                'geolocation.region.changed': (topic, region) => {

                    this.set('user.region', region.id);
                }
            });
        },

        save(event) {

            let user = this.get('user');

            if(this.get('firstNameNotValid')) {

                this.notValid(msg.nameNotValid, 'firstName');

            } else if(this.get('lastNameNotValid')) {

                this.notValid(msg.nameNotValid, 'lastName');

            } else if(this.get('emailNotValid')) {

                this.notValid(msg.emailNotValid, 'email');

            } else {

                /**
                 * Публикует событие для других компонентов
                 */
                this.set('loading', true);
                RG.events.publish('account.user.save', user);
            }

            this.off('save');

            event.original.preventDefault();
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

module.exports = User;