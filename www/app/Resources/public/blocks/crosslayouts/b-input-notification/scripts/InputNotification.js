/**
 * Created by esolovyev on 07.10.2015.
 */

var template = require('../b-input-notification.ihtml'),

    InputNotification = Ractive.extend({
        template,
        timeOut: null,
        data: {
            msg: '',
            show: false,
            class: ''
        },
        oninit() {

            RG.logger.debug('InputNotification');

            this.observe('msg', this.showMsg.bind(this));
        },

        showMsg(msg) {

            RG.logger.trace('notification');
            
            clearTimeout(this.timeOut);

            if(this.get('msg') !== '') {
                this.set('show', true);

                this.timeOut = setTimeout(() => {

                    //this.set('msg',null);
                    this.set('show', false);
                }, this.get('off'));
            }

            this.on('notify', event => {

                RG.events.publish('notification.click');
            });
        }
    });

module.exports = InputNotification;