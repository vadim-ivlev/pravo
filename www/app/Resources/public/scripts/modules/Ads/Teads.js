/*
 * Загрузчик баннеров Teads
 * 
 */

var

    // Префикс модуля
    _modulePrefix = 'Teads',

    _ENV = RG.config.env,

    _placeId = {
        mobile: {
            inread: {
                prod: 25863,
                dev: 25863//48562
            }
        },
        desktop: {
            inread: {
                prod: 19301,
                dev: 19301//48561
            },
            inboard: {
                prod: 25888,
                dev: 25888//48717
            }
        }
    },

    // Классы контейнеров для баннеров
    adsElementsClasses = 'teads',

    libSrc = '//cdn.teads.tv/media/format.js',

    // Баннеры
    banners = {

        mobile: [

            // Inread Mobile
            /*{
                pid          : _placeId.mobile.inread[_ENV]
                ,lang        : 'ru'
                ,slot        : '.b-material-wrapper article > p'
                ,format      : 'inread'
                ,minSlot     : 1
                ,components  : { skip: {delay : 0}}
                ,mutable     : true
                ,css         : "margin: 0px 0px 20px;"
            },  */         

            {
               pid          : _placeId.mobile.inread[_ENV]
               ,lang        : "ru"
               ,slot        : '[itemprop="articleBody"] > p'
               ,format      : "inread"
               ,components  : { skip: {delay : 0}}
               ,mutable     : true
               ,css         : "margin: 0px 0px 20px;"
            }

        ],

        desktop: [

            // Inboard
            /*{
               pid          : _placeId.desktop.inboard[_ENV]
               ,lang        : 'ru'
               //,slot        : '.b-header_article'
               ,slot        : '#rgb_header__menu #menu .b-menu'
               ,format      : 'inboard'
               ,className   : `${adsElementsClasses} teads_inboard`
               ,mobile      : false
               ,minSlot     : 1
               ,components  : { skip: {delay : 0}}
               ,mutable     : true
               ,css         : "padding: 10px 0px;"
            },*/           

            {
                   pid          : _placeId.desktop.inboard[_ENV]
                   ,lang        : "en"
                   ,slot        : '.l-page__wrapper #rgb_header_article #rgb_header__content'
                   ,format      : "inboard"
                   ,mobile      : false
                   ,minSlot     : 3
                   ,components  : { skip: {delay : 0}}
                   ,mutable     : true
                   ,css         : "margin: 15px 0px 0px;"
            },

            // Inread Desktop
            {
                pid         : _placeId.desktop.inread[_ENV]
                ,lang       : 'ru'
                ,slot       : '.b-material-wrapper article > p'
                ,format     : 'inread'
                ,className  : `${adsElementsClasses} teads_inread`
                ,mobile      : false
                ,minSlot     : 1
                ,components  : { skip: {delay : 0}}
                ,mutable     : true
                ,css         : "margin: 0px 0px 20px;"
            }

        ]
    },

    // Устанавливаем баннеры
    setup = () => {

        // Задаем пространство имен
        window._ttf = window._ttf || [];

        // Помещаем баннеры в хранилище Teads
        $.each(banners, function(index, bannersGroup){

            $.each(bannersGroup, function(index, banner){
                _ttf.push(banner);
            });
        });

    },

    // Инициализация библиотеки
    initLib = () => {

        // Грузим библиотеку
        $.getScript(libSrc);
    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    init = () => {

        // Устанавливаем баннеры
        setup();

        // Инициализируем библиотеку
        initLib();
    };

// Add to global scope
module.exports = {
    _modulePrefix,
    init
};