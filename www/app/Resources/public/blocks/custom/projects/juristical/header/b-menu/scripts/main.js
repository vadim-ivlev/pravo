var Menu = require('./Menu'),
    Followed = require('../../../overlays/b-followed/scripts/Followed'),
    Viewed = require('../../../overlays/b-viewed/scripts/Viewed'),
    SujetMaterials = require('../../../overlays/b-sujet-materials/scripts/SujetMaterials'),

    registerList = RG.events.registerList,

    followedList = [],
    popularSujets = [],

    menu = null,
    viewed = null,
    followed = null,
    sujetMaterials = null,

    menuRun = (topic) => {

        menu = Menu();
    },

    setFollowed = (topic, response) => {

        RG.logger.info(topic);

        if(_.isEmpty(response.items)) {

            RG.events.publish('subscribe.sujets.top');
        } else {

            followedList = response.items;
            menu.set('materials', response.sum || null);
        }
    },

    updateMaterials = (topic, response) => {


    },

    viewewRun = (topic) => {

        RG.logger.info(topic);

        RG.events.publish('viewed.get');
    },

    setViewed = (topic, materials) => {

        if(_.isEmpty(materials)) {

            $.get(RG.config.paths.popularMaterials).then(data => {
                viewed = new Viewed({data: {popularMaterials: data}});
            });
        } else {

            viewed = new Viewed({data: {materials}});
        }
    },

    followedRun = (topic) => {

        RG.logger.info(topic);

        let data = {sujets: followedList, popularSujets};
        followed = new Followed({data});
    },

    followedAdd = (topic, sujet) => {

        if(!_.findWhere(followedList, {id: parseInt(sujet.id)})) {

            followedList.push(sujet);

            let data = {sujets: followedList, popularSujets};

            followed = new Followed({data});
        }

        menu.set('materials', null);
    },

    followedRemove = (topic, sujet) => {

        followedList = _.filter(followedList, (item) => {

            return item.id !== parseInt(sujet.id)
        });

        menu.set('materials', null);
    },

    articlesShow = (topic, id) => {

        RG.logger.info(topic);

        RG.events.publish('subscribe.sujet.get', id);
    },

    setSujetArticles = (topic, materials) => {

        let data = {materials},
            currentCount = menu.get('materials'),
            count = currentCount - _.filter(materials, material => {

                return material.isNew;
            }).length;

        count = count > 0 ? count : null;

        sujetMaterials = new SujetMaterials({data});

        menu.set('materials', count);
    },

    run = () =>{

        RG.events.publish('menu.run');
    },

    init = () => {

        /**
        * События
        */
        registerList({

            'menu.run': menuRun,

            'followed.run': followedRun,
            'followed.destroy': topic => {

                if(followed) {
                    followed.teardown();
                }
            },

            'viewed.run': viewewRun,
            'viewed.list': setViewed,
            'viewed.destroy': topic => {

                if(viewed) {
                    viewed.teardown();
                }
            },

            'articles.show': articlesShow,

            'subscribe.sujet.list': setFollowed,

            'session.user.authorized': (topic) => {

                RG.events.publish('subscribe.sujet.fetch');
            },

            'subscribe.sujet.set': setSujetArticles,

            'subscribe.sujets.toped': (topic, sujets) => {

                RG.logger.info(topic);

                popularSujets = sujets;
            },

            'subscribe.sujet.removed': followedRemove,

            'subscribe.sujet.added': followedAdd
        });
    },

    destruct = () => {

    };

module.exports = {
    init,
    run,
    destruct
};