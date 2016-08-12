/*
 * Модуль инициализации счетчиков
 *
 */

var
    /*
     * Свойства
     *
     */

    // Префикс событий
    _modulePrefix = 'Counters',

    // Протокол
    protocol = 'https:',

    // Массив счетчиков
    counters = [

        // Рамблер 100
        {
            name: 'top100RamblerCounter',
            targetId: '#top100counter',

            init: (elementId) => {

                // Настраиваем счетчик
                window._top100q = window._top100q || [];

                _top100q.push(["setAccount", "250928"]);
                _top100q.push(["trackPageviewByLogo", $(elementId)[0]]);

                // Инициализируем библиотеку
                $.getScript(protocol + '//st.top100.ru/top100/top100.js');

                RG.logger.info('top100counter init');

            }
        },

        // Мейл.ру
        {
            name: 'mailruCounter',
            targetId: '#mailruCounter',

            init: (elementId) => {

                var

                    _tmr = null, // Объект таймера

                    $a = null, // ссылка на картинке счетчика
                    $img = null; // Картинка счетчика
                    //$pixel = null; // Картинка промерочного пикселя

                // Настраиваем счетчик
                //window._tmr = window._tmr || [];
                _tmr = window._tmr || (window._tmr = []);

                // Отправляем счетчик просмотра страницы
                _tmr.push({id: "11659", type: "pageView", start: (new Date()).getTime()});

                // Инициализируем библиотеку
                $.getScript(protocol + '//top-fwz1.mail.ru/js/code.js');

                /*
                 * Настраиваем блок счетчика
                 *
                 */

                $a = $('<a />', {
                    target: '_blank',
                    href: protocol + '//top.mail.ru/jump?from=11659'
                });

                $img = $('<img />', {
                    //src: '//dd.c2.b0.a0.top.mail.ru/counter?id=11659;t=216;l=1',
                    src: protocol + '//top-fwz1.mail.ru/counter?id=11659;t=409;l=1',
                    alt: 'Рейтинг@Mail.ru',
                    width: '88px',
                    height: '31px',
                    border: '0'
                });

                // Добавляем картинку счетчика в элемент
                $(elementId).append($a.append($img));

                /*
                 * Настраиваем промерочный пиксель
                 * 11.03.16 Max: Надо удалить этот пиксель, так как он должен быть прописан inline в шаблоне <noscripts>, в противном случае получается задвоение показателей.
                 */

                /*$pixel = $('<img />', {
                    src: '//top-fwz1.mail.ru/counter?id=11659;js=na',
                    alt: 'Рейтинг@Mail.ru',
                    width: '1',
                    height: '1',
                    border: '0'
                }).css({
                    'position': 'absolute',
                    'left': '-10000px'
                });*/

                // Добавляем пиксель в элемент
                //$(elementId).append($pixel);

                RG.logger.info('mailruCounter init');

            }
        },

        // LiveInternet
        {
            name: 'LiveInternetCounter',
            targetId: '#liveInternetCounter',

            init: (elementId) => {

                // Собираем счетчик
                var $a = null,
                    $img = null,
                     src = null,
                     customHit = RG.meta.getCustomLiveinternet();

                /*
                 * Настраиваем блок счетчика
                 *
                 */

                $a = $('<a />',{
                    href: protocol + '//www.liveinternet.ru/click',
                    target: '_blank'
                });

                src = protocol + '//counter.yadro.ru/hit?t14.11;r' + escape(document.referrer) + ((typeof(screen) == 'undefined') ? '' : ';s' + screen.width + '*' + screen.height + '*' + (screen.colorDepth ? screen.colorDepth:screen.pixelDepth)) + ';u' + escape(document.URL) + ';h' + escape(document.title.substring(0, 80)) + ';' + Math.random();

                $img = $('<img />', {
                    src: src,
                    title: 'LiveInternet: показано число просмотров за 24 часа,\nпосетителей за 24 часа и за сегодня',
                    alt: 'LiveInternet',
                    border: '0',
                    width: '88px',
                    height: '31px'
                });

                // Вставляем в контейнер
                $(elementId).append($a.append($img));

                RG.logger.info('liveInternetCounter init');

                // Настраиваем дополнительный hit
                if (!!customHit) {

                    // Обрабатываем доп hit
                    // Удаляем лишние пробелы
                    customHit = customHit.trim();

                    // hit может быть разделен пробелом
                    // разбиваем на массив
                    $.each(customHit.split(' '), function(i, hit) {

                        // Проверка, если вдруг попадется пустой hit
                        if (!!hit) {

                            new Image().src = protocol + "//counter.yadro.ru/hit;" + hit + "?r"+ escape(document.referrer)+((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+";"+Math.random();

                            RG.logger.info('liveInternetCounter with custom Hit init: ' + hit);

                        }

                    });

                }

            }
        },

        // tnsCounter
        {
            name: 'tnsCounter',
            targetId: '#tnsCounter',

            init: (elementId) => {

                var $img = null,
                    src = null;

                // Настраиваем блок счетчика
                src = protocol + '//www.tns-counter.ru/V13a***R>' + document.referrer.replace(/\*/g,'%2a') + '*rg_ru/ru/UTF-8/tmsec=rg_total/';

                $img = $('<img />', {
                    src: src,
                    border: '0',
                    width: '1px',
                    height: '1px'
                }).css({
                    'position': 'absolute',
                    'left': '-10000px'
                });;

                // Вставляем в контейнер
                $(elementId).append($img);

                RG.logger.info('tnsCounter init');

            }
        },

        // Яндекс метрика
        {
            name: 'yaMetrikaCounter',
            targetId: '#yaMetrika',

            init: (elementId) => {

                var $img = null,
                    counterId = RG.meta.getYaMetrikaId() || '22322746';

                RG.logger.log('Yandex Metrika id ' + RG.meta.getYaMetrikaId());

                // Настраиваем счетчик
                window.yandex_metrika_callbacks = window.yandex_metrika_callbacks || [];

                window.yandex_metrika_callbacks.push(function() {
                    try {

                        window.yaCounter22322746 = new Ya.Metrika({
                            id:counterId,
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true
                        });

                    } catch(e) {
                        RG.logger.error(e + '. Yandex Metrika error');
                    }
                });

                // Загружаем библиотеку
                $.getScript(protocol + '//mc.yandex.ru/metrika/watch.js');


                // Настраиваем блок счетчика
                /*$img = $('<img />', {
                    src: '//mc.yandex.ru/watch/' + counterId,
                    border: '0',
                    width: '1px',
                    height: '1px'
                }).css({
                    'position': 'absolute',
                    'left': '-10000px'
                });*/

                // Вставляем в контейнер
                //$(elementId).append($img);

                RG.logger.info('yaMetrika init');

            }
        },

    ],

    // Инициализация счетчиков
    initCounters = () => {

        // Инициализируем все счетчики
        $.each(counters, function(index, counter){

            counter.init(counter.targetId);

        });

    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    init = () => {
        RG.events.subscribe(`${_modulePrefix}.run`, initCounters);
    };

// Экспортируем модуль
module.exports = {
    init
}