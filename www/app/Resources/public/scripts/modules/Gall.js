/*
 * Модуль сборщика галереи
 *
 */

var

    // Модуль галереи
    Gallery = require('../../blocks/main/b-gallery/scripts/Gallery.js'),

    /*
     * Свойства
     * 
     */
    
    // Префикс событий
    _modulePrefix = 'Gall',

    // Блоки с фоторепом по-умолчанию
    label = '.b-gall',

    /*
     * Инициализация галереи
     * Принимаем параметры инициализации
     * @param {
     *      optionId - ID опции
     *      galleryId - ID галереи
     * }
     *
     * @el - контейнер галереи (не обязательный) 
     *
     *
     */

    gallCreate = (param) => {

        var optionId = param.optionId,
            galleryId = param.galleryId,
            el = param.el;

        // Получаем изображения        
        $.ajax({
            type: 'GET',
            url: `//foto.rg.ru/project/photos/insert.php?option_id=${optionId}&photorep_id=${galleryId}&callback=?`,
            dataType: 'json',
            success: function(data) {

                // Инициализируем галерею
                new Gallery({
                    el: el,
                    data() {
                        return {
                            galleryId: galleryId,
                            optionId: optionId,
                            galleryToken: `gallery_${galleryId}_${optionId}`,
                            photos: data.photos,
                            meta: {
                                info: data.meta,
                                rootModule: _modulePrefix
                            }
                        }
                    }
                });

            }
        });

    },

    // Инициализация галереи
    // ищем все галереи и запускаем каждую
    gallInit = (topic, customGallLabel) => {

        //RG.logger.log(`${_modulePrefix} gallInit - запустилась, параметры ${customGallLabel}`);
    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    init = () => {

        RG.events.subscribe(`${_modulePrefix}.run`, gallCreate);
    };

// Экспортируем модуль
module.exports = {
    _modulePrefix,
    gallCreate,
    init
};