/**
 * Created by esolovyev on 21.01.2016.
 */

var paths = require('./config').viewedPaths,

    getViewed = (topic) => {

        RG.logger.info(topic);

        /*
         $.mockjax({
         url: `${paths.remove}/${id}`,
         responseText: {}
         });
         */

        $.get(`${paths.getViewed}`).then(materials => {

            RG.events.publish('viewed.list', materials);
        });
    },

    setViewed = (topic) => {


        RG.logger.info(topic);

        var materialId = RG.meta.getMaterial();
        /*
         $.mockjax({
         url: `${paths.remove}/${id}`,
         responseText: {}
         });
         */

        $.get(`${paths.setViewed}${materialId}`).then(data => {

            if(data.current_saved) {
                RG.events.publish('subscribe.saved.added', RG.meta.getMaterial());
            }
        });
    },

    init = () => {

        RG.events.registerList({
            'viewed.get': getViewed,
            'viewed.set': setViewed,
        });
    };

module.exports = {
    init
};