/**
 * Created by esolovyev on 28.11.2015.
 */

var template = require('../b-viewed.ihtml'),

    Viewed = Ractive.extend({

        el: 'viewed',

        template,

        oninit() {
            
            RG.logger.debug('Viewed');

            RG.events.publish('overlay.resize');
        }
    });

module.exports = Viewed;