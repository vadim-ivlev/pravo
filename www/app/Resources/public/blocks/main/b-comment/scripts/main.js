/**
 * Created by esolovyev on 26.10.2015.
 */

/**,
 * Подключение вспомогательный модулей
 */
var Ajax = require('./helpers/Ajax'),

    config = require('./config'),

    /**
     * Подулючение компонентов
     */
    Comment = require('./Comment'),
    // Ractive.components['rg-comment'] = require('./Comment'),

    /**
     * Сокращённые названия
     */
    publish = RG.events.publish,
    registerList = RG.events.registerList,

    error = RG.logger.error,
    debug = RG.logger.debug,
    warn = RG.logger.warn,
    info = RG.logger.info,
    isAuthorized = RG.session.isAuthorized,

    /**
     * Приватные переменные
     */
    comment = null,
    quote = null,
    showTips = false,

/**************************************************************************************
 ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
 *************************************************************************************/

    /**
     * Вызывается в случае ошибки
     * @param topic
     * @param type
     * @param data
     */
    commentsError = (topic, type, data) => {

        info(topic);

        switch(type) {
            case 'commetns':
                RG.logger.warn(data);
                comment.notValid();
                break;
        }
    },

    /**
     * Включает спиннер
     */
    commentsLoading = (topic) => {
        info(topic);
        comment.loading();
    },

/**************************************************************************************
 МЕТОДЫ СОБЫТИЙ
 *************************************************************************************/

////////////////////ФОРМА ВХОДА////////////////////

    /**
     * Вызывается при запуске формы входа
     */

    commentGet = (topic) => {

        RG.logger.info(topic);

        var materialId = config.materialId || 1;

        Ajax.getComments(materialId).then(data => {

            let commentsCount = 0,
                materialId = RG.meta.getMaterial(),
                posts = _.values(data.items);

            _.each(posts, el => {

                if(el.answers) {

                    commentsCount += el.answers.length;
                }
                commentsCount++;
            });

            comment = RG.parser.render('rg-comment', { 
                data: { 
                    commentsCount: commentsCount,
                    posts: posts
                }
            })[0];

            RG.events.publish('comment.count', commentsCount);

            if(posts.length) {
                comment.set('posts', posts);
            }
            comment.set('commentsCount', commentsCount);

            if(data.subscribed) {

                RG.events.publish('subscribe.comments.added', materialId);
            }

        }, response => {

            switch(response.status) {

                case 404:
                    RG.logger.error('Not found');
                    break;
                case 400:
                    publish('comment.empty');
                    break;
            }
        });
    },

    commentReply = (topic, post) => {

        RG.logger.info(topic);

        if(isAuthorized()) {

            comment.initForm();
            comment.reply(post);

            comment.set('replyClass', true);
        } else {

            publish('login');
        }
    },

    commentMention = (topic, post) => {

        RG.logger.info(topic);
        if(isAuthorized()) {

            comment.initForm();
            comment.insertMention(post.user);
        } else {

            publish('login');
        }
    },

    commentQuote = (topic, data) => {

        RG.logger.info(topic);

        let user = data.user,
            quote = data.quote;

        if(isAuthorized()) {

            comment.initForm();
            comment.insertQuote(user, quote.toString());

        } else {

            publish('login');
        }
    },

    commentLike = (topic, id) => {
        
        RG.logger.info(topic);

        if(isAuthorized()) {

            publish('comment.post.loading', id);

            Ajax.likeComment(id).then(data => {

                publish('comment.post.loading', id);

                publish('comment.liked', {
                    id,
                    data
                });
            }, response => {

                switch(response.status) {

                    case 404:
                        RG.logger.error('Not found');
                        break;
                    case 400:
                        RG.logger.trace(response);
                        break;
                }
            });
        } else {

            publish('login');
        }
    },

    commentLiked = (topic, response) => {

        RG.logger.info(topic);

        let posts = comment.get('posts'),
            index = _.findIndex(posts, {
                id: response.id
            }),
            isLiked = true;

        if(response.data.method === 'dislike') {
            isLiked = false;
        }

        comment.set(`posts.${index}.liked`, isLiked);
        comment.set(`posts.${index}.likes`, response.data.newCount);
    },

    commentSelect = (topic, quote) => {
        RG.logger.info(topic);

        showTips = true;
        quote = quote;
    },

    commentInit = topic => {

        RG.logger.info(topic);

        comment.initForm();
    },
/*
    subscribeComments = (topic, subscribed) => {

        RG.logger.info(topic, subscribed);

        if(isAuthorized()) {


        } else {

            publish('login');
        }
    },*/

    commentSend = (topic, post) => {
        
        RG.logger.info(topic);
        RG.logger.info(post);

        Ajax.sendComment(post).then(response => {

            publish('comment.sended');
        }, response => {

            switch(response.status) {

                case 404:
                    RG.logger.error('Not found');
                    break;
                case 400:
                    RG.logger.trace(response);
                    break;
            }
        });
    },

    commentSended = topic => {

        RG.logger.info(topic);

        comment.sendSuccess();
    },

    openComments = () => { 

        $('#comments').prepend('<a href="javascript://" class="b-comment__open-comments"><span>Показать</span> комментарии ({{commentsCount}})</a>');

        let openedComments = false;

        $(document).on('click', '.b-comment__open-comments', function(){

            var linkText = $(this).find('span').text();

            // if (!openedComments) { 
                openedComments = true;
                publish('comment.get');
            // } else { 
            //     $('.b-comment__hideshow').toggleClass('is-visible');
            //     $(this).find('span').text(linkText === 'Скрыть' ? 'Показать' : 'Скрыть');
            // }
        });

    },

/**************************************************************************************
 ЭКСПОРТИРУЕМЫЕ МЕТОДЫ
 *************************************************************************************/

    /**
     * Инициализация событий модуля
     * @returns {*}
     */
    init = () => {

        /**
         * События
         */
        registerList({

            /**
             * Старт комментариев
             */
            'comment.get': commentGet,

            'comment.init': commentInit,

            'comments.loading': commentsLoading,
            'comments.error': commentsError,

            'comment.reply': commentReply,
            'comment.mention': commentMention,
            'comment.quote': commentQuote,
            'comment.select': commentSelect,

            'comment.like': commentLike,
            'comment.send': commentSend,

            'comment.sended': commentSended,
            'comment.liked': commentLiked,

            // 'subscribe.comments': subscribeComments,

        });

        $(document).mousedown(e => {

            $('.b-post__content').removeClass('noselect');

            if($(e.target).is('.b-post__quote-tip')) {
                e.preventDefault();
                return;
            } else {
                if(showTips) {
                    
                    publish('comment.hide.tips');
                    showTips = false;
                }
            } 

            if ($(e.target).is('.b-post__content')) {
                $('.b-post__content, .b-comment__form').not(e.target).addClass('noselect');
            }
            
        });

        openComments();

    },

    /**
     * Запуск модуля
     */
    run = () => {
        RG.logger.debug('Run comments');
        
        // publish('comment.get');
    },

    /**
     * Отписаться от всех событий
     */
    destruct = () => {
        RG.events.unsubscribe('comments');
    };

module.exports = {
    init,
    // run
};