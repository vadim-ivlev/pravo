/*if(RG.config.env === 'dev') {

    require('./test/Ajax-mock');
}*/

var SearchHead = require('../../b-search-head/scripts/SearchHead'),
    SearchResults = require('./SearchResults'),

    searchTemplate = require('../../b-search-head/b-search-head.ihtml'),
    documentTemplate = require('../../b-search-head/b-search-head_doc.ihtml'),

    config = require('./config'),
    
    registerList = RG.events.registerList,

    searchHead = null,
    searchResults = null,

    document = false,

    filters = {
        keywords: '',
        limit: 20,
        offset: 0,
        filters: [],
        view: 'json',
        highlight: 0,
        sort_mode: 'timestamp'
    },

    
    searchRun = (topic) => {

        let resultTemplate = document ?  RG.config.paths.tmpl.bNewsInner_doc : RG.config.paths.tmpl.bNewsInner;

        searchHead = new SearchHead({template: document ? documentTemplate : searchTemplate});

        filters.limit = document ? 50 : filters.limit;
        filters.filters = document ? [['obj_kind', 'doc']] : filters.filters;

        $.get(resultTemplate)
            .then(data => {
                searchResults = new SearchResults({
                    partials: {
                        item: data
                    }
                });
            });

        getQuery();
    },

    run = () =>{

        RG.events.publish('search.run');
    },

    searchFind = topic => {

        RG.logger.info(topic);

        RG.events.publish('search.get.result');
    },

    searchSort = (topic, sortType) => {

        RG.logger.info(topic);

        switch(sortType) {
            case 'date':

                filters.sort_mode = 'timestamp';
                break;

            case 'relevant':

                filters.sort_mode = 'relevance';
                break;
        }

        RG.events.publish('search.find');
    },

    updateFilters = (topic, data) => {

        RG.logger.info(topic);

        let dateIndex = null,
            query = RG.query.get() || {},

            from = data.from ? data.from
                .split('.')
                .reverse()
                .join('') : null,
            to = data.to ? data.to
                .split('.')
                .reverse()
                .join('') : null;

        filters.keywords = typeof data.keywords === 'undefined' ? filters.keywords : data.keywords;

        filters.filters = _.filter(filters.filters, elem => { return elem[0] !== 'obj_kind'});

        if(data.materialTypes) {
            data.materialTypes.forEach(el => {

                filters.filters.push(['obj_kind', el]);
            });
        }

        filters.filters = _.filter(filters.filters, elem => { return elem[0] !== 'org'});

        if(data.org) {
            data.org.forEach(el => {

                filters.filters.push(['org', el]);
            });
        }

        filters.filters = _.filter(filters.filters, elem => { return elem[0] !== 'project'});

        if(data.projects) {
            data.projects.forEach(el => {

                filters.filters.push(['project', el]);
            });
        }



        filters.filters = _.filter(filters.filters, elem => { return elem[0] !== 'theme'});

        if(data.themes) {

            data.themes.forEach(el => {

                filters.filters.push(['theme', el]);
            });
        }

        filters.filters = _.filter(filters.filters, elem => { return elem[0] !== 'doctype'});

        if(data.doctype) {
            data.doctype.forEach(el => {

                filters.filters.push(['doctype', el]);
            });
        }

        filters.filters = _.filter(filters.filters, elem => { return !_.isEmpty(elem[1]); });

/*        if(statuses) {

            statuses.forEach(el => {

                filters.filters.push(['theme', el]);
            });
        }*/

        filters.filters = _.filter(filters.filters, elem => { return elem[0] !== 'range_yyyymmdd'});

        if(from && to) {

            filters.filters.push(['range_yyyymmdd', [from, to]]);
        }

        filters.filters = _.filter(filters.filters, elem => { return elem[0] !== 'obj_kind'});

        if(document) {

            filters.filters.push(['obj_kind', 'doc']);
        }

        RG.logger.trace(filters.filters);

        RG.logger.trace(query);
        RG.logger.trace(data);

        RG.query.set(data);
    },

    getResult = (topic, load) => {

        RG.logger.info(topic);

        $.ajax({
            url: config.paths.root,
            method: 'post',
            data: JSON.stringify(filters),

            dataType: 'json',
            contentType: 'application/json',

            success(data) {

                if(load) {

                    RG.events.publish('search.result.append', data);
                } else {

                    RG.events.publish('search.result.show', data);
                }
            },

            error() {

                RG.logger.error(arguments);
            }
        });
    },

    resultShow = (topic, data) => {

        RG.logger.info(topic);

        let result = data.items;

        searchResults.set('items', result);

        searchResults.set('loadMore', !(result.length < 20));
    },

    resultAppend = (topic, data) => {

        RG.logger.info(topic);

        let result = data.items,
            items = searchResults.get('items');

        Array.prototype.push.apply(items, result);

        searchResults.set('items', items);
        searchResults.set('loading', false);
    },

    searchLoad = (topic) => {

        filters.offset += document ? 50 : 20;
        RG.events.publish('search.get.result', true);
    },

    getQuery = () => {

        let query = RG.query.get(),
            show = false,
            data = {};

        if(query) {

            if(!_.isEmpty(query.keywords)) {

                filters.keywords = decodeURI(query.keywords) || '';
                RG.events.publish('search.keywords', filters.keywords);

                query = _.remove(query, 'keywords');
            }

            if(!_.isEmpty(query.from) && !_.isEmpty(query.to)) {

                data.from = query.from;
                data.to = query.to;

                query = _.remove(query, 'from');
                query = _.remove(query, 'to');
            }

            data = _.extend(data, _.object(_.map(query, (param, key) => {

                return [key, param.split(',')];
            })));

            if(!_.isEmpty(data)) {

                RG.events.publish('search.filters.update', data);
            }

            RG.events.publish('search.find');
        }
    },

    setQuery = (topic, data) => {

        return RG.query.set(data);
    },

    init = (type) => {

        document = type || false;

        /**
        * События
        */
        registerList({

            'search.run': searchRun,

            'search.find': searchFind,

            'search.sort': searchSort,

            'search.load': searchLoad,

            'search.filters.update': updateFilters,
            'search.get.result': getResult,
            'search.result.show': resultShow,
            'search.result.append': resultAppend,
        });
    },

    destruct = () => {

        RG.events.unsubscribe('search');
    };

module.exports = {
    init,
    run,
    destruct
};