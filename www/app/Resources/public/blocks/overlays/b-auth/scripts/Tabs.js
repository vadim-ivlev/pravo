/**
 * Created by esolovyev on 05.11.2015.
 */

var template = require('../tabs.ihtml'), // подкючение шаблона

    Tabs = Ractive.extend({

        template,

        data: () => {
            return {

                selected: null
            }
        },

        oninit() {

            RG.logger.debug('Tabs');
        },

        onrender() {

            var tab = this.findAll('.b-tab__item')[1];

            this.setPosition(tab);

            this.set('index', 1);

            this.on('registration', (event) => {

                this.set('index', 0);

                this.setPosition(event.node);

                RG.events.publish('auth.registration');
            });

            this.on('enter', (event) => {

                this.set('index', 1);

                this.setPosition(event.node);

                RG.events.publish('auth.enter');
            });
        },

        setPosition(element) {

            var $element = $(element),
                left = $element.position().left,
                width = $element.width();

            this.set('left', left);
            this.set('width', width);
        }
    });

module.exports = Tabs;