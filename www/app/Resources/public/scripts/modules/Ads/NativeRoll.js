/*
 * Загрузчик баннеров Teads
 * 
 */

var

    // Префикс модуля
    _modulePrefix = 'NativeRoll',

    _ENV = RG.config.env,

    // Устанавливаем баннеры
    setup = () => {

        var 
            //target = document.getElementsByClassName('b-material-wrapper')[0],
            target = $('.b-material-wrapper > article')[0],
            param = {
                onError: function (e) { console.log(e); }
            };

        // Заполняем параметрами
        param.gid = '5715fa7b64225d0e308b456e';

        // Если на тестовом, то включаем отладку
        if (_ENV === 'dev') {
            param.debug = true;
        }

        // Инициализируем плеер
        SeedrPlayer(target, 20, param);

    },

    // Инициализация библиотеки
    initLib = () => {

        // Грузим библиотеку
        (function (a, b, c, d, e, f, g, h) {

         g = b.createElement(c);
         g.src = d;
         g.type = "application/javascript";
         g.async = !0;
         h = b.getElementsByTagName(c)[0];
         h.parentNode.insertBefore(g, h);
         a[f] = [];
         a[e] = function () {
                a[f].push(Array.prototype.slice.apply(arguments));
            }

        })(window, document, "script", (document.location.protocol === "https:" ? "https:" : "http:") + "//cdn01.nativeroll.tv/js/seedr-player.min.js", "SeedrPlayer", "seedrInit");

    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    init = () => {

        // Инициализируем библиотеку
        initLib();

        // Устанавливаем баннеры
        setup();
    };

// Add to global scope
module.exports = {
    _modulePrefix,
    init
};