/**
 * Created by esolovyev on 09.12.2015.
 */

var template = require('../subscriptions.ihtml'), // подкючение шаблона
    messages = require('./config').messages,

    Subscriptions = Ractive.extend({

        template,

        data() {
            return {
                notificationClass: '',
                sujetsMsg: '',
                commentsMsg: '',
                mentionsMsg: '',
                freshMsg: '',
                docMsg: ''
            };
        },

        oninit() {

            RG.logger.debug('Subscriptions');

            /**
             *
             * Локалные события
             */
            this.on({
                'subscribe': (event, type) => {

                    RG.events.publish('account.subscribe', type);
                    event.original.preventDefault();
                }
            });

            /**
             * Глобальные события
             */
            RG.events.registerList({

                'account.subscribed': (topic, type) => {

                    RG.logger.info(topic);

                    var notificationClass = '',
                        msg = '';
                    
                    this.toggle(`user.${type}`);

                    if(this.get(`user.${type}`)) {

                        notificationClass = 'b-input-notification_success';
                        msg = messages[type][1];
                    } else {

                        notificationClass = 'b-input-notification_error';
                        msg = messages[type][0];
                    }

                    this.set('notificationClass', notificationClass);
                    this.set(`${type}Msg`, null);
                    this.set(`${type}Msg`, msg);
                },

                'account.profile.user': (topic, user) => {

                    this.set('user', user);
                }
            });
        },
    });

module.exports = Subscriptions;