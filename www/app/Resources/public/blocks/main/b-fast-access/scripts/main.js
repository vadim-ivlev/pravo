var FastAccess = require('./FastAccess'),
    
    registerList = RG.events.registerList,

    fastAccess = null,
    
    fastAccessRun = (topic) => {

        fastAccess = FastAccess();
    },

    run = () =>{

        RG.events.publish('fast-access.run');
    },

    init = () => {

        /**
        * События
        */
        registerList({

            'fast-access.run': fastAccessRun,
        });
    },

    destruct = () => {

    };

module.exports = {
    init,
    run,
    destruct
};