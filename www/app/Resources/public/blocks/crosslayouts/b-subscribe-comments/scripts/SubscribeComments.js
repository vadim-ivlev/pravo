/**
 * Created by esolovyev on 22.12.2015.
 */

var template = require('../b-subscribe-comments.ihtml'),

    SubscribeComments = Ractive.extend({

        template,

        data() {
            return {
                material: RG.meta.getMaterial(),
                subscribed: !RG.meta.getMaterial(),
                txt: '',
                subscribeMsg: '',
                subscribeClass: ''
            }
        },

        oninit() {

            RG.logger.debug('SubscribeComments');

            /**
             * Локальные событие
             */
            this.on({

                /**
                 * Подписаться\отписаться на сюжет
                 * @param event
                 */
                'subscribe': event => {

                    var active = this.get('subscribed'),
                        id = this.get('material');

                    if(RG.session.isAuthorized()) {
                        active ? RG.events.publish('subscribe.comments.remove', id) :
                            RG.events.publish('subscribe.comments.add', id);
                    } else {
                        RG.events.publish('login');
                    }

                    event.original.preventDefault();

                }
            });

            RG.events.registerList({

                'subscribe.comments.added': (topic, id) => {

                    //RG.logger.info(topic);

                    let material = this.get('material');

                    if(id === material) {

                        this.set('subscribed', true);

                        this.set('subscribeClass', 'b-input-notification_success');
                        this.set('subscribeMsg', null);
                        this.set('subscribeMsg', 'Вы подписались на комментарии');
                    }
                },
                'subscribe.comments.removed': (topic, id) => {

                    RG.logger.info(topic);

                    let material = this.get('material');

                    if(id === material) {

                        this.set('subscribed', false);

                        this.set('subscribeClass', 'b-input-notification_error');
                        this.set('subscribeMsg', null);
                        this.set('subscribeMsg', 'Вы отписались от комментариев');
                    }
                }
            });
        }
    });

module.exports = SubscribeComments;