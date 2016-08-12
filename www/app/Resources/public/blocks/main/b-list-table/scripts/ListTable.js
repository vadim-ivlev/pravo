/**
 * Created by esolovyev on 11.12.2015.
 */

var template = require('../b-list-table_account.ihtml'), // 
    //post = require('../../b-post/b-post.ihtml'),
    Post = require('../../b-post/scripts/Post'),

    ListTable = Ractive.extend({

        template,

        data() {
            return {}
        },
/*

        partials: {
            post: post,

        },
*/
        components: {
            post: Post
        },

        oninit() {

            RG.logger.debug('ListTable');

            var empty = this.get('empty')

            RG.logger.trace(empty);

            /**
             * Тест
             */

            if(!empty) {

                this.on({
                    'read': (event, item) => {

                        RG.events.publish('subscribe.saved.toggle', item.id);
                        event.original.preventDefault();
                    },
                    'remove': (event, item) => {

                        RG.events.publish('subscribe.saved.remove', item.id);
                        event.original.preventDefault();
                    },
                    'add': (event, item) => {

                        RG.events.publish('subscribe.saved.add', item.id);
                        event.original.preventDefault();
                    },
                    'load': (event, item) => {

                        RG.events.publish('account.load');
                        event.original.preventDefault();
                    },
                });

                /**
                 *
                 */
                RG.events.registerList({

                    'subscribe.saved.toggled': (topic, id) => {

                        RG.logger.info(topic);

                        let items = this.get('items'),
                            index = _.findIndex(items, {isSaved: true, id});

                        this.toggle(`items.${index}.readed`);
                    },

                    'subscribe.saved.added': (topic, id) => {

                        RG.logger.info(topic);

                        let items = this.get('items'),
                            index = _.findIndex(items, {isSaved: true, id});

                        this.set(`items.${index}.removed`, false);
                    },

                    'subscribe.saved.removed': (topic, id) => {

                        RG.logger.info(topic);

                        let items = this.get('items'),
                            index = _.findIndex(items, {isSaved: true, id});

                        this.set(`items.${index}.removed`, true);
                    },

                    'subscribe.comments.added': (topic, id) => {

                        //RG.logger.info(topic);

                        let items = this.get('items'),
                            index = _.findIndex(items, {isComments: true, id});

                        this.set(`items.${index}.removed`, false);
                    },

                    'subscribe.comments.removed': (topic, id) => {

                        RG.logger.info(topic);

                        let items = this.get('items'),
                            index = _.findIndex(items, {isComments: true, id});

                        this.set(`items.${index}.removed`, true);
                    },

                    'subscribe.sujet.added': (topic, id) => {

                        //RG.logger.info(topic);

                        let items = this.get('items'),
                            index = _.findIndex(items, {isSujet: true, id});

                        this.set(`items.${index}.removed`, false);
                    },

                    'subscribe.sujet.removed': (topic, id) => {

                        RG.logger.info(topic);

                        let items = this.get('items'),
                            index = _.findIndex(items, {isSujet: true, id});

                        this.set(`items.${index}.removed`, true);
                    }
                });
            }
        },

    });

module.exports = ListTable;