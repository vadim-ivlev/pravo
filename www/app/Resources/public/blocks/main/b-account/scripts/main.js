/**
 * Created by esolovyev on 11.10.2015.
 */

/**,
 * Подключение вспомогательный модулей
 */
var Ajax = require('./helpers/Ajax'),

    config = require('./config'),

    /**
     * Подулючение компонентов
     */
    Account = require('./Account'),

    /**
     * Сокращённые названия
     */
    publish = RG.events.publish,
    registerList = RG.events.registerList,

    error = RG.logger.error,
    debug = RG.logger.debug,
    warn = RG.logger.warn,
    info = RG.logger.info,
    isAuthorized = RG.session.isAuthorized,

    /**
     * Приватные переменные
     */
    account = null,

    profile = null,
    services = null,

    selectedTab = null,
    selectedType = null,

/**************************************************************************************
 ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
 *************************************************************************************/

    setTabs = () => {

        if(isAuthorized()) {

            selectedTab = document.location.pathname.split('/')[2] || 'profile';
            selectedType = document.location.pathname.split('/')[3] || 'sujets';

            switch(selectedTab) {

                case 'services':

                    publish('account.services.show');
                    break;

                case 'profile':

                default:
                    publish('account.profile.show');
                    break;
            }
        } else {

            window.location.replace('/');
        }
    },

/**************************************************************************************
 МЕТОДЫ СОБЫТИЙ
 *************************************************************************************/

    save = (topic, user) => {

        RG.logger.info(topic);

        Ajax.info(user).then(data => {

            _.each(user, (item, name) => {
                profile[name] = item;
            });

            RG.events.publish('account.saved', user);
        });
    },

    subscribe = (topic, type) => {

        RG.logger.info(topic);

        let data = {
            mentions: ~~(profile.mentions),
            sujets: ~~(profile.sujets),
            comments: ~~(profile.comments),
            fresh: ~~(profile.fresh),
            doc: ~~(profile.doc)
        };

        data[type] = ~~(!data[type]);

        Ajax.subscribe(data).then(data => {

            profile[type] = !profile[type];
            RG.events.publish('account.subscribed', type);
        });
    },

    showProfile = topic => {

        RG.logger.info(topic);

        var data = {
            profile: true,
            services: false
        };

        if(account) {
            account.set('showContent', false);
        }

        publish('account.tabs.show', 1);

        if(profile) {

            account.set(_.extend(data, {showContent: true}));

            RG.events.publish('account.profile.user', profile);

            if(profile.social) {
                RG.events.publish('account.profile.social', profile.social);
            }

        } else {

            Ajax.getProfile().then(response => {

                profile = response;

                account = new Account({data});

                RG.events.publish('account.profile.user', profile);

                if (profile.social) {
                    RG.events.publish('account.profile.social', profile.social);
                }

                account.set('showContent', true);
            });
        }

        history.pushState({tab: 'profile'}, 'Профиль', `/account/profile`);

    },

    showServices = (topic) => {

        RG.logger.info(topic);

        var data = {
                profile: false,
                services: true,
            };

        publish('account.tabs.show', 2);

        if(account) {
            account.set('showContent', false);
        }

        if(services) {

            account.set(_.extend(data, {showContent: true}));

            RG.events.publish('account.services.type', selectedType);

        } else {

            Ajax.getServices().then(response => {

                services = response;

                account = new Account({data});

                RG.events.publish('account.services.type', selectedType);
            });
        }
    },

    loadMore = topic => {

        RG.logger.info(topic);

        if(selectedType) {

            Ajax.loadMore(selectedType).then(items => {

                services[selectedType] = items;

                account.set('items', services);
            });
        }
    },

    servicesType = (topic, selected) => {

        RG.logger.info(topic);

        let items = services,
            type = selected || selectedType;
/*
        if(_.isEmpty(items)) {
            account.set('showAll', false);
        }*/

        if(type) {

            let sujets = _.where(services, {isSujet: true}) || [],
                comments = _.where(services, {isComments: true}) || [],
                saved = _.where(services, {isSaved: true}) || [];

            switch(type) {
                case 'comments':

                    items = comments;

                    if(_.isEmpty(items)) {
                        Ajax.getTopCommented().then(data => {
                            RG.events.publish('account.comments.set', data);
                        });
                    }
                    break;
                case 'saved':

                    items = saved;

                    if(_.isEmpty(items)) {
                        Ajax.getPopular().then(data => {
                            RG.events.publish('account.saveds.set', data);
                        });
                    }

                    break;
                case 'all':

                    /*if(items.length) {
                        items = _.union(sujets.splice(0, 1), comments.splice(0, 1), saved.splice(0, 1));
                    } else {
                        type = 'sujets';
                    }*/

                case 'sujets':

                    items = sujets;

                    if(_.isEmpty(items)) {
                        RG.events.publish('subscribe.sujets.top');
                    }
                default :
                    break;
            }

            account.set('type', type);
            history.pushState({type: type}, config.types[type], `/account/services/${type}`);
        }

        account.set('items', items);
        account.set('showContent', true);



        var list = RG.Selects.account.getItems(),
            selectedItem = _.findWhere(list, {type: type});

            //RG.logger.trace(selectedItem);

        RG.Selects.account.setSelected(selectedItem);

        RG.Selects.account.render();
    },

    setRegions = (topic, regions) => {

        RG.logger.info(topic);

        RG.config.regions = regions;

        setTabs();
    },

    setSjets = (topic, sujets) => {

        RG.logger.info(topic);

        account.set('popularItems', sujets);
    },

    setSaved = (topic, saved) => {

        RG.logger.info(topic);

        account.set('popularItems', saved);
    },

    setComments = (topic, comments) => {

        RG.logger.info(topic);

        account.set('popularItems', comments);
    },

/**************************************************************************************
 ЭКСПОРТИРУЕМЫЕ МЕТОДЫ
 *************************************************************************************/

    /**
     * Инициализация событий модуля
     * @returns {*}
     */
    init = () => {

        /**
         * События
         */
        registerList({

            /**
             * Старт личного кабинета
             */
            'account.profile.show': showProfile,
            'account.services.show': showServices,
            'account.services.type': servicesType,

            'account.subscribe': subscribe,
            'account.user.save': save,

            'account.load': loadMore,

            'session.user.logedout': topic => {

                RG.logger.info(topic);
                window.location.replace('/');
            },

            'geolocation.region.update': setRegions,
            'subscribe.sujets.toped': setSjets,
            'account.saveds.set': setSaved,
            'account.comments.set': setComments
        });

    },

    /**
     * Запуск модуля
     */
    run = () => {

        RG.logger.debug('Run account');

        if(RG.config.regions) {

            setTabs();
        } else {

            RG.events.publish('geolocation.region.all');
        }
    },

    /**
     * Отписаться от всех событий
     */
    destruct = () => {
        RG.events.unsubscribe('account');
    };

module.exports = {
    init,
    run
};