/*
 * Загрузчик Yandex Direct
 *
 */

var

    // Префикс модуля
    _modulePrefix = 'YaDirect',

    directPlaceId = '29789',

    libSrc = '//an.yandex.ru/system/context.js',

    // Классы контейнеров для баннеров
    adsElementsClasses = 'ya-direct-root',

    // Класс-модификатор загруженного баннера
    adsLoadedElementsClasses = 'ya-direct_loaded',

    // Инициализация библиотеки
    initLib = () => {

        // Грузим библиотеку
        $.getScript(libSrc);

    },

    // Получить STAT_ID
    getStatId = (param) => {

        var stat_store = null,
            screenInfo = require('../ScreenViewer').getScreenInfo(),
            screenInfoMap = {
                mobile: 1,
                tablet: 2,
                tabletLandscape: 3,
                desktop: 4,
                desktopFull: 5
            };

        /*
		 *  PlaceId (1-99) Разделитель (0) Пользовательское разрешение экрана (1-5) Разделитель (0) ID эксперимента (1-99)
			
			Пользовательское разрешение экрана:
			1 - Телефон
			2 - Планшет
			3 - Планшет(ландшат)
			4 - Монитор
			5 - Широкоформатный
			
			Например: 250501
			
			Максимальное возможное число 16 777 215 https://yandex.ru/support/partner/products-direct/variables-description.xml
		*
		*/

        stat_store = [
            param.placeAdsId.replace('ads', ''), // площадка #ads
            0, // разделитель
            screenInfoMap[screenInfo.type], // разрешение экрана
            0, // разделитель
            1 // ID эксперимента
        ];

        /*stat_store = [
            param.mobile,
            param.tablet,
            param.tabletLandscape,
            param.desktop,
            param.desktopFull
        ];*/

        //return `PlaceId0${stat_store.join('')}`;
        return `${stat_store.join('')}`;

    },

    // Запускаем баннер
    runBanners = ($place, banners) => {

        $.each(banners, function(index, banner) {

            var prop = banner.yadirect;

            // Если есть директ, запускаем
            if(!!prop) {

                prop = JSON.parse(prop);

                // Помещаем в площадку контейнер для директа
                var $direct = $('<div />'),
                    directElId = `yaDirect_${Math.random().toString(36).substring(7)}`;

                // Настраиваем контейнер
                $direct.attr({
                    'id': directElId,
                    'class': `ya-direct-${prop.type} ${adsElementsClasses} ${adsLoadedElementsClasses}`
                });

                // Вставляем баннер
                $place.append($direct);

                // Задаем пространство имен
                window.yandex_context_callbacks = window.yandex_context_callbacks || [];

                // Дополняем параметры
                // Stat_id
                prop.stat_id = getStatId({
                    placeAdsId: $place.attr('id'),
                    param: banner
                });

                // Инициализируем баннер
                window.yandex_context_callbacks.push(function() {
                    Ya.Direct.insertInto(directPlaceId, directElId, prop);
                });

            }

        });

        

        /*{
            stat_id: 1,
            ad_format: "direct",
            type: "posterHorizontal",
            limit: 2,
            favicon: true,

            font_size: .9,
            font_family: 'arial',
            border_type: 'block',
            header_bg_color: 'D7D7D7',
            border_color: 'D7D7D7',
            title_color: '990000',
            bg_color: 'ffffff',
            url_color: '006699',
            all_color: '000000',
            text_color: '000000',
            hover_color: '0066FF'
        }*/

    },

    // Готовим места
    setPlaces = (topic, places) => {

        for(let place in places) {

            let id = `#ads${place}`,
                $place = $(id);
            
            if($place.length) {

                // Инициализируем баннер
                // Передаем объект и параметры
                runBanners($place, places[place]);
            }
        };

        // Когда все баннеры установлены
        // инициализируем
        initLib();
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