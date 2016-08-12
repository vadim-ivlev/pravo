/**
 * Created by esolovyev on 14.12.2015.
 */

var ListTable = require('../../b-list-table/scripts/ListTable'),
    List = require('./List'),

    template = require('../services.ihtml'), // подкючение шаблона

    Services = Ractive.extend({

        template,

        components: {
            'list-table': ListTable,
            'list': List
        },

        data() {
            return {
                dateFormat: RG.datetime.parseVmDate,
                items: [],
                _ : _
            };
        },

        oninit() {

            RG.logger.debug('Services');

            /**
             * Локалные события
             */

            this.on({
                'setSubTabs': (event, type) => {

                    RG.events.publish('account.services.type', type);

                    event.original.preventDefault();
                },
            });

            /**
             * Глобальные события
             */
            RG.events.registerList({

                'account.subtubs.set': (topic, context) => {

                    RG.logger.info(topic);
                    RG.logger.trace(context);

                    RG.events.publish('account.services.type', context.type);
                }
            });
        },

        onrender() {

            RG.Selects = RG.Selects || {};
            RG.Selects.account = new RG.ListHeadToSelect('.b-account .b-rubricator-menu__link', '.b-account .b-rubricator-menu', '.b-account .b-rubricator-menu__list');
        }
    });

module.exports = Services;