/**
 * Created by esolovyev on 26.10.2015.
 */

var template = require('../b-post.ihtml'),

    mousePosition,

    updateMousePosition = event => {
        /* Update the global variable mousePosition with the current location of the mouse.
         */
        mousePosition = {
            left: event.pageX,
            top: event.pageY
        };
    },

    Post = Ractive.extend({
        template,

        data() {
            return {
                loading: false,
                showForm: false,
                quote: null,
                tip: {
                    top: 0,
                    left: 0,
                    display: 'none'
                },
                me: false,
                dateFormat(date) {

                    try {
                        var postDate = moment(date, moment.ISO_8601).locale('ru'),
                            today = moment(),
                            yesterday = moment().subtract(1, 'day');

                        if(moment(postDate).isSame(today, 'day')) {

                            return postDate.format('Сегодня в HH:mm');
                        }
                        else if(moment(postDate).isSame(yesterday, 'day')) {

                            return postDate.format('Вчера в HH:mm');
                        } else {

                            return postDate.format('DD.MM.YY в HH:mm');
                        }

                    } catch(e) {

                        return moment().format('DD.MM.YY в HH:mm');
                    }
                }
            }
        },

        oninit() {

            this.set('me', this.get('post.user.id') === 1);//RG.session.getUserData.id);

            $(document).mousemove(updateMousePosition);

            RG.events.registerList({

                'comment.hide.tips': (topic) => {

                    this.hideTip();
                },
                'comment.post.loading': (topic, id) => {

                    let postId = this.get('post.id');

                    if (postId === id) {

                        this.toggle('loading');
                    }
                },
                'comment.reply': (topic, post) => {

                    this.set('activeClass', post.id === this.get('post.id'));
                },

                'session.user.logedout': () => {

                    this.set('me', false);
                    this.set('post.liked', false);
                }
            });

            this.on('mention', event => {

                let post = this.get('post');

                RG.events.publish('comment.mention', post);

                event.original.preventDefault();
            });

            this.on('reply', event => {

                let post = this.get('post');

                RG.events.publish('comment.reply', post);

                event.original.preventDefault();
            });

            this.on('select', event => {

                let quote = RG.selection.getSelected().toString();

                if(quote !== '') {

                    let tip = {
                            top: mousePosition.top + 10,
                            left: mousePosition.left - 40,
                            display: 'block'
                        };
                    this.set('tip', tip);

                    RG.events.publish('comment.select', quote);
                }

                event.original.preventDefault();
            });

            this.on('like', event => {

                let id = this.get('post.id');

                RG.events.publish('comment.like', id);

                event.original.preventDefault();
            });

            this.on('quote', event => {

                let user = this.get('post.user'),
                    quote = RG.selection.getSelected().toString();

                RG.events.publish('comment.quote', {
                    user,
                    quote
                });

                RG.events.publish('comment.hide.tips');

                event.original.preventDefault();
            });
        },

        hideTip() {

            this.set('tip', {
                top: 0,
                left: 0,
                display: 'none'
            });
        }
    });

module.exports = Post;
