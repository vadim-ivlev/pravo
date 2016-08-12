/*
 * Модуль работы с партнерами
 * Инициализирует отдельные модули
 *
 *
 */

var
    // Глобальные пути
    globalPath = require('../../config').paths,

    _getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Места
    places = null,

    // Шаблон
    partnersTmpl = null,

    // Данные партнерок
    partnersData = null,

    // Получение шаблона партнеров
    getTmpl = () => {

        $.get(globalPath.tmpl.bPartners)
            .done(function(tmpl) {

                // Публикуем, что данные получены
                RG.events.publish('Partners.tmpl.bPartners.loaded', tmpl);
            })
            .fail(function(data) {
                RG.logger.error(`Модуль Partners. Не могу получить шаблон`);
            });
        
    },

    // Получение данных партнеров
    // название файла от 1 до 10, генерим рандомом
    getData = () => {

        var filename = `${_getRandomInt(1, 10)}.json`;

        $.ajax({
                url: `https://front.rg.ru/${globalPath.partners}${filename}`,
                dataType: 'jsonp',
                jsonp: 'callback',
                jsonpCallback: 'callbackPartners',
            })
            .done(function(data) {

                // Публикуем, что данные получены
                RG.events.publish('Partners.data.loaded', data);
            })
            .fail(function(data) {
                RG.logger.error(`Модуль Partners. Не могу получить данные`);
            });
        
    },

    createModule = (param) => {

        var $root = null,
            partnersId = null,
            $partners = $('<div />'),
            data = partnersData[param.moduleName];

        if(data.posts__length) {

            // Получаем родительский контейнер
            $root = $(`#ads${param.placeId}`);

            // Генерируем ID
            partnersId = `${param.moduleName}_${param.moduleMod}_${Math.random().toString(36).substring(7)}`;
            
            // Добавляем аттрибуты
            $partners.attr({
                'id': partnersId,
                'class': `b-partners__body`
            });

            // Добавляем элемент
            $root.append($partners);

            // Инициализируем модуль
            new Ractive({
                el: partnersId,
                template: partnersTmpl,
                data() {
                    return data;
                }
            });

            // Отправляем счетчик СМИ2
            if (param.moduleMod === 'smi2') {

                window.ttsmi2_data = { siteid: 37846, count: 'site' };

                $.getScript('//target.smi2.net/client/target.js');

            }

        }

    },

    // Инициализация блоков по площадкам
    initPlaces = (places) => {

        // Проходим по всем площадкам
        $.each(places, function(placeId, place){

            // Проходим по баннерам в площадке
            $.each(place, function(index, el){

                var moduleHash = el.partner,
                    moduleName = null,
                    moduleMod = null,
                    dataURL = null;

                if (!!moduleHash) {

                    moduleHash = moduleHash.split(':');

                    //moduleHash = moduleHash[1].split(':');
                    moduleName = moduleHash[0].split('#');

                    dataURL = moduleHash[1];

                    // Устанавливаем модификатор
                    if (moduleName.length < 2) {
                        moduleMod = moduleName[0];
                    } else {
                        moduleMod = moduleName[1]
                    }

                    // Запускаем модуль
                    run({
                        moduleName: moduleName[0],
                        moduleMod: moduleMod,
                        dataURL: dataURL,
                        placeId: placeId
                    });

                }

            });

        });

    },

    // Инициализируем подключенные модули
    // Можно передать массив
    // Можно один элемент
    run = (param) => {

        // Запускаем модуль
        // и сохраняем его
        createModule(param);

    },

    // Инициализируем модуль
    // Получаем путевой лист площадок
    init = (_places) => {

        //init_BETA();

        places = _places;

        // Получаем шаблон
        getTmpl();

        // Когда получили шаблон
        RG.events.subscribe('Partners.tmpl.bPartners.loaded', function(topic, _tmpl){
            
            partnersTmpl = _tmpl;

            getData();
        });

        // Когда получили данные
        RG.events.subscribe('Partners.data.loaded', function(topic, _data){

            partnersData = _data;

            initPlaces(places);
        });

    },

    // Улучшенный
    init_BETA = () => {

        RG.logger.log('~~~~~ УТИ ПУТИ ~~~~~~~~~');
        RG.logger.log(RG.Place._modulePrefix);

        RG.events.subscribe(`${RG.Place._modulePrefix}.places.loaded`, (topic, _places) => {

            RG.logger.log(_places);

            //places = _places;

            // Получаем шаблон
            //getTmpl();

            // Когда получили шаблон
            /*RG.events.subscribe('Partners.tmpl.bPartners.loaded', function(topic, _tmpl){
                
                partnersTmpl = _tmpl;

                getData();
            });*/

            // Когда получили данные
            /*RG.events.subscribe('Partners.data.loaded', function(topic, _data){

                partnersData = _data;

                initPlaces(places);
            });*/

        });

    };

module.exports = {
    init
};