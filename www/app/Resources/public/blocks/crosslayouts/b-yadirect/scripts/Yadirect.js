/*
 * Компонент директа
 *
 * Свойства компонента
 *

 items = [
    // объекты по разрешениям
    {
        // Разрешение на котором показываем
        resolution: { desktop: true },
        
        // Блоки директа, которые показываем в ротации
        blocks: [
            id: ID блока,
            rate: ПРИОРИТЕТ РОТАЦИИ,
            yaDirect: ОБЪЕКТ НАСТРОЕКТ ДИРЕКТА
        ]
    }
 ]
 
 *
 */

var 

    // Выбрать по приоритету   
    // @list Array - список элементов
    // @rateMap Array - карта весов  
    _getRandomItem = (list, rateMap) => {

        var randomNum = null,
            weightSum = 0,

            rateList = rateMap.list,
            iterator = 0,
            listLength = list.length;

        // Получаем случайное число в пределах
        // наших баннеров
        randomNum = rand(0, rateMap.fullRate);
         
        // Алгоритм
        for (; iterator < listLength; iterator++) {

            weightSum += rateList[iterator];

            // Преобразуем в число
            weightSum = +weightSum;
             
            if (randomNum <= weightSum) {
                return list[iterator];
            }

        }
         
        // Выдать рандомное число от и до
        function rand(min, max) {
            return Math.random() * (max - min) + min;
        };
    },
    
    // Получить STAT_ID
    _getStatId = (param) => {

        var statId = null,
            screenInfoMap = {
                mobile: 1,
                tablet: 2,
                tabletLandscape: 3,
                desktop: 4,
                desktopFull: 5
            };

        /*
         *  ID Проекта (10-99) (Основной сайт - 10) ID места (10-99) ID Эксперимента (1-9)  Разрешение экрана (1-5)
            
            Пользовательское разрешение экрана:
            1 - Телефон
            2 - Планшет
            3 - Планшет(ландшат)
            4 - Монитор
            5 - Широкоформатный
            
            Например: 11 5 2 15
            
            Максимальное возможное число 16 777 215 https://yandex.ru/support/partner/products-direct/variables-description.xml
        *
        */

        statId = [
            param.project, // ID Проекта берем из шаблона компонента
            param.place, // площадка, берем из шаблона компонента
            param.id, // ID эксперимента, берем из шаблона компонента
            screenInfoMap[param.screenInfo.type], // разрешение экрана
        ];

        return statId.join('');

    },

    //template = `{{#items}}<div id="{{containerId}}" class="ya-direct-root ya-direct-{{yaDirect.type}}"></div>{{/items}}`, // подкючение шаблона
    template = `<div id="{{banner.containerId}}" class="ya-direct-root ya-direct-{{banner.yaDirect.type}}"></div>`, // подкючение шаблона

    // Компонент
    Yadirect = Ractive.extend({

        template,

        data() {
            return {
                project: null, // получаем из тега
                place: null, // получаем из тега
                items: null, // получаем из тега

                screenInfo: null
            }
        },

        oninit() {
            RG.logger.debug('Yadirect component init');
        },

        onrender() {

            var self = this;

            // Получаем информацию о экране
            RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.check`, (topic) => {

                self.set('screenInfo', RG.ScreenViewer.getScreenInfo());

                // Инициализируем директ
                self.initDirect();

                // Если информация обновилась
                RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, (topic, screenInfo) => {

                    self.set('screenInfo', RG.ScreenViewer.getScreenInfo());

                    // Инициализируем директ
                    self.initDirect();
                });

            });
        },

        /*
         * Методы
         *
         */

        // Инициализация компонента баннера
        initDirect() {

            var self = this,
                items = this.get('items'),
                directPlaceId = '29789',
                screenInfo = self.get('screenInfo'),
                resolution = null, // разрешение, при котором показываем

                banner = null, // Выбранный баннер
                containerId = null, // ID контейнера
                prop = null; // Свойства идут в директ

            // Фильтруем элементы по подходящему разрешению
            $.each(items, function(index, item){

                var resolution = item.resolution,
                    blocks = null;

                // Если в карте разрешений, текущее разрешение совпадает, то выводим
                if (!!resolution[screenInfo.type]) {

                    // Находим баннеры
                    blocks = item.blocks;

                    // Выбираем баннер
                    banner = _getRandomItem(blocks, self.getRateMap(blocks));

                    // Свойства идут в директ
                    prop = banner.yaDirect;

                    // ID контенера, куда инициализируем директ (совпадает с тем, что в шаблоне)
                    containerId = `${prop.ad_format}_${prop.type}_${banner.id}_${Math.random().toString(36).substring(7)}`;

                    // Устанавливаем свойства для шаблона
                    self.set('banner.containerId', containerId);
                    self.set('banner.yaDirect', prop);

                    // Задаем пространство имен
                    window.yandex_context_callbacks = window.yandex_context_callbacks || [];

                    // Дополняем параметры непонятно, что с этим делаем
                    // Stat_id
                    prop.stat_id = _getStatId({
                        project: self.get('project'),
                        screenInfo: screenInfo,
                        id: banner.id,
                        place: self.get('place'),
                    });

                    RG.logger.log(prop);

                    // Инициализируем баннер
                    window.yandex_context_callbacks.push(function() {
                        Ya.Direct.insertInto(directPlaceId, containerId, prop);
                    });

                    // Инициализируем библиотеку
                    self.loadLib();

                } else {

                    $('#' + self.get('banner.containerId')).empty();
                }

            });

        },

        // Загрузка библиотеки
        loadLib() {

            var libSrc = '//an.yandex.ru/system/context.js';

            // Грузим библиотеку
            $.getScript(libSrc);

        },

        // Получаем сумму всех весов
        // которая будет границей диапазона
        getRateMap(blocks) {

            var map = {};

            // Заполняем карту весов
            map.fullRate = 0;
            map.list = [];

            // Получаем сумму
            $.each(blocks, function(index, banner) {

                var rate = banner.rate;

                map.list.push(rate);
                map.fullRate += rate;
            });

            return map;
        },

    });

// Экспортируем компонент
module.exports = Yadirect;