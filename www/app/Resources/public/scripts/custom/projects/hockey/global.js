
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/
RG.LoadChain = RG.LoadChain || require('../../../modules/LoadChain');

$(function() {

    new RG.LoadChain({
        tmplName: 'project-hockey',
        elMap: {
            root: '#bNewsChain',
            list: '.b-news__list'
        }
    });

    // Инициализируем шеринг
    RG.parser.render('share');

    // Пристыковываем шеринг
    $(".b-share").stick_in_parent({
        //parent: '.b-material-wrapper__content',
        offset_top: 10,
    });

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
        } else {
            var linx = $(elem).find('a.tableTabs');       
        }
        
        if (activeTab) {
            $(linx[activeTab]).addClass('active');
        } else {
            $(linx[0]).addClass('active');
        }

        if (elem == '.b-scores') {
            var tables = $(elem+'.colorbox').find(elem+'__part');        
        } else {
            var tables = $(elem).find(elem+'__part');        
        }

        if (activeTab) {
            $(tables[activeTab]).addClass('active');
        } else {
            $(tables[0]).addClass('active');
        }
        
        
        if (elem == '.b-schedule') {
            hiddenBlox();
        }

        $(linx).on('click', function(){
            if (!$(this).hasClass('active')) {
                $(linx).toggleClass('active');
                $(tables).toggleClass('active');
            }

            if ($('body').hasClass('scroll-disabled')) {
                colorboxChange();
            }

            if (elem = '.b-schedule') {
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
        toggleTabs('.b-schedule');
    }

    // Слик на главной

    var slickOptions = {
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        // variableWidth: true,
        responsive: [
            {
                breakpoint: 1760,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 1260,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 990,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };

    // $('.b-media').slick(slickOptions);

    // if ($(window).width() >= 1260) {
    //     $('.b-media').slick('unslick');
    // }

    // $(window).on('resize', function(){
    //     if ($(window).width() < 1260) {
    //         $('.b-media').slick(slickOptions);
    //         console.log('slick');
    //     } else {
    //         $('.b-media').slick('unslick');
    //         console.log('unslick');
    //     }
    // });

    // Всплывашка расписания

    // $('.b-schedule__head__full-schedule').colorbox({
    //     href:"/ssi/blocks/custom/projects/hockey/crosslayouts/b-schedule-full/b-schedule-full.ssi",
    //     width: '100%',
    //     height: '100%',
    //     className: 'b-schedule colorbox',
    //     onOpen: function() {
    //         $('body').addClass('scroll-disabled');
    //     },
    //     onComplete: function() {
    //         colorboxChange();
    //     },
    //     onClosed: function() {
    //         $('body').removeClass('scroll-disabled');
    //     }
    // });

    // Всплывашка турнирной таблицы
//

    $('.b-scores__full-table').colorbox({
        href:"/ssi/blocks/custom/projects/hockey2016/crosslayouts/b-scores/b-scores.ssi",
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

    $('.b-menu__wrapper .b-menu__text').colorbox({
        href: $('.b-menu__overlay').html(),
        width: '100%',
        height: '100%',
        inline: true,
        className: 'b-menu__colorbox',
        initialWidth: 0,
        initialHeight: 0,
        transition: 'none'
    });

//    // Всплывашка бомбардиров

    // $('.b-goalscorers__full-table').colorbox({
    //     href:"/ssi/blocks/custom/projects/hockey/crosslayouts/b-goalscorers/b-goalscorers.ssi",
    //     width: '100%',
    //     height: '100%',
    //     className: 'b-goalscorers colorbox',
    //     onOpen: function() {
    //         $('body').addClass('scroll-disabled');
    //     },
    //     onComplete: function() {
    //         colorboxChange();
    //     },
    //     onClosed: function() {
    //         $('body').removeClass('scroll-disabled');
    //     }
    // });
//

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

});