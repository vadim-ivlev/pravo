/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/
/**
 * Подключение модуля перестановки блоков
 */
RG.BlocksShifter = RG.BlocksShifter || require('./modules/BlocksShifter');

/**
 * Подключение модуля загрузки супершпигелей
 */
var Supersp =  require('../blocks/main/b-date-panel-spiegel/scripts/main');

/**
 * Подключение блока свежего номера
 */
var Fresh = require('../blocks/overlays/b-fresh/scripts/main');

/*
 * Контроллер блока документов
 *
 */
var Docs = require('../blocks/crosslayouts/b-docs/scripts/main');




// On Ready DOM
$(function() {

    // Обрабатываем ссылки у документов (причесываем)
    Docs.init();

	// Модуль не инициализируем, потому что это уже сделано в global
	// Устанавливаем поведение для блоков
    RG.BlocksShifter.setCallback([

        // Реинит курса валют
        /*{
            blockId: 'rgb_exchange',
            screenType: 'mobile tablet tabletLandscape',
            callback: ($target, $active) => {

                RG.LiveReload.init();
                RG.LiveReload.run();
            }
        },*/
        
        // Обратный вызов в момент включения блока
        // Добавляем колонки
        {
            blockId: 'rgb_feed_main-today',
            screenType: 'tablet tabletLandscape',
            callback: ($target, $active) => {

                $target
                    .find('.b-feed__body')
                    .removeClass('b-feed__body_height-auto')
                    .addClass('b-feed_col');

                // Разбиваем на колонки материалы
                // через плагин для jQuery colmaker
                $target.find('.b-feed__list').colmaker({
                    colClasses: 'b-feed__col'
                });


            }
        },

        // Обратный вызов в момент включения блока
        // Убираем колонки (вызываем если зашли с меньшего разрешения, и потом расширили экран)
        {
            blockId: 'rgb_feed_main-today',
            screenType: 'mobile desktop desktopFull',
            callback: ($target, $active) => {

                $target
                    .find('.b-feed__body')
                    .removeClass('b-feed_col')
                    .addClass('b-feed__body_height-auto');

            }
        },

        // Блок федеральных/региональных новостей
        // инициализируем скролл мобильный
        /*{
            blockId: 'rgb_feed_last-news',
            screenType: 'mobile',
            callback: ($target, $active) => {

                var $list = $target.find('.b-feed__list');

                $list.mCustomScrollbar('destroy');
                $list.mCustomScrollbar({
                    autoHideScrollbar: true
                });

            }
        },
        
        // Блок федеральных/региональных новостей
        // инициализируем скролл все остальное
        {
            blockId: 'rgb_feed_last-news',
            screenType: 'tablet tabletLandscape desktop desktopFull',
            callback: ($target, $active) => {

                var $list = $target.find('.b-feed__list');

                $list.mCustomScrollbar('destroy');
                $list.mCustomScrollbar({
                    autoHideScrollbar: true
                });

            }
        },*/


        // Обратный вызов в момент включения блока
        // Для планшетной версии и мобильной включаем слайдер
        {
            blockId: 'rgb_accents_projects',
            screenType: 'mobile tablet tabletLandscape',
            callback: ($target, $active) => {

                var $slickContainer = $target.find('.b-accents__list');

                //$target.addClass('has-sidebar');

                if (!$slickContainer.hasClass('slick-slider')) {

                    setTimeout(function(){

                        $slickContainer.slick({
                                dots: false,
                                infinite: true,
                                speed: 300,
                                slidesToShow: 2,
                                centerMode: false,
                                adaptiveHeight: true,
                                responsive: [
                                    {
                                        breakpoint: 768,
                                        settings: {
                                            slidesToShow: 1,
                                            centerMode: true
                                        }
                                    }
                                ]
                            });

                    }, 100);
                }
                
            }
        },
        {
            blockId: 'rgb_accents_projects',
            screenType: 'desktop desktopFull',
            callback: ($target, $active) => {

                var $slickContainer = $target.find('.b-accents__list');

                if ($slickContainer.hasClass('slick-slider')) {
                    try {
                        $slickContainer.slick('unslick');
                    } catch (err) {
                        RG.logger.error(err);
                    }
                }
                
            }
        },      

        // Обратный вызов в момент включения блока
        {
            blockId: 'rgb_accents_person',
            screenType: 'mobile tablet tabletLandscape',
            callback: ($target, $active) => {

                $target
                    .addClass('has-sidebar');

            }
        },
        {
            blockId: 'rgb_accents_person',
            screenType: 'desktop desktopFull',
            callback: ($target, $active) => {

                $target
                    .removeClass('has-sidebar');

            }
        },

        // Блок фото видео на главной странице,
        // включаем показ картинок на ховере,
        // только на десктопе
        {
            blockId: 'rgb_media',
            screenType: 'mobile tablet tabletLandscape',
            callback: ($target, $active) => {

                // Удаляем обработчики
                $target.find('.b-media__list-item').off('mouseenter mouseleave');

            }
        },
        {
            blockId: 'rgb_media',
            screenType: 'desktop desktopFull',
            callback: ($target, $active) => {

                var $prev = $target.find('.b-media__list-item'),
                    active = 'is-active';

                // Увеличить картинку на блоке
                $prev.on('mouseenter', function(){
                    $(this).addClass(active);
                });

                // Уменьшить картинку на блоке
                $prev.on('mouseleave', function(){
                    $(this).removeClass(active);
                });

            }
        }

    ]);

    /*
     * Инициализируем
     * акценты под новостями
     *
     */

    $('.b-accents_showcase .b-accents__list').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1760,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    /*
     * Блок свежий номер
     *
     */

    // Инициализация
    Fresh.init();

    // Подписываемся на публикацию события
    $('.b-btn-fresh').on('click', event => {
        RG.events.publish('Fresh.run');
    });

    // Инициализируем модуль вывода супершпигелей
    Supersp.init();

    // Запускаем модуль
    RG.events.publish('Supersp.run');
    
});