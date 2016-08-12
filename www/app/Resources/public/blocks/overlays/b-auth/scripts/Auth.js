/**
 * Created by esolovyev on 05.11.2015.
 */

var //Tabs = require('./Tabs'),

    template = require('../b-auth.ihtml'), // подкючение шаблона

    Auth = Ractive.extend({

        el: 'authContainer',

        template,

        /*components: {
            'tabs': Tabs, // Передача компонента
        },*/

        oninit() {

            RG.logger.debug('Auth');
        },

        onrender() {

            var type = this.get('type');

            RG.logger.trace(type);

            switch(type) {

                case 'code': 
                    RG.events.publish('auth.expect.code', {tab: 'enter'});
                    break;
                case 'login':
                    RG.events.publish('auth.login', {tab: 'enter'});
                default:
                    break;
            }
            
        }
    });

module.exports = Auth;