/**
 * Created by esolovyev on 19.11.2015.
 */

var template = require('../b-sujet-materials.ihtml'),

    SujetMaterials = Ractive.extend({

        //el: 'sujetMaterials',

        template,

        data: () => {
            return {
                items: null,
                dateFormat: RG.datetime.parseVmDate
            };
        },

        oninit() {

            RG.logger.debug('SujetMaterials');
        },

        onrender() {

            this.observe('items', (nItems, oItems) => {

                if (nItems && nItems.length && nItems !== oItems) {
                    var el = $(this.nodes.sujetList);

                    RG.events.publish('scroll.init', el);
                }
            });

            RG.events.publish('overlay.resize');
        }
    });

module.exports = SujetMaterials;