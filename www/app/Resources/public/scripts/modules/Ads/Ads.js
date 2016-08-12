/*
 * Модуль работы с рекламой
 * Инициализирует отдельные модули
 *
 *
 */

var

    places = [],
    //resolution = null, // Назначаем при первой инициализации

	// модуль работы с AdFox баннерами
	Adfox = require('./Adfox'),

    // Модуль работы с видео баннерами Teads
    Teads = require('./Teads'),

    // Модуль директа
    YaDirect = require('./YaDirect'),

    // Модуль Ivengo
    Ivengo = require('./Ivengo'),

    // Модуль Turboroller
    Turboroller = require('./Turboroller'),

    NativeRoll = require('./NativeRoll'),

	// Наклбас Ефима для Adfox баннеров
	init = () => {
		
        // Инициализация адфокса
        Adfox.init();

        // Что-то от Ефима
        getBanners();

        RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, (topic, screenInfo) => {

            //if(screenInfo.type !== resolution) { вынесли в модуль ScreenViewer

                //RG.logger.log(screenInfo);

            //resolution = screenInfo.type;
            filterResolution(places, screenInfo.type);
                
            //}
        });
	},

	getBanners = () => {

        var platform = RG.meta.getPlatform() || '/static/main/ind';

        //$.get(`${RG.config.paths.root}ads/platform${platform}`).then(data => {
        $.get(`https://front.rg.ru/ads/platform${platform}`).then(data => {

            places = data;

            filterResolution(places, RG.ScreenViewer.getScreenInfo().type);

            // start-- Добавил Леха, надо понять, как мы это уберем          
            RG.events.publish('Adfox.platform.loaded', data);
            // end-- Добавил Леха, надо понять, как мы это уберем

        });
    },

    filterResolution = (data, resolution) => {

        var filteredPlaces = {};

        _.forEach(data, (place, index) => {

            filteredPlaces[index] = _.filter(place, banner => {

                return parseInt(banner[resolution]);
            });
        });

        // Передаем в адфокс площадки
        RG.events.publish('Adfox.places.set', filteredPlaces);

        // Передаем в турбороллер площадки
        RG.events.publish('Turboroller.places.set', filteredPlaces);

        // Передаем в директ площадки
        RG.events.publish('YaDirect.places.set', filteredPlaces);

        // Передаем в партнерки площадки
        //RG.events.publish('Partners.places.set', filteredPlaces);
    };

module.exports = {

    // Перфиксы
    Adfox_modulePrefix: Adfox._modulePrefix,
    Teads_modulePrefix: Teads._modulePrefix,
    YaDirect_modulePrefix: YaDirect._modulePrefix,
    Ivengo_modulePrefix: Ivengo._modulePrefix,
	Turboroller_modulePrefix: Turboroller._modulePrefix,

    // Модули
    Adfox,
    Teads,
    YaDirect,
    Ivengo,
    Turboroller,
    NativeRoll,

	init
};