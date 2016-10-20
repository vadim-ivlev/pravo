/**
 * Created by esolovyev on 16.11.2015.
 */

var template = require('../b-search-bar.ihtml'),
    SearchBar = Ractive.extend({

        template,

        data() {
            return {
                keywords: '',
                type: null,

            };
        },

        oninit() {
            RG.logger.debug('SearchBar');

            this.on({
                'find': event => {

/*                    switch(this.get('type')) {

                        case 'redirect':

                            let keywords = this.get('keywords');

                            window.location = `${window.location.origin}/search/?keywords=${keywords}`;

                            break;

                        default:
                            RG.events.publish('search.find');
                    }*/

                    RG.events.publish('search.bar.find');

                    event.original.preventDefault();
                    event.original.stopPropagation();
                }
            });

            this.observe('keywords', (nVal, oVal) => {

                if(!_.isEmpty(nVal.trim()) && !_.isEmpty(oVal.trim()) && nVal.trim() !== oVal.trim()) {

                    RG.events.publish('search.filters.update', {
                        keywords: this.get('keywords')
                    });
                }
            });

            RG.events.subscribe('search.keywords', (topic, sugestion) => {

                let word = sugestion || '';
                
                this.set('keywords', word);
                //RG.events.publish('search.find');
            });

            RG.events.subscribe('search.find', (topic) => {

                this.set('loading', true);
            });

            RG.events.subscribe('search.result.show', (topic) => {

                this.set('loading', false);
            });

            RG.events.subscribe('search.bar.find', (topic) => {

                RG.logger.info('search.bar.find');

                switch(this.get('type')) {

                    case 'redirect':

                        let keywords = this.get('keywords');

                        window.location = encodeURI(`${window.location.origin}/search/?keywords=${keywords}`);

                        break;

                    default:
                        RG.events.publish('search.find');
                }
            });
        },

        onrender() {

            this.nodes.searchInput.focus();
        }
    });

module.exports = SearchBar;