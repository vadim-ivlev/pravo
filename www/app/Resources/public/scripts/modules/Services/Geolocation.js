/**
 * Created by esolovyev on 21.01.2016.
 */

var paths = require('./config').geolocationPaths,

    getGeolocation = (topic) => {

        RG.logger.info(topic);

        $.get(`${paths.getRegion}`).then(data => {

            RG.events.publish('geolocation.list', data);
        });
    },

    changeRegion = (topic, region) => {

        RG.logger.info(topic);

        $.get(`${paths.changeRegion}${region.id}`).then(() => {

            //Cookies.set('rg_user_region', JSON.stringify(region));

            RG.events.publish('geolocation.region.changed', region);
        });
    },

    getRegions = (topic) => {

        RG.logger.info(topic);

        $.get(`${paths.getRegions}`).then(regions => {

            RG.events.publish('geolocation.region.update', regions);
        });
    },

    init = () => {

        RG.events.registerList({
            'geolocation.region.get': getGeolocation,
            'geolocation.region.change': changeRegion,
            'geolocation.region.all': getRegions
        });
    };

module.exports = {
    init
};