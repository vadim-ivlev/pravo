/**
 * Created by esolovyev on 07.03.2016.
 */

var Button = require('../../b-button/scripts/Button'),
    template = require('../b-form-message.ihtml'),

    FormMessage = Ractive.extend({

        template,

        components: {
            'rg-button': Button
        },

        oninit() {

            let form = this.get('form');
        
            RG.events.subscribe(`form.${form}.message.show`, topic => {

                RG.logger.info(topic);

                this.set('show', true);
            }); 

            RG.events.subscribe(`form.${form}.message.hide`, topic => {
                
                RG.logger.info(topic);                
                this.set('show', false);

            });
        }
    });

module.exports = FormMessage;
