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
    _modulePrefix = 'MediaNormalize',

    // Настройки по-умолчанию
    options = {

        // Контейнер для обрабатываемых элементов
        mediaWrapper: '.has-media',

        // Коэффициент пропорциональности
        ratio: '3/2',

        // Какие элементы обрабатываем
        targetEls: ['iframe']
    },

    // Определение пропорциональности
    perpareRatioFromTarget = ($el) => {

        var width = $el.attr('width'),
            height = $el.attr('height'),
            ratioW = null,
            ratioH = null,
            ratio = null;

        if (!!width && !!height) {
            ratioW = (width / height).toFixed(2);
            ratioH = (ratioW * height / width).toFixed(2);
            ratio = `${ratioW}/${ratioH}`;
        }

        return ratio;

    },

    // ОБработка элемента
    process = (el, $root) => {

        var $el = $(el),
            width = $root.width(),
            ratio = null;

            ratio = perpareRatioFromTarget($el) || options.ratio;

            // Разбиваем на множители
            ratio = ratio.split('/');

            // Задаем ширину
            $el.width(width);

            // Задаем высоту
            $el.height(ratio[1]*width/ratio[0]);

    },

    // Запускаем обработку
    run = (topic) => {

        // Ищем контейнеры
        $(options.mediaWrapper).each(function(index, el){

            var $mediaWrapperEl = $(el);

            // В найденном контейнере
            // ищем элементы для обработки
            // т.к. в массиве их может быть много,
            // проходим в итерации по @targetEls
            $.each(options.targetEls, function(index, el) {

                // Ищем элемент
                // Т.к. элементов может быть больше,
                // то проходим по ним в цикле и вызываем функцию
                // обработки
                $mediaWrapperEl.find(el).each(function(index, targetEl){

                    var $target = $(targetEl);

                    // Если это facebook вставка, скорее всего это картика
                    // ее просто растягиваем на 100%
                    if (!/facebook/.test($target.attr('src'))) {

                        // Обрабатываем элемент
                        process(targetEl, $mediaWrapperEl);
                    } else {
                        $target.css('maxWidth', '100%');
                    }
                });


            });

        });

    },


    /*
     * Инициализация модуля
     *
     */

    init = (userOptions) => {

        // Обновляем настройки
        options = $.extend({}, options, userOptions);

        // Инициализация подписчиков модуля
        RG.events.subscribe(`${_modulePrefix}.run`, run);
    };

// Экспортируем модуль
module.exports = {
    _modulePrefix,
    init
}