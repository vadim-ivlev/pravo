/**
 * Created by esolovyev on 08.11.2015.
 */

var List = require('./List'),
	
	template = require('../b-menu-user.ihtml'),

    MenuUser = Ractive.extend({

        template,


        data() {

            return {
                showList: false,
                user: {},
                comentsCount: 0,
                isAuthorized: false
            };
        },
		
		components: {
			'menu-list': List
		},

        oninit() {

            RG.logger.debug('MenuUser');

            /*if(RG.session.isAuthorized()) {

                let user = RG.session.getUserData();

                if(user) {

                    this.set('user', user);
                }

                this.set('isAuthorized', true);
            }*/

            this.on('login', event => {

                RG.events.publish('login');
                event.original.preventDefault();
            });

            this.on('menu', event => {

                this.get('showList') ? RG.events.publish('menu.user.hide') : RG.events.publish('menu.user.show');

                this.toggle('showList');

                /*RG.events.subscribe('document.mousedown', (topic, event) => {

                    RG.logger.info(topic);*/

                $(document).on('click.menu', hideMenu.bind(this));

                event.original.preventDefault();
            });

            RG.events.subscribe('menu.user.hide', (topic) => {

                this.set('showList', false);
                $(document).off('click.menu', hideMenu.bind(this));
            });

            RG.events.subscribe('session.user.logedout', (topic) => {
                RG.events.publish('menu.user.hide');
            });

            function hideMenu(event) {

                // Не понятно, зачем было сделано столько проверок, но пусть висит на всякий :)
                // if(!$('.b-menu-user__menu').has(event.target).length
                //     && !$('.b-menu__item_type_actions').has(event.target).length
                //     && !$(event.target).is('.b-menu-user__item-image, .b-menu-user__nav-icon, .b-menu-user__name')) {

                //     this.set('showList', false);
                //     RG.events.publish('menu.user.hide');
                // }

                // Если клик был сделан не по элементу или дочерним
                if($('.b-menu-user').has(event.target).length === 0) {

                    this.set('showList', false);
                    RG.events.publish('menu.user.hide');
                }

            };


            // ========= Кусок дряни от Лехи ============
            // Растягиваем в мобиле по открытию - меню
            // И скроллим рубрики
            (function(){

                try {

                    // Когда открыли меню
                    RG.events.subscribe('menu.user.show', (topic) => {

                        var info = RG.ScreenViewer.getScreenInfo();
                        
                        // Если мы в мобилке,
                        // то работаем
                        if (info.type === 'mobile') {

                            setHeight($('#userProfileCatalogWrapper'));      

                            setBodyFixed();

                            $('#userProfileCatalogWrapper').mCustomScrollbar({
                                autoHideScrollbar: true
                            });                      
                        }

                    });

                    // Когда закрыли меню
                    RG.events.subscribe('menu.user.hide', (topic) => {

                        unsetBodyFixed();

                        $('#userProfileCatalogWrapper').mCustomScrollbar("destroy");
                    });

                    // Methods
                    function setHeight($root) {

                        var outerHeight = window.innerHeight,

                            // высоту вычитаем из шапки
                            subtractionHeight = 60;

                        $root.css('height', (outerHeight - subtractionHeight) );
                    };

                    // add Alex 30.11.2016
                    function setBodyFixed() {
                        //$('body').addClass('is-fixed');
                        $('body').addClass('scroll-disabled');
                    };

                    // add Alex 30.11.2016
                    function unsetBodyFixed() {
                        //$('body').removeClass('is-fixed');
                        $('body').removeClass('scroll-disabled');
                    };

                } catch(err) {
                    RG.logger.error(`Ошибка при определении высоты MenuUser, ${err}`);
                }

            })();

        }
    });

module.exports = MenuUser;