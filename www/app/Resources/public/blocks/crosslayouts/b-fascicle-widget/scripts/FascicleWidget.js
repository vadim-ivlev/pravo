var template = require('../b-fascicle-widget.ihtml'), 

    FascicleWidget = Ractive.extend({

        template,

    	data() {
            return {
                elems: null
            }
        },

        oninit() {

            RG.logger.debug('FascicleWidget');

            RG.logger.debug(this.get());

            this.set('elems', this.get('elems'));

        }

    });

module.exports = FascicleWidget;