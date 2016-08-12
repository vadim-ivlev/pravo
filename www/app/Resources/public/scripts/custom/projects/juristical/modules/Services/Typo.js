/**
 * Created by esolovyev on 16.01.2016.
 */

var path = require('./config').typo,

    sendTypo = (topic, data) => {

        RG.logger.info(topic);
        /*
         $.mockjax({
         url: `${paths.add}/${id}`,
         responseText: {}
         });*/

        var article = RG.meta.getMaterial(),
            data = {
                message: data.typo,
                comment: data.comment,
                article
            };

        $.post(`${path}`, data).then(() => {

            RG.events.publish('typo.sended');
        });
    },

    init = () => {

        RG.events.registerList({
            'typo.send': sendTypo
        });
    }

module.exports = {
    init
};