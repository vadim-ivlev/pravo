/**
 * Created by esolovyev on 19.10.2015.
 */

var template = require('../register-form.ihtml'),
    RegisterForm = Ractive.extend({

        el: 'authContent',

        template,

        oninit() {
            RG.logger.debug('RegisterForm');

            this.on('decline', event => {

                let email = this.get('email');
                RG.events.publish('auth.login', { email, tab: 'registration'});

                event.original.preventDefault();
            });

            this.on('confirm', event => {

                let email = this.get('email');
                RG.events.publish('auth.signup', {email, tab: 'registration'});

                event.original.preventDefault();
            });
        }
    });

module.exports = RegisterForm;