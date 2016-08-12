/**
 * Created by esolovyev on 15.03.2016.
 */

var InputNotification = require('../../../forms/b-input-notification/scripts/InputNotification'),

    template = require('../b-mailing.ihtml'),
    data = require('../data/b-mailing.js'),

    Mailing = Ractive.extend({

        template,

        components: {
            'input-notification': InputNotification
        },

        data() {
            return {
                subscribed: false
            }
        },

        oninit() {

            RG.logger.debug('Mailing');

            var type = this.get('type'),
                txt = data[type].txt;

            this.set('txt', txt);
            /**
             * Локальные событие
             */
            this.on({

                /**
                 * @param event
                 */
                'subscribe': event => {

                    var subscribed = this.get('subscribed');

                    if (RG.session.isAuthorized()) {

                        subscribed ? RG.events.publish(`subscribe.${type}.remove`) :
                            RG.events.publish(`subscribe.${type}.add`);
                    } else {

                        RG.events.publish('login');
                    }

                    event.original.preventDefault();
                },

                'faq': event => {

                    var msg = data[type].msg;

                    RG.logger.trace(msg);

                    this.set('msg', null);
                    this.set('msg', msg);

                    event.original.preventDefault();
                }
            })

            RG.events.subscribe(`subscribe.${type}.added`, topic => {

                RG.logger.info(topic);

                this.set('subscribed', true);
            })

            RG.events.subscribe(`subscribe.${type}.removed`, topic => {

                RG.logger.info(topic);

                this.set('subscribed', false);
            })
        }
    });

module.exports = Mailing;