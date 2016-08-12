5/**
 * Created by esolovyev on 19.11.2015.
 */

var template = require('../search-results.ihtml'),

    SearchResults = Ractive.extend({

        el: 'searchResults',

        template,

        data() {
            return {
                dateFormat: RG.datetime.parseVmDate
            }
        },

        oninit() {
            RG.logger.debug('SearchResults');

            this.on('load', event => {

                RG.events.publish('search.load');
                
                this.set('loading', true);

                event.original.preventDefault();
                event.original.stopPropagation();
            });

            RG.events.subscribe('search.find', this.set.bind(this, 'loading', true));
            RG.events.subscribe('search.result.show', topic => {
                this.set('showResult', true);
                this.set('loading', false);
            });
        }
    });

module.exports = SearchResults;