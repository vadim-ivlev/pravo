/**
 * Created by esolovyev on 06.12.2015.
 */
var getEnv = () => {

        var env = $('meta[name="rg-data"][property="env"]').attr('content');

        return env;
    },

    getMaterial = () => {

        var material = $('meta[name="rg-data"][property="article:id"]').attr('content');

        return material;
    },

    getMaterialTitle = () => {

        var title = $('meta[property="og:title"]').attr('content');

        return title;
    },

    getMaterialUrl = () => {

        var url = $('meta[property="og:url"]').attr('content');

        return url;
    },

    getMaterialImg = () => {

        var img = $('meta[property="og:image"]').attr('content');

        return img;
    },

    getProjectUri = () => {

        return $('meta[name="rg-data"][property="project:uri"]').attr('content');
    },

    getSujet = () => {

        var sujet = $('meta[name="rg-data"][property="sujet:id:first"]').attr('content');

        return sujet;
    },

    getSujetTitle = () => {

        return $('meta[name="rg-data"][property="sujet:title:first"]').attr('content');
    },

    getPubTime = () => {

        return $('meta[name="rg-data"][property="article:published_time"]').attr('content');
    },

    getSectionName = () => {

        return $('meta[name="rg-data"][property="section:name"]').attr('content');
    },

    getAuthorName = () => {

        return $('meta[name="rg-data"][property="author:name"]').attr('content');
    },

    getPlatform = () => {

        return $('meta[name="rg-data"][property="ads:uri"]').attr('content');
    },

    getPage = () => {

        return $('meta[name="rg-data"][property="page"]').attr('content');
    },

    getAdsHide = () => {

        return $('meta[name="rg-data"][property="ads:hide"]').attr('content');
    },

    getGaId = () => {

        return $('meta[name="rg-data"][property="gaId"]').attr('content');
    },

    getYaMetrikaId = () => {

        return $('meta[name="rg-data"][property="yaMetrikaId"]').attr('content');
    },

    getCustomLiveinternet = () => {

        return $('meta[name="rg-data"][property="customLiveinternet"]').attr('content');
    };

module.exports = {
    getEnv,
    getSujet,
    getMaterial,
    getSujetTitle,
    getPubTime,
    getMaterialTitle,
    getMaterialUrl,
    getMaterialImg,
    getSectionName,
    getAuthorName,
    getProjectUri,
    getPlatform,
    getPage,
    getAdsHide,
    getGaId,
    getYaMetrikaId,
    getCustomLiveinternet
};