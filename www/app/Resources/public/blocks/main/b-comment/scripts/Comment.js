/**
 * Created by esolovyev on 27.10.2015.
 */

var Post = require('../../b-post/scripts/Post'),

    //Quill = require('quill'),

    template = require('../b-comment.ihtml'), // подкючение шаблона

    getNickname = user => {
        return `@${user.firstName}${user.lastName}`;
    },

    Comment = Ractive.extend({

        template,

        editor: null,

        el: 'comments',

        components: {
            'post': Post
        },

        data() {
            return {
                clickableClass: 'b-comment__form_clickable',
                editorDisabled: true,
                mentions: [],
                postSended: false,
                comment: {
                    notify: false,
                    referrer: 1,
                    content: null,
                    parent: 0
                }
            };
        },

        onrender() {

        },

        oninit() {

            RG.logger.debug('Comment');

            var materialId = RG.meta.getMaterial();

            this.set('comment.referrer', materialId);

            this.on('form', event => {

                if(RG.session.isAuthorized()) {

                    RG.events.publish('comment.init');
                } else {
                    RG.events.publish('login');
                }

                event.original.preventDefault();
            });

            this.on('clear', event => {

                this.set('postSended', false);
                this.set('replyClass', false);

                //RG.events.publish('comment.init');
                event.original.preventDefault();
            });

            this.on('send', event => {

                this.send();
                event.original.preventDefault();
            });

            this.on('notify', event => {

                let notify = this.get('notify');

                RG.events.publish('subscribe.posted', notify);
            });
        },

        initForm() {

            if(!this.editor) {

                this.set('clickableClass', '');

                let container = this.find('#comment-editor');
                this.editor = new Quill(container);
                
                this.set('editorDisabled', false);

                this.editor.on('text-change', (delta, source) => {
                    /*if (source == 'api') {
                     //RG.logger.warn('An API call triggered this change', delta);
                     } else*/
                    if (source == 'user') {
                        this.removeMention();
                    }
                });

                this.off('form');

                this.focus();
            }
        },

        destroyForm() {

            this.editor = null;
            this.set('clickableClass', 'b-comment__form_clickable');
            this.set('editorDisabled', false);
        },

        sendSuccess() {

            this.editor.setHTML('');//.deleteText();
            this.set('postSended', true );
        },

        send() {

            let comment = this.get('comment'),
                text = this.editor.getText();
                
            if(_.isEmpty(text.trim())) {

                RG.events.publish('comment.empty');
            } else {

                comment.content = this.editor.getHTML();
                RG.events.publish('comment.send', comment);
            }
        },

        reply(post) {

            if(this.editor.getLength() > 1 && confirm('Комментарий будет очищен. Вы уверены, что хотели продолжить?')) {

                this.editor.setHTML('');//.deleteText();
                this.set('mentions', []);
            }

            this.set('comment.parent', post.parentId || post.id);

            this.editor.focus();
        },

        addMention(user) {

            let mentions = this.get('mentions'),
                mention = getNickname(user);

            if(!_.findWhere(mentions, { 'id': user.id })) {

                mentions.push(user);

                this.set('mentions', mentions);

            }

            return mention;
        },

        insertMention(user) {

            let mention = this.addMention(user),
                html = null;

            if(!mention) {
                return;
            }

            html = `<b class="b-comment__mention">${mention}</b> `;

            this.insertHtml(html, `#user-${_.random(1024)}`);
        },

        insertQuote(user, quoteText) {
            
            let id = `comment-quote-${_.random(1024)}`,
                mention = this.addMention(user),
                quote = `<i class="b-comment__quote" data-id="${id}">`
                            + `${quoteText}` +
                        `</i>
                        <b class="b-comment__mention-quote" data-id="${id}">`
                            + `${mention}` +
                        `</b>`;
            
            this.insertHtml(quote, `[data-id='${id}']`);
            /*
            let el = $('#comment-editor')

                .find
            */

                $(`[data-id='${id}']`).on('keydown', event => {
                    RG.selection.selectText(`[data-id='${id}']`);
                });
                /*.on('keydown', event => {

                        RG.logger.trace(event.target);
                    var key = event.keyCode || event.charCode;
                    
                    if( key == 8 || key == 46 ) {
                        return false;

                    }
                });*/

            //RG.logger.trace(el);
        },

        insertHtml(element, id) {

            let content = null,
                len = this.editor.getLength(),
                contentHtml = this.editor.getHTML();

            content = $.parseHTML(contentHtml);
            content = $(content);

            //RG.logger.trace(content.length > 1);

            if (len <= 1) {
                content = $('<div />');
                content.html(element);
            } else if (content.length > 1) {
                $(content[content.length - 1]).append(element);
                //RG.logger.trace(content[content.length - 1]);
            } else {
                content.append(element);
            }

            content = $('<div />').html($(content));

            contentHtml = content.html();

            //RG.logger.trace(content);

            this.editor.setHTML(contentHtml);

            len = this.editor.getLength();

            this.editor.updateContents({
                ops: [
                    {retain: len - 1},
                    {insert: ' ', attributes: {bold: false, italic: false}},
                    {retain: 1, attributes: {bold: false, italic: false}},
                ]
            });

            this.focus();
        },

        removeMention() {

            let text = this.editor.getText(),
                html = this.editor.getHTML(),
                mentions = this.get('mentions'),
                content = null,
                mentionElement = null;

            mentions = mentions.filter(mention => {

                let nickname = getNickname(mention);

                if(text.search(nickname) === -1) {

                    /*content = $.parseHTML(html);
                    content = $('<div />').html($(content));*/

                    /*mentionElement = content.find(`#comment-mention-${mention.id}`)
                    mentionElement.empty().remove();

                    content = content.html();

                    if(!(typeof content === 'undefined')) {

                        this.editor.setHTML(content);
                    }*/
                    return false;
                }
                return true;
            });

            this.set('mentions', mentions);;
        },

        focus() {

            let len = this.editor.getLength();
            this.editor.setSelection(len, len);
        }
    });

module.exports = Comment;