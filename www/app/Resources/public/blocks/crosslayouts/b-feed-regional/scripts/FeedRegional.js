/**
 * Created by esolovyev on 22.01.2016.
 */

var FeedRegional = Ractive.extend({

        el: 'lastNewsRegional',

        oninit() {

            RG.logger.debug('FeedRegional');

            this.on({

                'load': event => {


                    event.original.preventDefault();
                }
            });

            RG.events.registerList({
                'geolocation.region.changed': topic => {


                }
            });
        }
    });

module.exports = FeedRegional;