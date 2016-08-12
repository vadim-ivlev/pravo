/**
 * Created by esolovyev on 11.12.2015.
 */
/*
if(RG.config.env === 'dev') {

    require('../test/Ajax-mock');
}*/

$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});

var paths = require('../config').paths,

    /**
     * Получение сервисов пользователя
     * @param post
     * @returns {*}
     */
    getServices = () => {
        return $.get(paths.getServices);
    },

    getProfile = () => {
        return $.get(paths.getProfile);
    },

    subscribe = (data) => {
        return $.post(paths.subscribe, data);
    },

    info = (data) => {
        return $.post(paths.info, data);
    },

    loadMore = (type) => {

        return $.get(`${paths.getServices}/all${type}`);
    },

    getPopular = () => {
        return $.get(RG.config.paths.accountInclude);
    },

    getTopCommented = () => {
        return $.get(RG.config.paths.popularCommentMaterials);
    };

module.exports = {
    getServices,
    getProfile,
    subscribe,
    loadMore,
    info,
    getPopular,
    getTopCommented
};