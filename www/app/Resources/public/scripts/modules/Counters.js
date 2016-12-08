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
                _tmr.push({id: "2808226", type: "pageView", start: (new Date()).getTime()});

                // Инициализируем библиотеку
                $.getScript(protocol + '//top-fwz1.mail.ru/js/code.js');

                /*
                 * Настраиваем блок счетчика
                 *
                 */                

                $a = $('<a />', {
                    target: '_blank',
                    href: protocol + '//top.mail.ru/jump?from=2808226'
                });

                $img = $('<img />', {
                    //src: '//dd.c2.b0.a0.top.mail.ru/counter?id=11659;t=216;l=1',
                    src: protocol + '//top-fwz1.mail.ru/counter?id=2808226;t=409;l=1',
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

        // Яндекс метрика
        {
            name: 'yaMetrikaCounter',
            targetId: '#yaMetrika',

            init: (elementId) => {

                var $img = null,
                    counterId = RG.meta.getYaMetrikaId() || '39269930';

                RG.logger.log('Yandex Metrika id ' + RG.meta.getYaMetrikaId());

                // Настраиваем счетчик
                window.yandex_metrika_callbacks = window.yandex_metrika_callbacks || [];

                window.yandex_metrika_callbacks.push(function() { 
                    try {

                        window.yaCounter39269930 = new Ya.Metrika({
                            id:counterId,
                            clickmap:true,
                            trackLinks:true,
                            accurateTrackBounce:true,
                            webvisor:true,
                            trackHash:true
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