/**
 * Created by esolovyev on 16.11.2015.
 */

var //SearchBar = require('../../../crosslayouts/b-search-bar/scripts/SearchBar'), подключаем глобально
    //Filters = require('../../../crosslayouts/b-search-filters/scripts/Filters'),
    //RowInfo = require('./RowInfo'),

    SearchHead = Ractive.extend({

        el: 'searchHead',


        data() {
            return {
            };
        },

        components: {
            //'search-bar': SearchBar,
            //'filters': Filters,
            //'row-info': RowInfo
        },

        oninit() {
            RG.logger.debug('SearchHead');

            this.on('filters', event => {
                RG.events.publish('search.filters.show');

                event.original.preventDefault();
                event.original.stopPropagation();
            });

            // Подписываемся на событие показать фильтры
            RG.events.subscribe('search.filters.show', this.showFilters.bind(this));
        },

        showFilters(topic) {

            RG.logger.info(topic);

            this.toggle('filtersShown');
        },
    });

module.exports = SearchHead;