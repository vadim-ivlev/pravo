/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

/**
 * Подключения конфигурационного модуля
 */
RG.config = RG.config || require('../config');

/**
 * Подключения модуля работабщего с meta данными
 */
RG.meta = RG.meta || require('../modules/Meta');

/**
 * Устанавливаем окружение
 */
RG.config.env = RG.meta.getEnv();
Ractive.DEBUG = (RG.meta.getEnv() === 'dev');

RG.config.paths.root = (RG.config.env === 'dev') ? 'https://front-dev.rg.ru/app_dev.php/' : 'https://front.rg.ru/';

/**
 * Подключения модуля логирования
 * Если RG.config.env 'dev' || 'test' тогда всё логируется в консоль
 */
RG.logger = RG.logger || require('../modules/Logger');

/**
 * Подключения модуля обробатывающего события
 * https://github.com/mroderick/PubSubJS
 */
RG.events = RG.events || require('../modules/Events');

/**
 * Подключения модуля работабщего с cookie
 * https://github.com/ScottHamper/Cookies
 */
RG.session = RG.session || require('../modules/Session');

/**
 * Подключения модуля работабщего строкой поиска
 */
RG.query = RG.query || require('../modules/Query');

/**
 * Подключения модуля работабщего с cookie
 * https://github.com/ScottHamper/Cookies
 */
RG.storage = RG.storage || require('../modules/Storage');

/**
 * Подключения модуля работабщего со временем
 */
RG.datetime = RG.datetime || require('../modules/DateTime');

/**
 * Подключения модуля работабщего с выделением текста
 */
RG.selection = RG.selection || require('../modules/Selection');

/**
 * Подключения модуля работабщего с DOM
 */
RG.parser = RG.parser || require('../modules/Parser');

/**
 * Подключение модуля определения типа экрана
 */
RG.ScreenViewer = RG.ScreenViewer || require('../modules/ScreenViewer');

/**
 * Подключение модуля Gподписок
 */
RG.Subscribe = RG.Subscribe || require('../modules/Services/Subscribe');

/**
 * Подключение модуля сохранённых статей
 */
RG.Saved = RG.Saved || require('../modules/Services/Saved');

/**
 * Подключение модуля просмотренных статей
 */
RG.Viewed = RG.Viewed || require('../modules/Services/Viewed');

/**
 * Подключение модуля геопределения
 */
RG.Geolocation = RG.Geolocation || require('../modules/Services/Geolocation');

/**
 * Подключение сервиса рекламных площадок
 */
RG.Place = RG.Place || require('../modules/Services/Place');

/**
 * Подключение модуля аналитики
 */
RG.Analytics = RG.Analytics || require('../modules/Analytics/Analytics');

/**
 * Подключение модуля счетчиков
 */
RG.Counters = RG.Counters || require('../modules/Counters');

/**
 * Подключение модуля рекламы
 */
RG.Ads = RG.Ads || require('../modules/Ads/Ads');

/**
 * Подключение модуля партнеров
 */
RG.Partners = RG.Partners || require('../modules/Partners/Partners');

/**
 * Подключение модуля перестановки блоков
 */
RG.BlocksShifter = RG.BlocksShifter || require('../modules/BlocksShifter');

/**
 * Подключение модуля открытия/скрытия контента
 */
RG.ContentToggler = RG.ContentToggler || require('../modules/ContentToggler');

/**
 * Подключения модуля выбора контента по кнопке
 */
RG.ContentHandler = RG.ContentHandler || require('../modules/ContentHandler');

/**
 * Подключение блока перезагрузки контента
 */
RG.LiveReload = RG.LiveReload || require('../modules/LiveReload');

/**
 * Подключение блока перезагрузки контента
 */
RG.RegionalNews = RG.RegionalNews || require('../modules/Services/RegionalNews');

/**
 * Подключение модуля конвертации списка в выпадающее меню
 */
RG.ListHeadToSelect = RG.ListHeadToSelect || require('../modules/ListHeadToSelect');

/**
 * Подключение модуля верхнего меню
 */
RG.Menu = RG.Menu || require('../../blocks/header/b-menu/scripts/main');

/**
 * Подключение модуля авторизации
 */
RG.Auth = RG.Auth || require('../../blocks/overlays/b-auth/scripts/main');

/**
 * Формы РГ
 */
RG.forms = RG.forms || {};