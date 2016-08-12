/**
 * Created by esolovyev on 15.01.2015.
 */

var template = require('../b-text-actions.ihtml'),

    mousePosition,

    updateMousePosition = event => {

        mousePosition = {
            left: event.pageX,
            top: event.pageY
        };
    },

    TextActions = Ractive.extend({

        el: 'textActions',

        template,

        data: () => {
            return {
                style: {
                    top: 0,
                    display: 'none'
                },
                comment: '',
                typo: ''
            }
        },

        oninit() {

            RG.logger.debug('TextActions');

            $(document).mousemove(updateMousePosition);

            this.on({

                'quote': event => {

                    var quote = this.get('selectedText'),
                        data = {

                            user: {
                                firstName: 'Цитата',
                                lastName: 'Материала'
                            },
                            quote
                        };

                    RG.events.publish('comment.quote', data);

                    event.original.preventDefault();
                },

                'typo': event => {

                    this.set('showComment', true);

                    event.original.preventDefault();
                },

                'send': event => {

                    var data = {
                        typo: this.get('selectedText'),
                        comment: this.get('comment')
                    };

                    RG.events.publish('typo.send', data);

                    event.original.preventDefault();
                },

                'cancel': event => {

                    this.set('showComment', false);

                    event.original.preventDefault();
                }
            });

            RG.events.registerList({

                'typo.sended': (topic) => {

                    this.set('showComment', false);
                }
            });
        },

        onrender() {

            $('.b-material-wrapper').on('mouseup', '.lead, p', event => {

                let txt = RG.selection.getSelected().toString();

                if(txt !== '') {

                    this.set('selectedText', txt);

                    let style = {
                        top: mousePosition.top + 10,
                        display: 'block'
                    };

                    this.set('style', style);

                    RG.events.publish('share.material', {
                        url: RG.meta.getMaterialUrl(),
                        title: RG.meta.getMaterialTitle(),
                        description: txt,
                        image: RG.meta.getMaterialImg()
                    });

                    RG.events.subscribe('document.mousedown', (topic, event) => {

                        RG.logger.info(topic);

                        if(!$('.b-text-actions').has(event.target).length) {

                            let style = {
                                top: 0,
                                display: 'none'
                            };

                            this.set('showComment', false);
                            this.set('style', style);
                        }
                    });
                }
            });
        }
    });

module.exports = TextActions;