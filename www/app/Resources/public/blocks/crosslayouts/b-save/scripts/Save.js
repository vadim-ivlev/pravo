
var template = require('../b-save.ihtml'),

    Save = Ractive.extend({

        template,

        data() {
            return {
                saved: true
            }
        },

        oninit() {

            RG.logger.debug('Save-material');

            /**
             * Локальные событие
             */
            this.on({

                /**
                 * @param event
                 */
                'save': event => {

                    var active = this.get('saved'),
                        id = this.get('material');

                    if(RG.session.isAuthorized()) {

                        active ? RG.events.publish('subscribe.saved.remove', id) :
                            RG.events.publish('subscribe.saved.add', id);
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
                'subscribe.saved.added': (topic, id) => {

                    //RG.logger.info(topic);

                    var materialId = +this.get('material');

                    if(materialId === +id) {

                        this.set('saved', true);
                    }
                },

                /**
                 * @param topic
                 * @param id
                 */
                'subscribe.saved.removed': (topic, id) => {

                    RG.logger.info(topic);

                    var materialId = +this.get('material');

                    if(materialId === +id) {

                        this.set('saved', false);
                    }
                }
            });
        }
    });

module.exports = Save;