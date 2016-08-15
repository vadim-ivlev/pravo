/**
 * Created by esolovyev on 07.03.2016.
 */

var template = require('../b-button.ihtml'),

    Button = Ractive.extend({

        template,

        oninit() {

            this.on('press', event => {

                let context = this.get(),
                    topic = this.get('topic');

                RG.events.publish(topic, context);

                event.original.preventDefault();
            });
        }
    });

module.exports = Button;
