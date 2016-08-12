/**
 * Created by esolovyev on 29.01.2016.
 */

var LiveReload = Ractive.extend({

    data() {
        return {
            dateFormat: RG.datetime.parseVmDate
        }
    },

    oninit() {

        //RG.logger.log(this.get());

        RG.logger.debug('LiveReload');

        /*this.on({

        });

        RG.events.registerList({

        });*/
    }

});

module.exports = LiveReload;