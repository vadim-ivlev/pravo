/**
 * Created by esolovyev on 19.11.2015.
 */

var SujetMaterials = require('./SujetMaterials'),

    registerList = RG.events.registerList,

    sujetMaterials = null,

    run = () => {

        RG.events.publish('subscribe.sujet.get', RG.meta.getSujet());
    },

    init = () => {

        RG.events.subscribe('subscribe.sujet.set', (topic, items) => {

            RG.logger.info(topic);

            destruct();

            sujetMaterials = SujetMaterials({
                el: 'sujetMaterials',
                data: {
                    standAlone: true,
                    items,
                    title: RG.meta.getSujetTitle()
                }
            });
        });
    },

    destruct = () => {

        if(sujetMaterials) {

            sujetMaterials.teardown();
            sujetMaterials = null;

            RG.events.unsubscribe('subscribe.sujet.set');
        }
    };

module.exports = {
    init,
    run,
    destruct
};