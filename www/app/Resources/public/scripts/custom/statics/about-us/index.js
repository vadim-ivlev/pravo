
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

/**
 * Подключение модуля видео
 */
RG.Video = RG.Video || require('../../../modules/Video');

/**
 * Подключение модуля нормализации ширины и высоты блоков
 */
RG.MediaNormalize = RG.MediaNormalize || require('../../../modules/MediaNormalize');

// Инициализация видео
RG.Video.init();

// Инициализация нормализации
RG.MediaNormalize.init();

$(function(){

    // Запуск видео анализатора
    RG.events.publish(`${RG.Video._modulePrefix}.run`);

    var anniversaryBlock = $(".b__row_anniversary"),

        interviewBlock = $(".b__row_interview"),

        anniversaryRubricator = $("#anniversary"),

        interviewRubricator = $("#interview"),

        toggleClass = "b-rubricator-menu__item_active",

        visuallyHidden = "visuallyhidden";

        anniversaryRubricator.click(function(){

            $(this).addClass(toggleClass);

            interviewRubricator.removeClass(toggleClass);

            anniversaryBlock.removeClass(visuallyHidden);

            interviewBlock.addClass(visuallyHidden);

        });

        interviewRubricator.click(function(){

            $(this).addClass(toggleClass);

            anniversaryRubricator.removeClass(toggleClass);

            interviewBlock.removeClass(visuallyHidden);

            anniversaryBlock.addClass(visuallyHidden);

        });

    // Запускаем нормализацию размеров
    RG.events.publish(`${RG.MediaNormalize._modulePrefix}.run`);
    $(window).on('resize', function(){
        RG.events.publish(`${RG.MediaNormalize._modulePrefix}.run`);
    });


});