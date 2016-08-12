/**
 * Created by esolovyev on 15.12.2015.
 */

var paths = require('./config').savedPaths,

    add = (topic, id) => {

        RG.logger.info(topic);

        $.get(`${paths.add}${id}`).then(data => {

            RG.events.publish('subscribe.saved.added', id);
        });
    },

    remove = (topic, id) => {

        RG.logger.info(topic);

        $.get(`${paths.remove}${id}`).then(data => {
            
            RG.events.publish('subscribe.saved.removed', id);
        });
    },

    toggle = (topic, id) => {

        RG.logger.info(topic);
        
        $.get(`${paths.toggle}${id}`).then(data => {

            RG.events.publish('subscribe.saved.toggled', id);
        });
    },

    init = () => {

        RG.events.registerList({
            'subscribe.saved.toggle': toggle,
            'subscribe.saved.remove': remove,
            'subscribe.saved.add': add,
        });
    }

module.exports = {
    init
};
