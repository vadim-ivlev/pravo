/**
 * Created by esolovyev on 09.12.2015.
 */

var //Tabs = require('../../../crosslayouts/b-post/scripts/Tabs'),
    User = require('./User'),
    Subscriptions = require('./Subscriptions'),
    Social = require('./Social'),

    template = require('../profile.ihtml'), // подкючение шаблона

    Profile = Ractive.extend({

        template,

        components: {
            'user': User,
            'subscriptions': Subscriptions,
            'social': Social
        },

        data() {
            return {};
        },

        oninit() {

            RG.logger.debug('Profile');

            /**
             * Локалные события
             */
            this.on({
                'event': event => {}
            });

            /**
             * Глобальные события
             *
             */
            RG.events.registerList({

                'account': topic => {}
            });
        },
    });

module.exports = Profile;