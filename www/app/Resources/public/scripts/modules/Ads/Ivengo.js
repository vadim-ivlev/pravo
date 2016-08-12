/*
 * Загрузчик баннеров Ivengo
 * 
 */

var

    // Префикс модуля
    _modulePrefix = 'Ivengo',

    // Окружение
    _ENV = RG.config.env,

    libSrc = '//s.i-vengo.com/js/ivengo.min.js',

    // ID компании
    _placeId = {
        prod: '18s59u0l2mb',
        //dev: '00000000' 
        dev: '18s59u0l2mb'
    },

    // Инициализация библиотеки
    initLib = () => {

        // Грузим библиотеку
        $.getScript(libSrc)
            .done(function(){
                
                // Пускаем событие готовности
                RG.events.publish(`${_modulePrefix}.lib.loaded`);
            });        

    },

    setup = () => {

        var typeScreen = RG.ScreenViewer.getScreenInfo().type,
            iVengo = window.iVengo || null;

        // Если мы в телефоне
        if(typeScreen === 'mobile' && !!iVengo) {

            // Инициализация
            iVengo.init({
                appId: _placeId[_ENV],
                //appId: '18s59u0l2mb',
                logLevel: 'info'
            });
        
            // Для отображения не полноэкранного баннера
            // Несколько типов рекламы в одном запросе
            iVengo.fillSlot({
                adType: ['standart', 'cube', 'inline_video', 'slim_video'],
                width: '100%',
                mobileOnly: true
            }); 

            // Отображение полноэкранного баннера
            iVengo.showInterstitial({
                adType: 'fullscreen'
            });

        }

    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    // Запуск модуля
    run = () => {

        initLib();

        RG.events.subscribe(`${_modulePrefix}.lib.loaded`, setup);
    },

    // Глобальная инициализация
    init = () => {

        // Включаем по событию из Adfox
        RG.events.subscribe(`${_modulePrefix}.init`, run); 

        // Запуск, после удалим и будет запуск через Adfox
        //run();
    };

// Add to global scope
module.exports = {
    _modulePrefix,
    init
};