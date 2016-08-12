
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

/**
 * Подключения модуля быстрого доступа
 */
RG.FastAccess = RG.FastAccess || require('../blocks/main/b-fast-access/scripts/main');

/**
 * Подключение модуля комментариев
 */
RG.Comments = RG.Comments || require('../blocks/main/b-comment/scripts/main');

/**
 * Подключение модуля материлов сюжета
 */
RG.SujetMaterials = RG.SujetMaterials || require('../blocks/overlays/b-sujet-materials/scripts/main');

/**
 * Подключение модуля видео
 * Deprecated
 */
//RG.Video = RG.Video || require('./modules/Video');

/**
 * Подключение модуля галереи
 * Deprecated
 */
//RG.Gall = RG.Gall || require('./modules/Gall');

/**
 * Подключение модуля нормализации ширины и высоты блоков
 */
RG.MediaNormalize = RG.MediaNormalize || require('./modules/MediaNormalize');

/**
 * Подключение модуля нормализации картинки, вставленной через редактуру
 */
RG.ImageNormalize = RG.ImageNormalize || require('./modules/ImageNormalize');

/**
 * Подключение модуля сообщения об ошибке
 */
RG.Typo = RG.Typo || require('./modules/Services/Typo');

/**
 * Подключение модуля нормализации ширины и высоты блоков
 */
RG.TextActions = RG.TextActions || require('../blocks/main/b-text-actions/scripts/TextActions');

/**
 * Спортивные трансляции
 */
RG.ScrollTopBroadcast = RG.ScrollTopBroadcast || require('../blocks/main/b-broadcast-sport/scripts/main');

/**
 * Релап
 */

RG.Relap = RG.Relap || require('./modules/Relap');
//RG.bRelap = RG.bRelap || require('../blocks/crosslayouts/b-relap/scripts/main');

/**************************************************************************************
 КОМПОНЕНТЫ
 *************************************************************************************/

/**
 * Фотогаллереи
 */
Ractive.components['rg-gall'] = require('../blocks/main/b-gallery/scripts/Gallery');

/**
 * Аудио
 */
Ractive.components['rg-audio'] = require('../blocks/crosslayouts/b-audio/scripts/Audio');

/**
 * Сохранить материал
 */
Ractive.components['rg-save-material'] = require('../blocks/crosslayouts/b-save/scripts/Save');

Ractive.components['rg-comment'] = require('../blocks/main/b-comment/scripts/Comment');

/**
 * Релап
 */
//Ractive.components['rg-relap'] = require('../blocks/crosslayouts/b-relap/scripts/Relap');

/**************************************************************************************
 ИНИЦИАЛИЗАЦИЯ
 *************************************************************************************/

// Инициализируем баннер Teads
if (!RG.meta.getAdsHide()) {

    RG.logger.log('Ads Teads hide false');

    RG.Ads.Teads.init();
} else {
    RG.logger.log('Ads Teads hide true');
}

// Инициализация видео Deprecated
//RG.Video.init();

// Инициализация галереи Deprecated
//RG.Gall.init();

// Инициализация сообщегия об ошибке
RG.Typo.init();

// Инициализация нормализации
RG.MediaNormalize.init({
    //mediaWrapper: '.b-content'
    mediaWrapper: '.b-material-wrapper'
});

/*
 * Инициализация галереи в фоторепе (нового типа)
 * Deprecated
 */

/*function rgG(optionId, galleryId){

    var

        // Определяем контейнер со скриптом
        $scriptRoot = $(`#rgG${optionId}`),

        // Определяем контейнер,
        // куда будем инициализировать галерею
        $root = $('<div/>', {
            id: `gallery_${galleryId}_${optionId}`
        });

    // Настраиваем контейнер, внутри которого скрипт
    $scriptRoot
        .parent()
        .addClass('gall-root');

    // Добавляем контейнер, в который будем помещать галерею
    $scriptRoot.before($root);

    // Инициализируем галерею
    RG.Gall.gallCreate({
        optionId: optionId,
        galleryId: galleryId,
        el: $root[0]
    });

}

window.rgG = rgG;*/


// Когда DOM загружен
$(function() {

    // Тестовый NativeRoll
    RG.Ads.NativeRoll.init();

    // Инициализация колорбокса для инфографики
    $('.article-img_infograph a[rel="example_group"]').colorbox();

    // Инициализируем компонент сохранения материала
    RG.parser.render('rg-save-material', {
        data: {
            material: RG.meta.getMaterial(),
            txt: 'Сохранить статью',
            saved: false
        }
    });

    // СУПЕРХАК!!!!
    /*$('div, h1, p').each(function(i, el){
        if($(el).text() === 'error 404') {
            $(el).hide();
        }
    });*/
/*
    if(RG.session.isAuthorized()) {

        RG.events.publish('viewed.set');
    }*/

    // Инициализайия аналитики статьи
    RG.events.publish(`${RG.Analytics.Contentinsights._modulePrefix}.run`);

    // Модуль быстрого доступа
    if (!RG.meta.getPreview()) {
        RG.FastAccess.init();
        RG.FastAccess.run();
    }

    // Маодуль комментариев
    RG.Comments.init();
    // RG.Comments.run();

    // Отключаем на странице preview
    if (!RG.meta.getPreview()) {
        new RG.TextActions();
    }

    RG.events.subscribe('fast-access.news', sujetMaterials);

    // Запуск видео анализатора
    //RG.events.publish(`${RG.Video._modulePrefix}.run`);

    // Запуск галереи анализатора Не нужен по ходу
    //RG.events.publish(`${RG.Gall._modulePrefix}.run`);

    // Выключение оверлея
    /*$('#cboxOverlay').on('click', function(){
        RG.events.publish('overlay.hide');
        RG.events.publish('gall.closeFullscreen');
    });*/

    // Запускаем нормализацию размеров
    RG.events.publish(`${RG.MediaNormalize._modulePrefix}.run`);

    // Запускаем инициализацию реплейса картинок через редактуру
    RG.ImageNormalize.init();

    $(window).on('resize', function(){
        RG.events.publish(`${RG.MediaNormalize._modulePrefix}.run`);
    });

    RG.events.registerList({
        'session.user.authorized': topic => {

            RG.events.publish('viewed.set');
        },

        'session.user.logedout': topic => {

            var sujetId = RG.meta.getSujet(),
                materialId = RG.meta.getMaterial();

            RG.events.publish('subscribe.sujet.removed', sujetId);
            RG.events.publish('subscribe.saved.removed', materialId);

        }
    });

    /*
     * Инициализация релапа
     *
     */
    if (!RG.meta.getPreview()) {
        RG.Relap.init();
    }

    /*(function(){

        var elems = RG.parser.getComponents('rg-relap'),
            limit = 0,
            count = 0,
            url = RG.meta.getMaterialUrl(),
            elemsArray = [];

        // Получем из каждого подключенного компонента переменную limit
        $.each(elems, function(){
            count = parseInt(this.data.limit);

            // Конкатенируем общий лимит с лимитом компонента
            limit = limit + count;
        });

        // Заупскаем функцию получения даннных с relap.io
        RG.bRelap.getPars(limit, url);

        // Рендерим relap.js
        RG.parser.render('rg-relap');

    })();

    $('.b-relap_rightSideBar').stick_in_parent({
        parent: '.l-page__wrapper',
        offset_top: 20
    });*/


    /*
     * Инициализация галереи через компонент
     *
     */

    RG.parser.render('rg-gall');

    /*
     * Инициализация видео через компонент
     *
     */

    RG.parser.render('rg-video');


    /*
     * Инициализация аудиофайлов через компонент
     *
     */

    RG.parser.render('rg-audio');

    /*
     * Инициализация блока подписки на документ
     *
     */

    RG.parser.render('rg-mailing');

    RG.events.publish('subscribe.doc.check');

    /*
     * Инициализация галереи в фоторепе (старого типа)
     * Deprecated
     */

    /*(function GalleryInit() {

        var interval = setInterval(function(){

            if (!!$('.img_small_r_item').length) {

                clearInterval(interval);

                // Old photorep
                $('.tile').each(function(i, el){

                    var $el = $(el),
                        $galleryWrapper = $('<div/>'),
                        $gallery = $('<div/>'),
                        $fullscreenBtn = $('<a class="b-icon b-gallery__btn-fullscreen" href="#"></a>');

                    $galleryWrapper.attr('id', 'Gallery' + Math.random().toString(36).substring(7));
                    $galleryWrapper.addClass("b-gallery");

                    //$galleryWrapper.append($fullscreenBtn);

                    $el.find('img').each(function(i, el){

                        var $el = $(el),
                            $imageWrap = $('<a />'),
                            title = $el.attr('title'),
                            srcthumb = $el.attr('src');

                        if (srcthumb.indexOf('/thumb') > -1) {

                            $el.attr('src', srcthumb);
                            $el.addClass("b-gallery__image");
                            $el.removeClass("prev_show_img");

                            $imageWrap.attr('href', srcthumb.replace('/thumbs', ''));
                            $imageWrap.attr('data-thumbratio', "80/55");
                            $imageWrap.attr('data-caption', '<span class="b-gallery__text">'+title+'</span><a class="b-gallery__link" href="#">Фото: Автор Фото</a>');

                            $imageWrap.append($el);

                            $gallery.append($imageWrap);

                        }

                    });


                    $gallery.addClass('galleryBox');

                    $gallery.attr({
                        "data-width":"100%",
                        "data-ratio":"800/530",
                        "data-loop":"true",
                        "data-keyboard":"true",
                        "data-click":"false",
                        "data-thumbmargin":"4",
                        "data-thumbheight":"50",
                        "data-nav":"thumbs",
                        "data-hash":"false",
                        "data-allowfullscreen":"native"
                    });



                    $galleryWrapper.append($gallery);

                    $('.tile').after($galleryWrapper);

                    $galleryWrapper.find('.galleryBox').fotorama();

                    $('.tile').empty();

                });

            }

        }, 500);

    })();*/
    // Инициализация галереи в фоторепе (старого типа)

    /*
     * Инициализация блока поделиться в конце статьи
     *
     */

    (function(){

        if (!RG.meta.getPreview()) {

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

        }

    })();
    // Инициализация блока поделиться в конце статьи

    // Если в статье имеется спортивная трансляция
    if (!!$('.b-broadcast-sport').length) {

        // Инициализируем переключалку контента
        new RG.ContentHandler('.b-broadcast-sport', {
            labelList: '.b-broadcast-sport__menu-item'
        });

        // Прилипалка меню у трансляции
        RG.ScrollTopBroadcast.init();
    }

});

function sujetMaterials() {

    $.colorbox({
        html: '<div id="sujetMaterials"></div>',

        onComplete() {

            RG.SujetMaterials.run(); // запускает
            RG.events.publish('colorbox.opened');
        },

        onLoad() {

            RG.SujetMaterials.init();
        },

        onCleanup() {

            RG.events.publish('colorbox.closed', 'viewed');
            RG.SujetMaterials.destruct();
        },

        onClosed() {
        },

        returnFocus: false,
        transition: 'none',
        top: 52,
        right: 0,
        opacity: 0.7,
    });
}
