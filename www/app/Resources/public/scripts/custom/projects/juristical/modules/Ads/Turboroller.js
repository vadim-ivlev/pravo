/*
 * Загрузчик баннеров Ivengo
 * 
 */

var

    // Префикс модуля
    _modulePrefix = 'Turboroller',

    // Окружение
    _ENV = RG.config.env,

    // Класс блоков для поиска
    _bannersClass = '.turboroller', 

    // ID компании
    _placeId = {
        prod: '9429',
        dev: '9429'
    },

    // Инициализируем баннер
    initBanner = (placeId) => {

        var $place = $(`#ads${placeId}`),
            $dummy = $('<div />'),
            elId = null,
            prefixId = 'turbo',
            postfixId = 'roller' + Math.random().toString(36).substring(7),
            urlReq = null;

        if (!!$place.length) {

            // Составляем id
            elId = prefixId + postfixId;

            // Составляем url запроса
            urlReq = `//engine.turboroller.ru/Route?place=rg.ru-${_placeId[_ENV]}&ctx=${escape(document.title)}&r=${Math.floor(Math.random() * 99999999999)}&r2=${postfixId}&ct1=${document.defaultCharset}&ct2=${document.characterSet}`; 

            // Настраиваем
            $dummy
                .addClass('b-ads__tgb')
                .attr('id', elId);

            $place.append($dummy);

            loadBanner(urlReq);

        }

    },

    // Инициализация библиотеки
    loadBanner = (url) => {

        // Грузим библиотеку
        $.getScript(url)
            .done(function(){
                
                // Пускаем событие готовности
                RG.events.publish(`${_modulePrefix}.loaded`);
            });        

    },

    // Ищем код turboroller
    setPlaces = (topic, places) => {

        // Проходим по всем площадкам
        $.each(places, function(placeId, place) {

            // Проходим по баннерам в площадке
            $.each(place, function(index, el) {

                var turboroller = el.turboroller || null;

                if (turboroller) {

                    initBanner(placeId);
                }

            });

        });
    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    init = () => {

        RG.events.subscribe(`${_modulePrefix}.places.set`, setPlaces);
    };

// Add to global scope
module.exports = {
    _modulePrefix,
    init
};