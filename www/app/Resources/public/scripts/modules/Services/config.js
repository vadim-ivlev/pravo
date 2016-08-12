/**
 * Created by esolovyev on 15.12.2015.
 */

/**
 * Конфигурационный
 * @type {string}
 */
var rootPath = RG.config.paths.root,
    subscribe = `${rootPath}subscribe/`,
    add = `${subscribe}add/`,
    remove = `${subscribe}remove/`,
    account = `${rootPath}account/`,
    geolocation = `${rootPath}geo/`,

    check = `${subscribe}check/`,

    typo = `${rootPath}app/send_error`,

    sujetsPaths = {
        add: `${add}sujet/`,
        remove: `${remove}sujet/`,
        getMaterials: `${subscribe}articles/`,
        getFollowed: `${subscribe}sujets`,
        getTopSujets: `${subscribe}top_sujets`
    },

    commentsPaths = {
        add: `${add}comments/`,
        remove: `${remove}comments/`
    },

    savedPaths = {
        add: `${account}set_favorite/`,
        remove: `${account}remove_favorite/`,
        toggle: `${account}toggle_read_page/`
    },

    viewedPaths = {
        getViewed: `${account}list_viewed`,
        setViewed: `${account}set_viewed/`
    },

    geolocationPaths = {
        getRegion: `${geolocation}`,
        changeRegion: `${geolocation}change/`,
        getRegions: `${geolocation}regions`
    },

    freshPaths = {
        add: `${add}fresh`,
        remove: `${remove}fresh`,
        check: `${check}fresh`
    },

    docPaths = {
        add: `${add}doc`,
        remove: `${remove}doc`,
        check: `${check}doc`
    };

module.exports = {
    commentsPaths,
    sujetsPaths,
    savedPaths,
    typo,
    viewedPaths,
    geolocationPaths,
    freshPaths,
    docPaths
};