/**
 * Created by esolovyev on 05.10.2015.
 */

var socialPath = require('./config').paths.social,
    template = require('../social-form.ihtml'),
    SocialForm = Ractive.extend({
        template,

        data() {
            return {
                socialPath
            }
        },
        oninit() {
            RG.logger.debug('SocialForm');

            this.on('setSocial', (event, path) => {

                this.set('disabled', true);
                this.set(path, true);

                RG.events.publish('auth.disable');
            });
        }
    });

module.exports = SocialForm;