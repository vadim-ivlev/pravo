
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/
//RG.LoadChain = RG.LoadChain || require('../../../modules/LoadChain');
RG.bGmap = RG.bGmap || require('../../../../blocks/custom/projects/football/main/b-gmap/scripts/main');
//RG.LiveReload = RG.LiveReload || require('../../../modules/LiveReload');

var bNewsLastCtrl = require('../../../../blocks/custom/projects/football/main/b-news/scripts/b-news_last');

$(function() {

    /*RG.LiveReload.init();
    RG.LiveReload.run();*/

    // Если есть функция initMap
    if ($('#map').length) {
        $.getScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyCLpLBDvdiNs2RGtg8lcF9pyoi-HJVhqIc', function(){

            // Инитим гуглокарту
            RG.bGmap.initMap();
        });

        // Клик по маркеру вне карты
        $('.b-gmap__link').on('click', function(){ 

            //смотри рел с индексом
            var i = $(this).attr('rel');

            // Скрываем все всплывашки на карте
            for(var k = 0; k < RG.bGmap.arrInfoWindows.length; k++) {
                RG.bGmap.arrInfoWindows[k].close();
            }

            // Открываем нужный маркер
            RG.bGmap.arrInfoWindows[i].open(RG.bGmap.map, RG.bGmap.arrMarkers[i]);
        });
    }

    bNewsLastCtrl.init();

    /*var rgScreen = RG.ScreenViewer.getScreenInfo();

    if(rgScreen.screenWidth > 990) {
        $('.b-news_last__part').colmaker();
    }*/

    /*new RG.LoadChain({
        tmplName: 'project-football',
        elMap: {
            root: '#bNewsChain',
            list: '.b-news__list'
        }
    });*/

    // Слик на главной

    $('#rgb_media .b-media__slick').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 990,
                settings: {
                    centerMode: true,
                    slidesToShow: 2
                }
            }
        ]
    });

    $('.b-gmap__links').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        centerMode: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {                    
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });

    // Если есть элемент с шерингом
    if (!!$('.b-share').length) {

        // Инициализируем шеринг
        RG.parser.render('share');

        RG.BlocksShifter.setCallback([

            // Обратный вызов, когда переключается шаринг на мобильный
            // Нам нужно выключать stick
            {
                blockId: 'rgb_share',
                screenType: 'mobile',
                callback: ($target, $active) => {

                    $target.trigger("sticky_kit:detach");
                }
            },
            // Инициализируем stick
            {
                blockId: 'rgb_share',
                screenType: 'tablet tabletLandscape desktop desktopFull',
                callback: ($target, $active) => {

                    $target.stick_in_parent({
                        offset_top: 10,
                        recalc_every: 1
                    });
                }
            }

        ]);

    }

    // Переинициализация медиа в контенте статьи
    // Инициализация нормализации
    if (!!RG.MediaNormalize) {
        RG.MediaNormalize.init({
            //mediaWrapper: '.b-content'
            mediaWrapper: '.b-material-wrapper__content-wrapper'
        });
    }

    // Открывашка в расписании

    var hiddenBlox = function(){
        $('.b-schedule__mobile__hidden').each(function(){
            var h = $(this).children('div').outerHeight() + 5;
            $(this).css('height', h);
            $(this).addClass('is-closed');
        });
    }

    $('.b-schedule__mobile__arrow').on('click', function(){
        var elem = $(this).closest('.b-schedule__mobile__item').find('.b-schedule__mobile__hidden');
        elem.toggleClass('is-closed');
        $(this).toggleClass('is-open');
    });


    $(window).on('resize', function(){
        $('.b-schedule__mobile__hidden').each(function(){
            var h = $(this).children('div').outerHeight();
            $(this).css('height', h);
            // $(this).addClass('is-closed');
        });        
    });


    // Переключалка таблиц в расписании

    var toggleTabs = function(elem, activeTab) {

        if (elem == '.b-scores') {
            var linx = $(elem+'.colorbox').find('a.tableTabs');      
            var tables = $(elem+'.colorbox').find(elem+'__part');        
        } else {
            var linx = $(elem).find('a.tableTabs');       
            var tables = $(elem).find(elem+'__part');        
        }

        if (activeTab) {
            $(linx[activeTab]).addClass('active');
            $(tables[activeTab]).addClass('active');
        } else {
            $(tables[0]).addClass('active');
            $(linx[0]).addClass('active');
        }
        
        
        if (elem == '.b-schedule') {
            hiddenBlox();
        }

        $(linx).on('click', function(){
            if (!$(this).hasClass('active')) {
                $(linx).removeClass('active');
                $(tables).removeClass('active');
                $(this).addClass('active');
                $(tables[$(this).index()]).addClass('active');
            }

            if ($('body').hasClass('scroll-disabled')) {
                colorboxChange();
            }

            if (elem == '.b-schedule') {
                var scheduleMobile = $('.b-schedule__mobile__item').find('.b-schedule__mobile__hidden');
                scheduleMobile.addClass('is-closed');
                $('.b-schedule__mobile__arrow').removeClass('is-open');
                hiddenBlox();
            }
        });
    }

    if ($('.b-schedule').hasClass('b-schedule_full')) {

        toggleTabs('.b-schedule', 1);

    } else {

        var $elems = $('.date_array').find('a.tableTabs'),
            $todayElem = $('.date_array').find('a.tableTabs[data-date="'+moment().format('D')+'"]'),
            $yesterdayElem = $('.date_array').find('a.tableTabs[data-date="'+moment().subtract(1 , 'days').format('D')+'"]'),
            indexOfElement = $todayElem.index();

        if (indexOfElement < 0) {
            if ($yesterdayElem) {
                indexOfElement = 1;
            } else {
                indexOfElement = 0;
            }
        }

        $elems.each(function(){
            if ($(this).index() > 2) {
                $(this).remove();
            }
        });

        toggleTabs('.b-schedule', indexOfElement);
    }


    // Всплывашка турнирной таблицы

    $('.b-scores__full-table').colorbox({
        href:"/ssi/blocks/custom/projects/football2016/crosslayouts/b-scores/b-scores.ssi",
        width: '100%',
        height: '100%',
        className: 'b-scores colorbox',
        initialWidth: 0,
        initialHeight: 0,
        onOpen: function() {
            $('body').addClass('scroll-disabled');
        },
        onComplete: function() {
            toggleTabs('.b-scores', 1);
            colorboxChange();
        },
        onClosed: function() {
            $('body').removeClass('scroll-disabled');
        },
        transition: 'none'
    });

    $('.b-menu__mobile-link').colorbox({
        href: $('.b-menu__overlay').html(),
        width: '100%',
        height: '100%',
        inline: true,
        className: 'b-menu__colorbox',
        initialWidth: 0,
        initialHeight: 0,
        transition: 'none'
    });

    // Функция изменения размеров колорбокса

    var colorboxChange = function() {

        var winWidth = 0;
        var inHeight = 0;

        winWidth = $(window).width();
    
        if ($('#colorbox').hasClass('b-schedule')) {
            inHeight = '90%';
        } else if ($('#colorbox').hasClass('b-scores')) {
            inHeight = '90%';
        } else {
            inHeight = $('#cboxLoadedContent > div').outerHeight() + 40;
        }

        if ($(window).width() >= 1760) {

            $.colorbox.resize({
                width: 1390,
                height: inHeight
            });

        } else if ($(window).width() >= 1260) {

            $.colorbox.resize({
                width: 1220,
                height: inHeight
            });

        } else if ($(window).width() < 1260 && $(window).width() >= 990) {
            
            $.colorbox.resize({
                width: '100%',
                height: inHeight
            });

        } else if ($(window).width() < 990) {
            
            $.colorbox.resize({
                width: '100%',
                height: inHeight
            });

        }

    }

    colorboxChange();

    // Изменение размеров колорбокса при ресайзе окна

    $(window).on('resize', function(){
        colorboxChange();
    });


    // Штука для дублирования новостей чемпионата в прилипалу
    // Проверяем где мы
    if ($('.section-article').length) {     

        // Функция прилипания новостей чемпионата в правом сайдбаре
        var stickNews = function(_screenInfo){

            // Объявляем переменные
            var screenInfo = _screenInfo || RG.ScreenViewer.getScreenInfo(),
                articleHeigth = $('article').outerHeight(),
                $target = null,
                needHeight = [2500, 2600];

            // Если экран не мобила
            if (screenInfo.type !== 'mobile') {

                // Проверяем ширину экрана, ибо от этого зависит высота статьи
                if (screenInfo.type === 'tablet' || screenInfo.type === 'tabletLandscape') {
                    articleHeigth = needHeight[0];
                } else if (screenInfo.type === 'desktop' || screenInfo.type === 'desktopFull') {
                    articleHeigth = needHeight[1];
                }

                // Оборачиваем статью для задания высоты для прилипшего элемента  
                if (!$('.jsWrapperForStick').length) { 

                    $('.section-article, #rgb_sidebar-right').wrapAll('<div class="jsWrapperForStick"/>');

                    if ($('.jsWrapperForStick').outerHeight() > articleHeigth) {
                        // Клонируем объект для прилипания
                        $target = $('.b-feed.b-sidebar-right__item')
                            .clone().removeClass('shiftContainer')
                            .addClass('jsElementForStick')
                            .appendTo('#rgb_sidebar-right');

                        // Само прилипание
                        $target.stick_in_parent({
                            parent: '.jsWrapperForStick',
                            offset_top: 10
                        });
                    }
                    
                }


            } else {

                // Проверяем наличие стика
                if ($target) {

                    // Дестроим стик
                    $target.trigger("sticky_kit:detach");

                }

            }

        };

        // Запуск при загрузке
        stickNews();

        // Подписка на событие изменения экрана
        RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, (topic, screenInfo) => {
            stickNews(screenInfo);
        });

    }

});