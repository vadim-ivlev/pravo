/*
 * Модуль нормализации ширины и высоты блоков
 * наподобие iframe, подгружаемых извне
 * 
 * Работает внутри контейнеров с классом @mediaWrapper
 * Можно переназначить пропорциональность высоты к ширине
 * по-умолчанию 3/2
 *
 */

var
    /*
     * Свойства
     * 
     */
    
    // Префикс событий
    _modulePrefix = 'ImageNormalize',

    // ОБработка элемента
    process = ($img, param) => {

        var $image_wrapper = $('<div />').addClass('article-img'),
            $image_box = $('<div />'),
            $info_box = $('<div />'),
             title = param.title || '',
             source = param.source || '',
             align = $img.attr('align'),
             image_width = $img.width(),

             sourceBuffer = '';

        // append image wrapper before image
        $img.before($image_wrapper);
             
        // set image wrapper type width and float
        $image_wrapper.addClass('article-img_' + image_width);
        
        if (!!align) {
            $image_wrapper.addClass('article-img_f_' + align);
        }
            
        // set image data
        $image_box.addClass('article-img__pic');
        $image_box.append($img);

        if (/([А-Я-Ё]|\w)+/gi.test(source)) {
            sourceBuffer = '<b> Фото: ' + source + '</b>';
        }
        
        // set info data
        $info_box.addClass('article-img__info');
        $info_box.html(
            '<div class="article-img__info__text">' + 
                title + sourceBuffer +
            '</div>'
        );
        
        // append to image_wrapper
        $image_wrapper
            .append($image_box)
            .append($info_box);

    },

    // Запускаем обработку
    run = () => {

        // Ищем контейнеры
        $('.b-material-wrapper img').each(function(index, el){

            var $img = $(el),
                title = null,
                source = null;

            // Сохранить данные
            title = $(el).attr('data-title');
            source = $(el).attr('data-source');

            if (!!title || !!source) {

                // Обрабатываем элемент
                process($img, {
                    title: title,
                    source: source
                });
            }

        });

    },

    /*
     * Инициализация модуля
     *
     */

    init = () => {

        // Запускаем
        run();
    };

// Экспортируем модуль
module.exports = {
    _modulePrefix,
    init
}