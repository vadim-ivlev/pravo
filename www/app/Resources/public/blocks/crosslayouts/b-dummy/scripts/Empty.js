/**
 * Created by esolovyev on 04.02.2016.
 */

var template = require('../b-dummy_empty.ihtml'), // подкючение шаблона

    data = require('../data/b-dummy_empty'),

    DummyEmpty = Ractive.extend({

        template,

        data() {
            return {
                userName: RG.session.getUserData().firstName
            };
        },

        oninit() {

            RG.logger.debug('Spinner');

            this.observe('type', type => {
                if(data[type]) {

                    this.set(data[type]);
                } else {
                    
                }
            })

            /**
             *
             * Локалные события
             */
            this.on({
                'test': event => {

                    event.original.preventDefault();
                }
            });

            /**
             * Глобальные события
             */
            RG.events.registerList({

                'test': topic => {

                }
            });
        },
    });

module.exports = DummyEmpty;