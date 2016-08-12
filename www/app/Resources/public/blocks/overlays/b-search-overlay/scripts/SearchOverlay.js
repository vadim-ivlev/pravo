 /**
 * Created by esolovyev on 08.11.2015.
 */

var data = require('../data/b-search-overlay'),

    //SearchBar = require('../../../crosslayouts/b-search-bar/scripts/SearchBar'), // подключаем глобально

    template = require('../b-search-overlay.ihtml'),

    SearchOverlay = Ractive.extend({

        el: 'searchOverlay',

        template,

         data() {
            return {
                suggestions: data.suggestions
            }
         },

        /*components: {
            'search-bar': SearchBar
        },*/

        oninit() {

            RG.logger.debug('SearchOverlay');


            this.on('suggest', event => {

                RG.events.publish('search.keywords', event.context);
                RG.events.publish('search.bar.find');

                event.original.preventDefault();
            });
        },

        onrender() {
            RG.events.publish('overlay.resize');
        }
    });

module.exports = SearchOverlay;