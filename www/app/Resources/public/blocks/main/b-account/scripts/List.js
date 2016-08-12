/**
 * Created by esolovyev on 14.12.2015.
 */

var template = require('../list.ihtml'), // подкючение шаблона

    //post = require('../../b-post/b-post.ihtml'),
    Post = require('../../b-post/scripts/Post'),
    feed = require('../../../crosslayouts/b-feed/b-feed_account.ihtml'),

    List = Ractive.extend({

        template,


        data() {
            return {
                dateFormat: RG.datetime.parseVmDate,
                display: 'none',
            }
        },

        partials: {

            //post: post,
            feed: feed,
        },

        components: {
            post: Post
        },

        oninit() {

            RG.logger.debug('List');

            /**
             * Локалные события
             */
            this.on({
                'switch': (event, item) => {

                    if(item.isSujet) {

                        RG.events.publish('account.services.type', 'sujets');
                    } else if(item.isComments) {

                        RG.events.publish('account.services.type', 'comments');
                    } else if(item.isSaved) {

                        RG.events.publish('account.services.type', 'saved');
                    }

                    event.original.preventDefault();
                }
            });

            /**
             * Глобальные события
             */
            RG.events.registerList({

                'account': topic => {}
            });

        },

    });

module.exports = List;