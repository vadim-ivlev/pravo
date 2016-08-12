/**
 * Created by esolovyev on 01.02.2016.
 */

var template = require('../b-spinner.ihtml'), // подкючение шаблона

    Spinner = Ractive.extend({

        template,

        data() {
            return {
                txt: '',
                loading: false,
                class: ''
            };
        },

        oninit() {

            RG.logger.debug('Spinner');

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

module.exports = Spinner;/**
 * Created by esolovyev on 01.02.2016.
 */

var template = require('../b-spinner.ihtml'), // подкючение шаблона

    Spinner = Ractive.extend({

        template,

        data() {
            return {
                txt: '',
                loading: false,
                class: ''
            };
        },

        oninit() {

            RG.logger.debug('Spinner');

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

module.exports = Spinner;