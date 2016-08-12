/**
 * Created by esolovyev on 08.11.2015.
 */

var template = require('../b-fast-access.ihtml'),

    FastAccess = Ractive.extend({

        el: 'fastAccess',

        template,

        data: () => {
            return {
                materials: null,
                comments: null,
                showSujets: RG.meta.getSujet(),
                showMenu: false
            };
        },

        onrender() {

            RG.events.publish('share.set', {
                url: $('meta[property="og:url"]').attr('content'),
                title: $('meta[property="og:title"]').attr('content'),
                description: $('meta[name="description"]').attr('content'),
                image: $('meta[property="og:image"]').attr('content')
            });

            // Убил потому что мы вообще скрыли эту штуку на мобиле
            /*$('#fastAccess').hammer().bind('panleft', (e) => {

                this.set('showMenu', true);

                $('#fastAccess').addClass('fast-access_expanded');

                e.preventDefault();
            });

            $('#fastAccess').hammer().bind('swiperight', (e) => {

                this.set('showMenu', false);

                $('#fastAccess').removeClass('fast-access_expanded');

                e.preventDefault();
            });*/
        },

        oninit() {

            this.set('sujet', RG.meta.getSujet());

            RG.logger.debug('FastAccess');

            this.on({

                'expand': event => {

                },

                'showShare': event => {

                    this.set('share', true);
                },

                'hideShare': event => {

                    this.set('share', false);
                },

                'news': event => {

                    if(RG.session.isAuthorized()) {

                        RG.events.publish('fast-access.news');
                    } else {

                        RG.events.publish('login');
                    }
                    event.original.preventDefault();
                },

                'share': event => {

                    event.original.preventDefault();
                },
                
                'comment': event => {

/*                    $('html, body').animate({
                        scrollTop: $('#comments').offset().top
                    }, 1000);

                    event.original.stopPropagation();*/
                },

                'save': event => {


                    if(RG.session.isAuthorized()) {

                        this.get('saved') ? RG.events.publish('subscribe.saved.remove', RG.meta.getMaterial()) : RG.events.publish('subscribe.saved.add', RG.meta.getMaterial());
                    } else {

                        RG.events.publish('login');
                    }
                    event.original.preventDefault();
                }
            });

            RG.events.registerList({

                'comment.count': (topic, count) => {

                    let commentsCount = this.get('comments');

                    if(count > commentsCount) {

                        this.set('commentsActive', true);
                    }

                    this.set('comments', count);
                },

                'sujets.materials.count': (topic, count) => {

                    let materialsCount = this.get('materials');

                    if(count > materialsCount) {

                        this.set('materialsActive', true);
                    }

                    this.set('materials', count);
                },

                'subscribe.saved.removed': (topic, id) => {

                    RG.logger.info(topic);

                    this.set('saved', false);
                },

                'subscribe.saved.added': (topic, id) => {

                    RG.logger.info(topic);

                    this.set('saved', true);
                }
            });

            var options ={
                dragLockToAxis: true,
                dragBlockHorizontal: true,
                threshold: 1,
                drag_min_distance:1,
                swipe_velocity:0.1
            };
        }
    });

module.exports = FastAccess;