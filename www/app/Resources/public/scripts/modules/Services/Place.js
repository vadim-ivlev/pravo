/*
 * Модуль получения данных площадок
 * На момент получения данных, отдает событие с этими данными
 *
 */

var 

    // Префикс модуля
    _modulePrefix = 'Place',

    _placeMap = {},

    // Получение площадок
    getPlaces = () => {

        var rootPath = RG.config.paths.root,
            platform = RG.meta.getPlatform() || '/static/main/ind';

        // Отправляем запрос
        $.get(`${rootPath}ads/platform${platform}`)
            .done(data => {
                RG.logger.info(`${_modulePrefix}.places.loaded`);
                RG.events.publish(`${_modulePrefix}.places.loaded`, data);
            })
            .fail(error => {
                throw new Error(`Ошибка при получении площадок. Сервис Place, error: ${error}`);                 
            });

    },

    // ОБработка площадок
    // Сохраняем в конечный объект
    // - placeSrc - все площадки
    // - placeFiltered = отфильтрованные по экрану
    preparePlace = (topic, places) => {

        // Сохраняем все площадки
        _placeMap.placeSrc = places;

        // Отфильтрованные по экрану
        _placeMap.placeFiltered = places;

    },

    // Инициализация сервиса
    init = (topic, screenInfo) => {

        //getPlaces();

        RG.events.subscribe(`${_modulePrefix}.places.loaded`, preparePlace);
    };

module.exports = {
    _modulePrefix,
    init
};