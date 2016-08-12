/**
 * Created by esolovyev on 16.11.2015.
 */

var searchFilters = require('./config').searchFilters,
    documentsFilters = require('./config').documentsFilters,

    searchTemplate = require('../b-search-filters.ihtml'),
    documentTemplate = require('../b-search-filters_doc.ihtml'),

    SearchFilters = Ractive.extend({

        template() {
            return this.get('type') === 'search' ? searchTemplate : documentTemplate;
        },

        data() {
            return {
                paper: false,
                period: 'any',
                loading: false,

                // Добавил Леха
                hide: false // показать|скрыть блок
            };
        },

        oninit() {

            RG.logger.debug('SearchFilters');

            let query = RG.query.get(),
                resultFilters = {};

            this.set('searchFilters', this.get('type') === 'search' ? {
                    themes: [],
                    materialTypes: [],
                    projects: [],
                    origin: null
                } : {
                    themes: [],
                    doctype: [],
                    materialTypes: ['doc'],
                    statuses: [],
                    org: []
                });

            switch(this.get('type')) {

                case 'search':

                    this.set('filters', searchFilters);
                    break;

                case 'document':

                    this.set('filters', documentsFilters);
                    break;
            }

            this.on({
                'addFilter': this.addFilter.bind(this),
                'setPeriod': this.setPeriod.bind(this),
                'paper': this.setPaper.bind(this),
                'find': RG.events.publish.bind(RG.events, 'search.find'),
                'setOrigin': RG.events.publish.bind(RG.events, 'search.filters.update', this.get('searchFilters')),
            });

            if(query && !_.isEmpty(query)) {

                if(query.projects) {
                    resultFilters.projects = query.projects.split(',');
                }

                if(query.materialTypes) {
                    resultFilters.materialTypes = query.materialTypes.split(',');
                }

                if(query.doctype) {
                    resultFilters.doctype = query.doctype.split(',');
                }

                if(query.org) {
                    resultFilters.org = query.org.split(',');
                }

                if(query.themes) {
                    resultFilters.themes = query.themes.split(',');
                }

                if(query.statuses) {
                    resultFilters.statuses = query.statuses.split(',');
                }

                if(_.isString(query.from) && _.isString(query.to)) {

                    resultFilters.from = query.from;
                    resultFilters.to = query.to;
                }
                
                let filters = this.get('filters'),
                    searchFilters = _.extend(this.get('searchFilters'), resultFilters);

                this.set('searchFilters', searchFilters);

                _.each(filters, (item, index) => {

                    if(_.isArray(item)) {

                        _.each(item, (filter) => {

                            if(typeof searchFilters[index] != 'undefined' && searchFilters[index].indexOf(filter.value) !== -1) {
                                filter.checked = true;
                            }
                        });
                    }

                });

                this.set('filters', filters);

                //this.emitFilters();
            }

            RG.events.subscribe('search.find', (topic) => {

                this.set('loading', true);
            });

            RG.events.subscribe('search.result.show', (topic) => {

                this.set('showResult',true);
                this.set('loading', false);
            });

            RG.events.subscribe('date.picked', (topic, inst) => {

                RG.logger.info(topic);

                let from = inst.get('searchFilters.from') || moment().format('DD.MM.YYYY'),
                    to = inst.get('searchFilters.to') || moment().format('DD.MM.YYYY');

                from = moment(new Date(from.split('.').reverse().join('/')));
                to = moment(new Date(to.split('.').reverse().join('/')));

                if(from.diff(to) > 0) {

                    to = from;
                }

                this.set('searchFilters.from', from.format('DD.MM.YYYY'));
                this.set('searchFilters.to', to.format('DD.MM.YYYY'));

                this.emitFilters();
            });

            // Леха добавил
            let filterToggleTopic = this.get('filterTopic') || 'search.filters';

            RG.logger.log(filterToggleTopic);

            RG.events.subscribe(filterToggleTopic + '.show', (topic) => {

                RG.logger.info(topic + 'user');

                //this.set('show', isShow);
                this.toggle('show');
            });
        },

        addFilter(event, name) {

            let checked = `${event.keypath}.checked`,
                filters = this.get(`searchFilters.${name}`);

            this.toggle(checked);

            if(this.get(checked)) {

                Array
                    .prototype
                    .push
                    .call(filters, event.context.value);

                this.set(`searchFilters.${name}`, filters);
            } else {

                Array
                    .prototype
                    .splice
                    .call(filters, _.findIndex(event.context.value), 1);

                this.set(`searchFilters.${name}`, filters);
            }

            this.emitFilters();

            event.original.preventDefault();
            event.original.stopPropagation();
        },

        setPeriod(event, period) {

            let from = null,
                to = moment().format('DD.MM.YYYY');

            switch(period) {

                case 'any':

                    break;
                case 'today':

                    from = moment();
                    break;
                case 'yestarday':

                    from = moment().subtract(1, 'days');
                    to = moment().subtract(1, 'days').format('DD.MM.YYYY');
                    break;
                case 'week':

                    from = moment().subtract(1, 'weeks');
                    break;
                case 'month':

                    from = moment().subtract(1, 'months');
                    break;
                case 'year':

                    from = moment().subtract(1, 'years');
                    break;
            }

            this.set('searchFilters.to', to);
            this.set('searchFilters.from', from.format('DD.MM.YYYY'));

            this.emitFilters();

            event.original.preventDefault();
            event.original.stopPropagation();
        },

        setPaper(event) {

            this.toggle('paper');

            event.original.preventDefault();
            event.original.stopPropagation();
        },

        emitFilters() {

            var data = _.objFilter(this.get('searchFilters'), elem => {

                return !_.isEmpty(elem);
            });

            RG.events.publish('search.filters.update', data);
        }
    });

module.exports = SearchFilters;