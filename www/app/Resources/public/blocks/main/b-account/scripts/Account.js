/**
 * Created by esolovyev on 09.12.2015.
 */

var //Tabs = require('../../../crosslayouts/b-post/scripts/Tabs'),
    Profile = require('./Profile'),
    Services = require('./Services'),

    template = require('../b-account.ihtml'), // 
    Account = Ractive.extend({

        template,

        el: 'account',

        partials: {
            test: '<h1>Partial</h1>'
        },

        data() {
            return {
                profile: false,
                services: false,
                showAll: true
            }
        },

        components: {
            'profile': Profile,
            'services': Services
        },

        oninit() {

            RG.logger.debug('Account');

            /**
             * 
             */
            this.on({
                'event': event => {}
            });

            /**
             * 
             */
            RG.events.registerList({

                'account': topic => {}
            });
        },
    });

module.exports = Account;