/**
 * Created by esolovyev on 25.02.2016.
 */

var template = require('../b-submit.ihtml'),

    Submit = Ractive.extend({

        template,

        data() {

            return {
                type: 'submit'
            }
        },

        oninit() {

            this.on('submit', e => {

                let context = this.get(),
                    form = this.get('form');

                RG.events.publish(`form.${form}.submit`, context);
            });
        }
    });

module.exports = Submit;
