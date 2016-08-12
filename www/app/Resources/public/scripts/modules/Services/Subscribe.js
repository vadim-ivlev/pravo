/**
 * Created by esolovyev on 16.12.2015.
 */

var sujetsPaths = require('./config').sujetsPaths,
    commentsPaths = require('./config').commentsPaths,
    freshPaths = require('./config').freshPaths,
    docPaths = require('./config').docPaths,

    removeSujet = (topic, id) => {

        RG.logger.info(topic);

/*
        $.mockjax({
            url: `${paths.remove}/${id}`,
            responseText: {}
        });
*/

        $.get(`${sujetsPaths.remove}${id}`).then(sujet => {

            sujet.id = parseInt(sujet.id);

            RG.events.publish('subscribe.sujet.removed', sujet);
        });
    },

    addSujet = (topic, id) => {

        RG.logger.info(topic);
/*
        $.mockjax({
            url: `${paths.add}/${id}`,
            responseText: {}
        });*/

        $.get(`${sujetsPaths.add}${id}`).then(sujet => {

            sujet.id = parseInt(sujet.id);

            RG.events.publish('subscribe.sujet.added', sujet);
        });
    },

    getMaterials = (topic, id) => {

        RG.logger.info(topic);
        /*
         $.mockjax({
         url: `${paths.add}/${id}`,
         responseText: {}
         });*/

        $.get(`${sujetsPaths.getMaterials}${id}`).then(data => {

            RG.events.publish('subscribe.sujet.set', data.items);
        });
    },

    removeComments = (topic, id) => {

        RG.logger.info(topic);
        /*
         $.mockjax({
         url: `${paths.add}/${id}`,
         responseText: {}
         });*/

        $.get(`${commentsPaths.remove}${id}`).then(data => {

            RG.events.publish('subscribe.comments.removed', id);
        });
    },

    addComments = (topic, id) => {

        RG.logger.info(topic);
        /*
         $.mockjax({
         url: `${paths.add}/${id}`,
         responseText: {}
         });*/

        $.get(`${commentsPaths.add}${id}`).then(() => {

            RG.events.publish('subscribe.comments.added', id);
        });
    },

    getFollowed = topic => {

        RG.logger.info(topic);

        var followedList = [],
            sujet = +RG.meta.getSujet();

        $.get(`${sujetsPaths.getFollowed}`).then(response => {

            followedList = response.items;

            if (_.findIndex(followedList, {id: sujet}) !== -1) {

                RG.events.publish('subscribe.sujet.added', _.findWhere(followedList, {id: sujet}));
            }

            RG.events.publish('subscribe.sujet.list', response);
        });
    },

    getTopSujets = topic => {

        RG.logger.info(topic);

        $.get(`${sujetsPaths.getTopSujets}`).then(data => {

            RG.events.publish('subscribe.sujets.toped', data);
        });
    },

    addFresh = topic => {

        RG.logger.info(topic);

        $.get(`${freshPaths.add}`).then(data => {

            RG.events.publish('subscribe.fresh.added', data);
        });
    },

    removeFresh = topic => {

        RG.logger.info(topic);

        $.get(`${freshPaths.remove}`).then(data => {

            RG.events.publish('subscribe.fresh.removed', data);
        });
    },

    checkFresh = topic => {

        RG.logger.info(topic);

        if(RG.session.isAuthorized()) {
            $.get(`${freshPaths.check}`).then(data => {

                if (data.status === 'OK') {

                    RG.events.publish('subscribe.fresh.added', data);
                } else {

                    RG.events.publish('subscribe.fresh.removed', data);
                }
            });
        }
    },

    addDoc = topic => {

        RG.logger.info(topic);

        $.get(`${docPaths.add}`).then(data => {

            RG.events.publish('subscribe.doc.added', data);
        });
    },

    removeDoc = topic => {

        RG.logger.info(topic);

        $.get(`${docPaths.remove}`).then(data => {

            RG.events.publish('subscribe.doc.removed', data);
        });
    },

    checkDoc = topic => {

        RG.logger.info(topic);

        if(RG.session.isAuthorized()) {

            $.get(`${docPaths.check}`).then(data => {

                if (data.status === 'OK') {

                    RG.events.publish('subscribe.doc.added', data);
                } else {

                    RG.logger.trace(data);

                    RG.events.publish('subscribe.doc.removed', data);
                }
            });
        }
    },

    init = () => {

        RG.events.registerList({
            'subscribe.sujet.remove': removeSujet,
            'subscribe.sujet.fetch': getFollowed,
            'subscribe.sujet.add': addSujet,
            'subscribe.sujet.get': getMaterials,
            'subscribe.sujets.top': getTopSujets,

            'subscribe.comments.remove': removeComments,
            'subscribe.comments.add': addComments,

            'subscribe.fresh.add': addFresh,
            'subscribe.fresh.remove': removeFresh,
            'subscribe.fresh.check': checkFresh,

            'subscribe.doc.add': addDoc,
            'subscribe.doc.remove': removeDoc,
            'subscribe.doc.check': checkDoc,
        });
    }

module.exports = {
    init
};