/**
 * Created by nsinetskiy on 16.05.2016.
 */


'use strict'

/**
 * Инициализация главного модуля
 * @type {{}|*}
 */
window.RG = window.RG || {};

// HELLO WORLD :)
console.debug(`From RG team with \u2764`);

/**************************************************************************************
 ПОДКЛЮЧАЕМ ДЕКОРАТОРЫ
 *************************************************************************************/

require('./global/decorators');

/*************************************************************************************
 ПОДКЛЮЧАЕМ КОМПОНЕНТЫ
 *************************************************************************************/

require('./global/components');

/*************************************************************************************
 ПОДКЛЮЧАЕМ МОДУЛИ
 *************************************************************************************/

require('./global/modules');

/*************************************************************************************
 ПОДКЛЮЧАЕМ РАСШИРЕНИЯ
 *************************************************************************************/

require('./global/extends');

/**
 * Подключение блока модального поиска
 */
// var SearchOverlay = require('../../../../blocks/overlays/b-search-overlay/scripts/SearchOverlay');

/**
 * Решение проблемы CORS
 */
$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});

/**************************************************************************************
 DOM READY
 *************************************************************************************/
$(function() {

    'use strict';

    $('#openKartaProezda').colorbox({
        title: "Редакция &laquo;Российской газеты&raquo;, ул. Правды, д. 24, строение 4",
        className: "karta-proezda-ctx"
    });

    var

    // Записываем в переменную элемент colorbox
        $cbox = $('#colorbox'),

    // Записываем в переменную элемент colorbox overlay
        $cboxOverlay = $('#cboxOverlay');


    // Поехали дальше кодить, мужики!

    // Запускаем парсер компонентов (из подключенного выше файла компонентов)
    RG.parser.init();

    //Инициализация модуля просмотренных матеиралов
    RG.Viewed.init();

    /**
     * Ошибка при запросе
     */
    /*    $(document).ajaxError(function(event, jqxhr, settings, thrownError) {

     RG.logger.error(thrownError);

     $.colorbox({

     html: '<div class=""><p class="">Произошла ошибка. Обратитесь к разработчикам</p></div>',

     returnFocus: false,
     scrolling: false,
     opacity: 0.7,

     width: 360,
     height: 100,
     });
     });*/

    // Регистрируем событие клика на документе
    $(document).on('click', function(event){

        // Публикуем событие клика
        RG.events.publish('document.click', event);
    });

    // Регистрируем событие клика на документе
    $(document).on('mousedown', function(event){

        // Публикуем событие клика
        RG.events.publish('document.mousedown', event);
    });

    // Регистрируем событие клика на документе
    $(document).on('mouseup', function(event){

        // Публикуем событие клика
        RG.events.publish('document.mouseup', event);
    });

    /**************************************************************************************
     КОД АГИМЫ
     *************************************************************************************/

    // Хелперы
    window.$windowHeight = window.innerHeight;
    window.$windowWidth = window.innerWidth;

    $(document).on('scroll', function() {

        window.$scrollTop = window.pageYOffset;
        window.$windowHeight = window.innerHeight;
    });

    $(window).on('resize', function() {

        window.$scrollTop = window.pageYOffset;
        window.$windowHeight = window.innerHeight;

        // Этот код убивал все!!!
        /*if ($currentWindowWidth != $windowWidth) {
         $.colorbox.close();
         }*/

        // Реинициализация панели данных на главной странице
        /*if($('.js-slide').length) {
         slidePosition($('.js-slide.is-active'), $('.js-slide'));
         }*/
    });

    /**
     * TODO Удалить этот код
     */
    // Панель данных на главной странице
    /*if($('.js-slide').length) {
     slidePosition ($('.js-slide.is-active'), $('.js-slide'));
     }*/

    // Выбор таба на главной
    /*$(document).on('click', '.js-slide', function(){

     var $this = $(this),
     $collection = $('.js-slide');

     slidePosition($this, $collection);

     return false;
     });*/

    // Движение таба в панели данных
    /*function slidePosition (e, col) {

     var $active = e.siblings('.is-border'),
     $pos = e.position().left,
     $itemWidth = e.width();


     col.removeClass('is-active');
     e.addClass('is-active');

     $active.css({
     'left': $pos,
     'width': $itemWidth
     });
     }*/


    /**
     * Инициализация дейтпикера
     * TODO вынести в отдельный файл
     */
    (function initCalendar() {

        var $datepicker = $(".js-datepicker");

        if (!!$datepicker.length) {
            $datepicker.datepicker({
                showOn: 'button',
                buttonText: '',
                showButtonPanel: true,
                showOtherMonths: true,
                selectOtherMonths: true,
                beforeShow: function() {
                    $('.ui-datepicker-trigger').addClass('is-active').addClass('animated').addClass('bounceIn');
                },
                onClose: function(){
                    $('.ui-datepicker-trigger').removeClass('is-active').removeClass('animated').removeClass('bounceIn');
                }
            });
            $datepicker.datepicker( $.datepicker.regional['ru'] );
        }
    })();

    // Инициализируем стикер баннера в левом сайтбаре
    $(".b-scroll-block_sidebar-left").stick_in_parent({
        parent: '.l-page__body',
        spacer: false // если его включить, то html5 баннеры перезагружаются, при ресайзе
    });

    // Инициализируем кастомный скролл
    $(".js-scroll-bar").mCustomScrollbar({
        autoHideScrollbar: true
    });

    /**
     * TODO Зачем здесь это?
     */
    // Инициализация скролла в новостях левого сайтбара
    /*$('.b-feed_last-news .b-feed__list').mCustomScrollbar({
     autoHideScrollbar: true
     });*/

    RG.parser.render('rg-form');

    $("label a").on("click", function(e) {
        e.stopPropagation();
    });

    /**
     * Инициализация блока подписок
     */
    RG.Subscribe.init();

    if(RG.meta.getSujet()) {
        RG.parser.render('rg-follow-sujet', {
            data: {
                subscribed: false,
                txt: 'Следить за сюжетом',
                sujet: RG.meta.getSujet()
            }
        });

    }

    /**
     * Сохранённых статей
     */
    RG.Saved.init();

    /*
     * Инициализация Аналитики
     */
    RG.Analytics.init();
    RG.Analytics.run();

    // Отправляем событие, что баннеры начали грузиться
    /*RG.events.subscribe('Ads.init', function(){

     RG.Analytics.Ga.sendTracker({
     param: {
     hitType: 'event',
     eventCategory: 'JS',
     eventAction: 'Banners init',
     eventLabel: 'start'
     }
     });

     });*/

    // Проверяем на то, инициализировались ли баннеры
    /*RG.events.subscribe('Adfox.platform.loaded', function(){

     (function(){

     var bannersNotLoaded = true; // по-умолчанию баннер не загружен (предполагаем)

     setTimeout(function() {

     // Проходим по всем площадкам
     $('[id^="ads"]').each(function(index, el) {

     // Если контейнер не пустой
     // все ок
     // выходим из цикла проверки
     if (!$(el).is(':empty')) {

     // Говорим что баннер не загружен
     bannersNotLoaded = false;

     // Выхдим из цикла
     return false;
     }

     });

     // Если баннеры не были загружены
     // то есть во всех контейнерах пусто,
     // то отправляем запрос
     if (bannersNotLoaded) {

     RG.Analytics.Ga.sendTracker({
     param: {
     hitType: 'event',
     eventCategory: 'JS',
     eventAction: 'Banners init',
     eventLabel: 'failed'
     }
     });

     RG.logger.log('Баннеры не загрузились, блоки пустые');
     RG.logger.log($('[id^="ads"]'));

     } else {

     RG.Analytics.Ga.sendTracker({
     param: {
     hitType: 'event',
     eventCategory: 'JS',
     eventAction: 'Banners init',
     eventLabel: 'done'
     }
     });

     RG.logger.log('Баннеры все-таки загрузились, среди этих блоков есть');
     RG.logger.log($('[id^="ads"]'));
     }

     }, 5000);

     })();

     });*/

    /*RG.Analytics.Ga.register({
     type: 'send',
     param: {
     tagLabel: '.b-sidebar-left__item .b-categories__item',
     event: 'click',
     hitType: 'event',
     eventCategory: 'Левое меню',
     eventAction: 'Клик',
     eventLabel: 'Элемент меню'
     }
     });*/

    /*
     * Отправляем
     * счетчик, без вешания на событие
     * пример: по таймауту
     */

    /*RG.Analytics.Ga.sendTracker({
     type: 'НазваниеСчетчика.send',
     param: {
     hitType: 'event',
     eventCategory: 'Категория',
     eventAction: 'По таймауту',
     eventLabel: 'Какие-то элементы'
     }
     });*/

    /**
     * Тестовая аналитика
     * TODO удалить
     */

    /*RG.Analytics.Ga.register({
     type: 'send',
     param: {
     tagLabel: '[data-blocksshifterid="rgb_feed_last-news"]',
     event: 'click',
     hitType: 'Клик',
     eventCategory: 'Лента новостей',
     eventAction: 'Клик',
     eventLabel: 'Блок правый сайтбар 240х400',
     eventValue: 'Значение, просто так'
     }
     });

     RG.Analytics.Ga.registerList({
     list: [
     {
     send: [
     {
     tagLabel: '.b-header',
     event: 'click',
     hitType: 'click',
     eventCategory: 'Шапка',
     eventAction: 'Клик',
     eventLabel: 'Блок шапки',
     eventValue: null
     },
     {
     tagLabel: '.b-logo',
     event: 'mouseenter',
     hitType: 'hover',
     eventCategory: 'Логотип',
     eventAction: 'Курсор над блоком',
     eventLabel: 'Логотип в шапке',
     eventValue: null
     }
     ]
     }
     ]
     });*/

    // ОТправка на печать
    (function toPrint(){

        var $printBtn = $('.b-icon_type_print');

        if (!!$printBtn.length) {
            $printBtn.on('click', function(e){
                e.preventDefault();

                window.print();
            });
        }

    })();

    /*
     * Инициализация счетчиков
     */
    RG.Counters.init();

    // Включаем счетчики
    RG.events.publish('Counters.run');

    /*
     * Инициализация Рекламы
     */
    RG.Ads.init();

    // Инициализируем компонент баннера adfox
    RG.parser.render('rg-adfox');

    // Инициализируем баннер Adfox
    RG.events.publish(`${RG.Ads.Adfox_modulePrefix}.run`);

    // Инициализируем Директ
    RG.Ads.YaDirect.init();

    // Инициализируем компонент директа
    RG.parser.render('rg-yadirect');

    // Инициализируем Ivengo
    /*if (!RG.meta.getAdsHide()) {

        RG.logger.log('Ads Ivengo hide false');

        RG.Ads.Ivengo.init();
    } else {
        RG.logger.log('Ads Ivengo hide true');
    }*/

    // Инициализируем Turboroller
    //RG.Ads.Turboroller.init(); Выключил пока они не поддреживают https

    // Инициализация Партнерок
    // После того, как получили путевой лист
    /*RG.events.subscribe('Adfox.platform.loaded', function(topic, places){

        // Запускается один раз только
        RG.Partners.init(places);
    });*/

    /*
     * Инициализация модуля ScreenViewer
     */
    RG.ScreenViewer.init();

    // Инициализируем подписку
    RG.events.publish(`${RG.ScreenViewer._modulePrefix}.check`);

    // Считываем тип экрана после ресайза
    $(window).on('resize', () => {

        RG.events.publish('window.resize');
    });

    /*
     * Инициализация модуля BlocksShifter
     */
    RG.BlocksShifter.init();

    /*
     * Работа с модулем BlocksShifter
     * Когда обновляется информация о типе экрана,
     * запускаем перестановку блоков
     */
    RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.check`, (topic) => {

        var screenInfo = RG.ScreenViewer.getScreenInfo();

        RG.logger.info(topic);

        // Инициализируем получение площадок
        RG.Place.init(screenInfo);

        // Настраиваем BlockShifter
        RG.events.publish(`${RG.BlocksShifter._modulePrefix}.run`, screenInfo);

        RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, (topic, screenInfo) => {

            RG.logger.info(topic);
            RG.events.publish(`${RG.BlocksShifter._modulePrefix}.run`, screenInfo);
        });
    });

    /**
     * Инициализация модуля региональных новостей
     */
    RG.RegionalNews.init();

    /**
     * Инициализация блока перезагрузки контента
     */
    RG.LiveReload.init();
    RG.LiveReload.run();

    /**
     * Костыль, что бы не ломать авторизацию
     * TODO Избавиться от этого кода
     */
    /*RG.storage.set('auth', {
        email: '',
        firstName: '',
        lastName: ''
    });*/

    //let auth = RG.storage.get('auth');
    /**
     * TODO Избавиться от этого кода
     */

    /**
     * Инициализация модуля авторизации
     */
    //RG.Auth.init();

    /**
     * Инициализация сессии пользователя
     */
    //RG.session.init();

    /**
     * Проверка сессии пользователя
     */
    //RG.events.publish('session.check');

    /**
     * Запуск меню
     */
    // RG.Menu.init();
    // RG.Menu.run();

    /**
     * Инициализация модуля замены списка выпадающим меню
     */
    new RG.ListHeadToSelect('.b-list-head_catalog .b-list-head__name_related', '.b-list-head_catalog .b-list-head__row', '.b-list-head_catalog .b-list-head__related');

    /**************************************************************************************
     ШАПКА
     *************************************************************************************/
    /**
     * Инициализируем меню партнеров в шапке
     * TODO Необходимо как то упростить этот код или вынести в отдельный модуль
     */
    (function() {

        $('.b-vendors__item_more-btn').colorbox({

            onComplete() {
                //RG.events.publish('colorbox.opened');
            },

            onOpen() {
                RG.events.publish('colorbox.opened');
            },

            onCleanup() {
                RG.events.publish('colorbox.closed');
            },

            className: 'b-vendors b-vendors_overlay',
            inline: true,
            href: $('.b-vendors_header').html(),

            width: '408px',
            height: '400px',

            opacity: 0.7,

            //transition: 'none',
            initialWidth: 0,
            initialHeight: 0,
        });

    })();

    /**************************************************************************************
     ПОДВАЛ
     *************************************************************************************/

    /**
     * Инициализация Раскрывающегося блока в футере
     */

    RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.check`, (topic) => {

        var screenInfo = RG.ScreenViewer.getScreenInfo();

        if (screenInfo.type !== 'tabletLandscape' && screenInfo.type !== 'desktop' && screenInfo.type !== 'desktopFull') {

            // Если блок еще не инициализировался
            if (!window.footerContentToggler) {

                window.footerContentToggler = new RG.ContentToggler($('.b-footer')[0], {
                    btn: '.b-footer__toggle',
                    ctx: '.b-footer__links',
                    opened: false
                });

            } else {

                // Если объект был создан,
                // а мы перешли из десктопа,
                // то просто скрываем блок
                // + дополнительная проверка, на телефоне при скролле за пределы экрана срабатывает ресайз
                if (!!screenInfo.infoBefore && (screenInfo.infoBefore.screenWidth !== screenInfo.screenWidth)) {
                    if (screenInfo.infoBefore.type !== 'tabletLandscape' || screenInfo.infoBefore.type === 'desktop' || screenInfo.infoBefore.type === 'desktopFull') {
                        window.footerContentToggler.initialHide();
                    }
                }

            }

        } else {

            // Если перешли в десктоп - уничтожаем блок
            if (window.footerContentToggler) {
                window.footerContentToggler.destroy();
            }

        }

    });

    RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, function(topic, screenInfo) {

        if (screenInfo.type !== 'tabletLandscape' && screenInfo.type !== 'desktop' && screenInfo.type !== 'desktopFull') {

            // Если блок еще не инициализировался
            if (!window.footerContentToggler) {

                window.footerContentToggler = new RG.ContentToggler($('.b-footer')[0], {
                    btn: '.b-footer__toggle',
                    ctx: '.b-footer__links',
                    opened: false
                });

            } else {

                // Если объект был создан,
                // а мы перешли из десктопа,
                // то просто скрываем блок
                // + дополнительная проверка, на телефоне при скролле за пределы экрана срабатывает ресайз
                if (!!screenInfo.infoBefore && (screenInfo.infoBefore.screenWidth !== screenInfo.screenWidth)) {
                    if (screenInfo.infoBefore.type !== 'tabletLandscape' || screenInfo.infoBefore.type === 'desktop' || screenInfo.infoBefore.type === 'desktopFull') {
                        window.footerContentToggler.initialHide();
                    }
                }

            }

        } else {

            // Если перешли в десктоп - уничтожаем блок
            if (window.footerContentToggler) {
                window.footerContentToggler.destroy();
            }

        }

    });

    /**
     * Инициализация карусели продуктов в футере
     */
    $('#vendorsRg').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 7,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: 300,
                    //slidesToShow: 2

                    variableWidth: true,
                    slidesToShow: 1,
                    centerMode: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    dots: false,
                    infinite: true,
                    speed: 300,
                    slidesToShow: 7
                }
            }
        ]
    });

    /**
     * Инициализируем меню рубрик в футере на телефоне
     *
     * Убрали эту штуковину и рубрики ушли в шапку
     *
     */
    /*(function() {

     $('.b-footer__categories').colorbox({

     onComplete() {
     RG.events.publish('colorbox.opened');
     },

     onCleanup() {
     RG.events.publish('colorbox.closed');
     },

     className: 'b-categories b-categories_overlay',
     inline: true,
     href: $('.b-sidebar-left__item.b-categories').html(),

     width: '408px',
     height: '360px'
     });

     })();*/

    // ЧТО это мужики?!
    (() => {

        if(document.location.hash === '#code') {

            login('code.required', false, true);
        }
    })();

    /**************************************************************************************
     ГЛОБАЛЬНЫЕ СОБЫТИЯ
     TODO ЖЕЛАТЕЛЬНО ВЫНЕСТИ В ОТДЕЛЬНЫЙ ФАЙЛ
     *************************************************************************************/
    RG.events.registerList({

        /**
         * События всплывающих окон
         */
        'login': login,

        /**
         * Вызов модального окна поиска
         */
        'search.overlay.show': searchOverlayShow,

        /**
         * Вызов модального окна регионов
         * @param topic
         */
        'region.overlay.show': topic => {

            RG.logger.info(topic);

            if(RG.config.regions) {
                regionOverlayShow('region.overlay.show', RG.config.regions);
            } else {
                RG.events.subscribe('geolocation.region.update', regionOverlayShow, RG.config.regions);
                RG.events.publish('geolocation.region.all');
            }
        },

        /**
         * Вызов модального окна сюжетов
         */
        'followed.show': followedOverlayShow,

        /**
         * Вызов модального окна просмотренных материалов
         */
        'viewed.show': viewedOverlayShow,

        /**
         * Событие переалрисации от соц. сети
         */
        'session.confirm.required': topic => {

            RG.logger.info(topic);
            if(document.location.hash === '#social_redirect') {
                RG.events.publish('login', true);
            }
        },

        /**
         * Изменяет размер модального окна под контент
         * @param topic
         */
        'overlay.resize': (topic) => {

            RG.logger.info(topic);

            let $list = $('#colorbox').find('.js-height-list');

            if($list.offset()) {

                $list.css('height', $windowHeight - $list.offset().top);
            }

            $.colorbox.resize();

            setBodyFixed();
        },

        // add Alex 30.11.2016
        /**
         * Фиксирует окно
         */
        'colorbox.opened': setBodyFixed,

        /**
         * Отменяет фиксацию окна
         */
        'colorbox.closed': unsetBodyFixed,

        /**
         * Показать модальное окно
         */
        'overlay.show': () => {
            overlayShow(true);
        },

        /**
         * Скрыть модальное окно
         */
        'overlay.hide': () => {
            overlayShow(false);
        },

        /**
         * Обработка авторизованного пользователя
         * @param topic
         */
        'session.user.authorized': (topic) => {

            RG.logger.info(topic);

            RG.Auth.destruct();
            $.colorbox.close();
        },

        /**
         * Инициализация скролла
         * @param topic
         * @param $element
         */
        'scroll.init': (topic, $element) => {

            RG.logger.info(topic);

            let type = RG.ScreenViewer.getScreenInfo().type;

            if(type !== 'tabletLandscape' && type !== 'tablet' && type !== 'mobile') {

                $element = $element || $('.js-scroll-bar');

                if($element.length) {

                    $element.mCustomScrollbar("destroy");

                    $element.mCustomScrollbar({
                        autoHideScrollbar: true
                    });
                }
            }
        },

        /**
         * Деактивация скролла
         * @param topic
         * @param $element
         */
        'scroll.destroy': (topic, $element) => {

            RG.logger.info(topic);

            $element = $element || $('.js-scroll-bar');

            $element.mCustomScrollbar("destroy");
        },

        'livereload.init': topic => {

            RG.logger.info(topic);

            if (!!$('.b-broadcast-sport').length) {

                // Инициализируем переключалку контента
                new RG.ContentHandler('.b-broadcast-sport', {
                    labelList: '.b-broadcast-sport__menu-item'
                });

                RG.ScrollTopBroadcast.init();
            }

            $.getScript('//platform.twitter.com/widgets.js');
            $.getScript('//platform.instagram.com/en_US/embeds.js"');

            RG.events.publish('scroll.init');
        },
        'geolocation.region.changed': topic => {

            RG.logger.info(topic);

            $.colorbox.close();
        }
    });

    /**************************************************************************************
     ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
     TODO ВЫНЕСТИ В ОТДЕЛЬНЫЙ ФАЙЛ
     *************************************************************************************/

    // add Alex 30.11.2016
    function setBodyFixed() {
        //$('body').addClass('is-fixed');
        $('body').addClass('scroll-disabled');
    }

    // add Alex 30.11.2016
    function unsetBodyFixed() {
        //$('body').removeClass('is-fixed');
        $('body').removeClass('scroll-disabled');
    }

    function login(topic, social, code) {

        RG.logger.info(topic);

        // Говорим, что загрузка колорбокса началась
        $cbox.addClass('has-loading');
        $cboxOverlay.addClass('has-loading');

        // Обработка всплывашки
        $.colorbox({

            html: '<div id="authContainer"></div>',

            onComplete() {

                var type = code ? 'code' : null;

                RG.Auth.run(type);
                RG.events.publish('colorbox.opened', 'login');

                social ? RG.events.publish('aurh.confirm.required') : null;

                setTimeout(function(){

                    // Обновляем колорбокс
                    $.colorbox.resize({
                        innerWidth: 360,
                        innerHeight: 600
                    });

                    // Удаляем класс загрузки
                    $cbox.removeClass('has-loading');
                    $cboxOverlay.removeClass('has-loading');

                    RG.events.publish('tab.selected.set', $('.b-auth .b-tab__item_1'));
                }, 1000);

            },

            onLoad() {},

            onCleanup() {
                RG.logger.info('close colorbox');
                RG.events.publish('colorbox.closed', 'login');

                // Процесс скрытия блока
                $cbox.addClass('hidding');
                setTimeout(function(){
                    $cbox.removeClass('hidding');
                }, 1000);
            },

            returnFocus: false,
            scrolling: false,
            opacity: 0.7,

            //width: 360,
            //height: 700,

            initialWidth: 0,
            initialHeight: 0,
            transition: 'none'
        });
    }

    function searchOverlayShow(topic) {

        RG.logger.info(topic);

        $cbox.addClass('has-loading');
        $cboxOverlay.addClass('has-loading');

        $.colorbox({

            html: '<div id="searchOverlay"></div>',
            closeButton: false,

            onComplete() {

                new SearchOverlay();
                RG.events.publish('overlay.resize');
                RG.events.publish('colorbox.opened', 'search');

                setTimeout(function(){
                    // Удаляем класс загрузки
                    $cbox.removeClass('has-loading');
                    $cboxOverlay.removeClass('has-loading');
                }, 300);
            },
            onLoad() {

            },

            onCleanup() {

                RG.events.publish('colorbox.closed', 'search');

                // Процесс скрытия блока
                $cbox.addClass('hidding');
                setTimeout(function(){
                    $cbox.removeClass('hidding');
                }, 1000);
            },

            onClosed() {

            },

            returnFocus: false,
            className: 'b-modal_search',
            opacity: 0.7,

            initialWidth: 0,
            initialHeight: 0,
            transition: 'none'
        });
    }

    function followedOverlayShow(topic) {

        RG.logger.info(topic);

        $cbox.addClass('has-loading');
        $cboxOverlay.addClass('has-loading');

        $.colorbox({

            html: '<div id="followed"></div>',

            onComplete() {

                RG.events.publish('followed.run');
                RG.events.publish('colorbox.opened', 'followed');

                setTimeout(function(){
                    // Удаляем класс загрузки
                    $cbox.removeClass('has-loading');
                    $cboxOverlay.removeClass('has-loading');
                }, 300);
            },

            onLoad() {

            },

            onCleanup() {

                RG.events.publish('followed.destroy');
                RG.events.publish('colorbox.closed', 'followed');

                // Процесс скрытия блока
                $cbox.addClass('hidding');
                setTimeout(function(){
                    $cbox.removeClass('hidding');
                }, 1000);
            },

            onClosed() {

            },

            returnFocus: false,
            transition: 'none',
            top: $('#menu').offset().top + 53,
            right: 0,
            className: 'b-modal_header',
            opacity: 0.7,

            initialWidth: 0,
            initialHeight: 0
        });
    }

    function viewedOverlayShow(topic) {

        RG.logger.info(topic);

        $cbox.addClass('has-loading');
        $cboxOverlay.addClass('has-loading');

        $.colorbox({

            html: '<div id="viewed"></div>',

            onComplete() {

                RG.events.publish('viewed.run');
                RG.events.publish('colorbox.opened', 'viewed');

                // Обновляем колорбокс
                $.colorbox.resize({
                    innerWidth: 390
                });

                setTimeout(function(){
                    // Удаляем класс загрузки
                    $cbox.removeClass('has-loading');
                    $cboxOverlay.removeClass('has-loading');
                }, 300);
            },

            onLoad() {

            },

            onCleanup() {

                RG.events.publish('viewed.destroy');
                RG.events.publish('colorbox.closed', 'viewed');

                // Процесс скрытия блока
                $cbox.addClass('hidding');
                setTimeout(function(){
                    $cbox.removeClass('hidding');
                }, 1000);
            },

            onClosed() {

            },

            returnFocus: false,
            transition: 'none',
            top: $('#menu').offset().top + 53,
            right: 0,
            className: 'b-modal_header',
            opacity: 0.7,

            initialWidth: 0,
            initialHeight: 0
        });
    }

    function regionOverlayShow(topic, regions) {

        RG.config.regions = regions;

        RG.events.unsubscribe('geolocation.region.update');

        RG.logger.info(topic);

        $cbox.addClass('has-loading');
        $cboxOverlay.addClass('has-loading');

        $.colorbox({

            html: '<div id="region"></div>',

            onComplete() {

                new Region();
                RG.events.publish('colorbox.opened', 'region');

                // Обновляем колорбокс
                $.colorbox.resize({
                    innerWidth: 900,
                    innerHeight: 300
                });

                setTimeout(function(){
                    // Удаляем класс загрузки
                    $cbox.removeClass('has-loading');
                    $cboxOverlay.removeClass('has-loading');
                }, 300);
            },

            onLoad() {

            },

            onCleanup() {
                RG.events.publish('colorbox.closed', 'region');

                // Процесс скрытия блока
                $cbox.addClass('hidding');
                setTimeout(function(){
                    $cbox.removeClass('hidding');
                }, 1000);
            },

            onClosed() {

            },

            returnFocus: false,
            scrolling: false,
            opacity: 0.7,
            //width: 900,
            //height: 300,

            initialWidth: 0,
            initialHeight: 0,
            transition: 'none'
        });
    }

    function overlayShow(show) {

        var $overlay = $('#cboxOverlay');

        if(show) {
            $overlay.show();
            setBodyFixed();
        } else {
            $overlay.hide();
            unsetBodyFixed();
        }

        return false;
    }


new RG.ListHeadToSelect('.b-categories__link', '.b-categories', '.b-categories__list');

});
// END DOM READY



$(function() {
    (function () {

        var share = new Ractive.components.share({
            el: '#share',
            data() {
                return {
                    owner: 'share',
                    options: {
                        theme: {
                            counter: true
                        }
                    },
                    content: 'Поделиться:'
                }
            }
        });

        RG.events.publish('share.set', {
            url: $('meta[property="og:url"]').attr('content'),
            title: $('meta[property="og:title"]').attr('content'),
            description: $('meta[name="description"]').attr('content'),
            image: $('meta[property="og:image"]').attr('content')
        });

    })();
});