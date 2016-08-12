/**
 * Created by esolovyev on 16.11.2015.
 */

var template = require('../list.ihtml'),

    List = Ractive.extend({

        template,

        oninit() {
            RG.logger.debug('List');

            this.on('logout', event => {

                RG.events.publish('logout');

                event.original.preventDefault();
            });

            this.on('login', event => {


                RG.events.publish('login');

                event.original.preventDefault();
            });
        }
    });

module.exports = List;