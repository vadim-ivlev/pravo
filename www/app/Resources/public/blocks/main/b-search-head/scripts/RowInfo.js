/**
 * Created by esolovyev on 16.11.2015.
 */

var template = require('../row-info.ihtml'),
    RowInfo = Ractive.extend({
        template,

        data() {
            return {
                sort: false,
            };
        },

        oninit() {
            RG.logger.debug('RowInfo');

            this.on({

                sort: event => {

                    let sort = this.get('sort') ? 'date' : 'relevant';

                    RG.events.publish('search.sort', sort);

                    this.toggle('sort');

                    event.original.preventDefault();
                    event.original.stopPropagation();
                }
            });

            RG.events.subscribe('search.result.show', (topic, data) => {

                this.set('showResult', true);
                this.set('materials', data.count);
            });
        }
    });

module.exports = RowInfo;