
var template = require('../b-follow.ihtml'),

    Follow = Ractive.extend({

        template,

        data() {
            return {
                subscribed: true
            }
        },

        oninit() {

            RG.logger.debug('Follow-sujets');

            /**
             */
            this.on({

                /**
                 * @param event
                 */
                'follow': event => {

                    var active = this.get('subscribed'),
                        id = this.get('sujet');

                    if(RG.session.isAuthorized()) {

                        active ? RG.events.publish('subscribe.sujet.remove', id) :
                            RG.events.publish('subscribe.sujet.add', id);
                    } else {

                        RG.events.publish('login');
                    }

                    event.original.preventDefault();
                }
            })

            RG.events.registerList({

                /**
                 * @param topic
                 * @param id
                 */
                'subscribe.sujet.added': (topic, sujet) => {

                    //RG.logger.info(topic);

                    var sujetId = +this.get('sujet');

                    if(sujetId === +sujet.id) {

                        this.set('subscribed', true);
                    }
                },

                /**
                 * @param topic
                 * @param id
                 */
                'subscribe.sujet.removed': (topic, sujet) => {

                    RG.logger.info(topic);

                    var sujetId = +this.get('sujet');

                    if(sujetId === +sujet.id) {

                        this.set('subscribed', false);
                    }
                }
            });
        }
    });

module.exports = Follow;