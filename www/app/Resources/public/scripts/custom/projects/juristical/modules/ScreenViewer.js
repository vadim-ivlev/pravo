/*
 * Screen Viewer
 * Модуль проверки экрана браузера
 *
 * @ScreenViewer.ready
 * @ScreenViewer.check - события подписки на вызов функции определения типа экрана
 * 
 */

var 
    /*
     * Свойства
     * 
     */
    
    // Префикс событий
    _modulePrefix = 'ScreenViewer',

    // Настройки для работы с экраном
    _screenSettings = {

        // Карта соответствия разрешения и типа девайса
        // Она соответствует медиазапросам в sass
        map: {
            tablet: 768,
            //tabletLandscape: 1024,
            tabletLandscape: 990,
            //desktop: 1366,
            desktop: 1260,
            //desktopFull: 1700
            desktopFull: 1760
        } 
    },

    // Хранилище полученной информации
    // о типе экрана
    _screenInfo = null,

    /*
     * Методы
     * 
     */

    // Определяем тип разрешения экрана
    detectScreenSizeType = () => {

        var screenWidth = getScreenSize(),
            screenMap = _screenSettings.map,

            // Объект с собранной информацией, потом пойдет в публикацию события
            screenInfo = {
                type: null,
                screenWidth: null,

                // Информация о экране, полученная ранее
                infoBefore: null
            };

        try {

            // Устанавливаем ширину экрана
            if (!!screenWidth) {
                screenInfo.screenWidth = screenWidth;
            } else {
                throw new Error('Ширина экрана не получена, значение выводится, как: ' + screenWidth)
            }

            // Сама проверка
            if (screenWidth < screenMap.tablet) {
                
                // Телефон
                screenInfo.type = 'mobile';

            } else if (screenWidth >= screenMap.tablet && screenWidth < screenMap.tabletLandscape) {

                // Планшет
                screenInfo.type = 'tablet';

            } else if (screenWidth >= screenMap.tabletLandscape && screenWidth < screenMap.desktop) {

                // Планшет: Ландшафтная ориентация
                screenInfo.type = 'tabletLandscape';

            } else if (screenWidth >= screenMap.desktop && screenWidth < screenMap.desktopFull) {

                // Десктоп
                screenInfo.type = 'desktop';

            } else if (screenWidth >= screenMap.desktopFull) {

                // Десктоп: Фулскрин
                screenInfo.type = 'desktopFull';

            }

            //if(!_screenInfo || _screenInfo.type !== screenInfo.type) {

                // Записываем предыдущую информацию о экране
                screenInfo.infoBefore = getScreenInfo();

                // Сохраняем определенную ширину в хранилище
                return screenInfo;

/*                // Публикуем событие о определении ширины окна браузера
                RG.events.publish(_modulePrefix + '.update', _screenInfo);

                RG.logger.trace(_screenInfo);*/
            //}

        } catch (err) {
            RG.logger.error('Модуль ' + _modulePrefix + ', функция detectScreenSizeType.\nОшибка: ' + err);
        }

    },

    checkScreenInfo = (topic) => {

        RG.logger.info(topic);

        var screenInfo = detectScreenSizeType();

        if(!_screenInfo || _screenInfo.type !== screenInfo.type) {

                // Записываем предыдущую информацию о экране
                screenInfo.infoBefore = getScreenInfo();

                // Сохраняем определенную ширину в хранилище
                _screenInfo = screenInfo;

                // Публикуем событие о определении ширины окна браузера
                RG.events.publish(_modulePrefix + '.update', _screenInfo);

                RG.logger.trace(_screenInfo);
        }
    },

    // Получаем разрешение экрана
    // jQuery отдает ширину без ширины скроллбара.
    // Чтобы было соответствие с медиазапросами
    // используем функцию innerWidth
    // Для старых браузеров, используем jQuery (IE8)
    getScreenSize = () => {
        return window.innerWidth || $(window).width();
    },

    // Получить информацию о экране
    getScreenInfo = () => {

        return _screenInfo;
    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    init = () => {

        let registerList = {};

        _screenInfo = detectScreenSizeType();

        registerList[_modulePrefix + '.ready'] = checkScreenInfo;
        registerList[_modulePrefix + '.check'] = checkScreenInfo;
        registerList['window.resize'] = checkScreenInfo;

        RG.events.registerList(registerList);
    };

// Экспортируем как модуль
module.exports = {
    _modulePrefix,
    getScreenInfo,
    init
};