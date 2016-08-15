/**
 * Created by esolovyev on 05.10.2015.
 */

var Services = require('./Services'),

    template = require('../b-menu.ihtml'), // подкючение шаблона

    Menu = Ractive.extend({

        el: 'menu',

        template,

        data() {
            return {
                materials: null
            }
        },

        components: {
            'menu-services': Services,
        },

        oninit() {
            RG.logger.debug('Menu');
        }
    });

module.exports = Menu;