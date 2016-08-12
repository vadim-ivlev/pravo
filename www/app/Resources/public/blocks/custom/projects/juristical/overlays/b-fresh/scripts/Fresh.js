/*
 * Элемент свежего выпуска
 * выводится в оверлее
 */

var
    
    // Модуль склонения слов 
    WordSuffix = require('../../../../scripts/modules/WordSuffix'),

    // Форматирование даты
    _formatDate = (date) => {
        return moment(date, 'YYYYMMDD').format('DD.MM.YYYY');
    },

    // Форматирование даты для url тематического приложения
    _fascicleDate = (date) => {
        return moment(date, 'YYYYMMDD').format('YYYY/MM/DD');
    },

    // Получить дату за сегодня
    _getCurrentDate = () => {
        return moment().format('DD.MM.YYYY');
    },

    // Обновляем модальное окно
    /*resizeModal = () => {

        // Обновляем колорбокс
        $.colorbox.resize({
            innerWidth: $('#fresh .b-fresh').outerWidth(true),
            innerHeight: "80%"//$('#fresh .b-fresh').outerHeight(true)
        });

        // Если ширина больше планшета, добавляем overflow
        if ($(window).width() > 768) {
            $('#cboxLoadedContent').css('overflow', 'hidden');
        }

    },*/

    // Шаблон блока
    template = require('../b-fresh.ihtml'),

    // Блок
    Fresh = Ractive.extend({

        el: 'fresh',

        template,

        partials: { broadsides: null },

        /*decorators: {

            'fresh-date-picker': function(node) {

                var self = this;

                $(node).datepicker({
                    //dateFormat: 'dd.mm.yy',
                    dateFormat: 'yymmdd',
                    constrainInput: true,
                    showOn: 'button',
                    buttonText: 'Select...',
                    onSelect: function(date) {

                        var title_id = self.get('currentFascicle') + '/' + date;

                        // Выставляем выбранную дату (отформатировав)
                        self.set('currentDate', _formatDate(date));

                        // Подгружаем выбранный выпуск
                        // Публикуя запрос на загрузку выпуска
                        RG.events.publish('Fresh.getFascicle', title_id);

                    },
                    beforeShow: function(){
                        $('.ui-datepicker-trigger')
                            .addClass('is-active')
                            .addClass('animated')
                            .addClass('bounceIn');
                    },
                    onClose: function(){
                        $('.ui-datepicker-trigger')
                            .removeClass('is-active')
                            .removeClass('animated')
                            .removeClass('bounceIn');
                    }
                });

                return {
                    teardown() {
                        $(node).datepicker("destroy");
                    }
                };
            },

        },*/

        data: () => {
            return {

                // Список выпусков
                fascicles: [
                    {
                        name: "Российская газета",
                        url: "rg",
                        filter: "filterFirstBroadsides" // Все материалы первой полосы
                    },
                    {
                        name: "Российская газета - Неделя",
                        url: "subbota",
                        filter: "filterFirstSpiegelMaterial" // 5 шпигелей
                    },
                    {
                        name: "Союз. Беларусь-Россия",
                        url: "soyuz",
                        filter: "filterFirstBroadsides" // Все материалы первой полосы
                    },
                    {
                        name: "Тематические приложения",
                        url: "rg-spec",
                        //url: "rg-spec/20150602", // тестовый 
                        filter: "filterThematicIssues"
                    },
                    {
                        name: "Родина",
                        url: "rodina",
                        filter: "filterFirstMaterial" // 5 последних материалов
                    }
                ],

                // Отдельный выпуск
                fascicle: null,

                // Выбранный выпуск
                //currentFascicle: null,

                // Шаблон требует переменную, которую будет использовать
                // она нужна в select
                selectedIssue: null,

                // Дата выпукска
                //currentDate: 'Сегодня',
                currentDate: _getCurrentDate(),

                // Состояние, если выпуск пустой
                isFascicleEmpty: false,

                // Состояние загрузки
                isLoading: false,

                // Helpers
                // Форматирование даты
                formatDate: _formatDate,

                // Форматирование даты в шаблоне айтема
                dateFormat: RG.datetime.parseVmDate,

                // Форматирование даты для url тематического приложения
                fascicleDate: _fascicleDate,

                // Склонение слова
                materialsSuffix: function(num) {

                    // Обертка над модулем WordSuffix
                    return WordSuffix(num, {
                        root: 'стат',
                        suffix: ['ья', 'ьи', 'ей']
                    });

                }
            };
        },

        oninit() {

            var self = this;

            // Подписываемся на события
            RG.events.registerList({

                // Когда данные получены, обновляем их
                'Fresh.fascicleLoaded': self.updateFascicle.bind(self),

                'Fresh.clearFascicle': self.clearFascicle.bind(self),                

                // Статус загрузки и окончания загрузки
                'Fresh.loading.start': self.loadingStart.bind(self),
                'Fresh.loading.end': self.loadingEnd.bind(self)
            });

        },

        onrender() {

            // Слушатель события выбора выпуска
            this.on('selectTab', this.selectTab);

            // Проверяем изменение материалов
            // и инициализируем скролл
            this.observe('fascicle.fascicleList', function(newValue, oldValue, keypath) {

                var self = this;

                if (!!newValue) {

                    RG.events.publish('scroll.init', $('.b-fresh__news'));

                    /*setTimeout(function(){

                        var $root = $('.b-fresh__news');

                        $root.mCustomScrollbar({
                            autoHideScrollbar: true
                        });

                        self.set('fascicleListScroller', $root);

                    }, 500);*/

                }

            });

        },

        /*
         * Методы
         *
         */

        // Выбор выпуска
        selectTab: function(e, title_id) {

            // Публикуем запрос на выпуск
            RG.events.publish('Fresh.getFascicle', title_id);

            // Сохраняем выбранный id
            //this.set('currentFascicle', title_id);

            // По выбору выпуска, сбрасываем дату
            //this.set('currentDate', 'Сегодня');
        },

        // Обновление выпуска
        updateFascicle: function(topic, data) {

            var fascicles = data.fascicles,
                fascicleFirst = fascicles[0],

                //title_id = this.get('currentFascicle');
                title_id = fascicleFirst.title_id;
                //title_id = 'rg-spec/20150602';

            // Уничтожаем скроллер
/*            if (!!this.get('fascicleListScroller')) {
                this.get('fascicleListScroller').mCustomScrollbar('destroy');
            }*/

            // Тематические приложения
            // только у них за один день, много выпусков
            //if (title_id === 'rg-spec') {
            //if (title_id === 'rg-spec/20150602') {
            if (fascicleFirst.title_id === 'rg-spec') {

                // Устанавливаем выбранный выпуск
                //this.set('currentFascicle', 'rg-spec'); не нужен т.к. календарь убрали

                // Обновляем данные выпуска
                this.set('fascicle', {

                    // ID выпуска
                    title_id: 'rg-spec',

                    // Хеш для иконки
                    label: 'thematic',

                    // Ссылка на выпуск
                    fascicleLink: '/fascicles/',

                    // Список материалов выпуска
                    //fascicleList: this.getMaterialCtrl('rg-spec/20150602')(fascicles),
                    fascicleList: this.getMaterialCtrl('rg-spec')(fascicles),

                    // Номера выпуска нет
                    number: null,

                    // Количество материалов
                    active_materials: fascicles.length

                });

                // Указываем, что выпуск есть
                this.set('isFascicleEmpty', false);

            //} else if (title_id !== 'rg-spec/20150602' && fascicles.length > 0) { // Остальные выпуски (единственный элемент в массиве)
            } else if (fascicleFirst.title_id !== 'rg-spec' && fascicles.length > 0) { // Остальные выпуски (единственный элемент в массиве)

                //fascicle = fascicle[0];

                // Устанавливаем выбранный выпуск
                // this.set('currentFascicle', fascicle.title_id);

                // Применяем фильтр к материалам выпуска
                //fascicle.broadsides = this.filterFirstBroadsides(fascicle);
                //fascicle.broadsides = this.filterFirstMaterial(fascicle, 5);
                //fascicle.filteredMaterials = this.filterFirstSpiegelMaterial(fascicle, 5);

                // ХАК ДЛЯ ПРОВЕРКИ
                // я не знаю что тут придумать еще по быстрому
                if (title_id === 'rg-centr') {
                    title_id = 'rg';

                    fascicleFirst = fascicles[1];
                }

                // Обновляем данные выпуска
                this.set('fascicle', {

                    // ID выпуска
                    title_id: title_id,
                    //title_id: fascicleFirst.title_id,

                    // Хеш для иконки
                    label: title_id,
                    //label: fascicleFirst.title_id,

                    // Ссылка на выпуск
                    fascicleLink: `/gazeta/${title_id}/svezh.html`,
                    //fascicleLink: `/gazeta/${fascicleFirst.title_id}/svezh.html`,

                    // Список материалов выпуска
                    fascicleList: this.getMaterialCtrl(title_id)(fascicleFirst, 5),
                        //this.getMaterialCtrl(fascicleFirst.title_id)(fascicleFirst, 5)

                    // Номер выпуска
                    //number_current: fascicleFirst.number_current,
                    number: fascicleFirst.number,

                    // Дата выпуска
                    date: fascicleFirst.date,

                    // Количество материалов
                    active_materials: fascicleFirst.active_materials

                });

                // Указываем, что выпуск есть
                this.set('isFascicleEmpty', false);

                //console.log(this.get('fascicle'));

            } else {

                // Указываем, что выпуск пустой
                this.set('isFascicleEmpty', true);

                // Задаем данные пустого выпуска
                this.set({
                    'fascicle.filteredMaterials': null,
                    //'fascicle.number_current': null,
                    'fascicle.active_materials': null
                });

            }

        },

        // Очистка выпуска
        clearFascicle() {

            // Очищаем слушателя
            RG.events.clearSubscriptions('Fresh.fascicleLoaded');

            // Указываем, что выпуск пустой
            this.set('isFascicleEmpty', true);

            // Задаем данные пустого выпуска
            this.set({
                'fascicle.filteredMaterials': null,
                //'fascicle.number_current': null,
                'fascicle.active_materials': null
            });

        },

        // Начало загрузки
        loadingStart(topic) {
            this.set('isLoading', true);

            //$('.b-fresh__news .b-news__list').mCustomScrollbar('destroy');
        },

        // Конец загрузки
        loadingEnd(topic) {
            this.set('isLoading', false);

            // Обновляем модальное окно
            //resizeModal();
        },

        // Фильтры сортировки
        getMaterialCtrl(id) {

            var fascicles = this.get('fascicles'),
                callback;

            try {
                callback = this[_.where(fascicles, {url: id})[0].filter].bind(this);
            } catch (err) {
                throw new Error(`Не могу запустить алгоритм выдачи материалов, ошибка: ${err}`);
            }

            return callback;

        },

        // Обработка тематических выпусков
        filterThematicIssues(fascicles) {

            var self = this;

            // Проходим по всем выпускам и модифицируем их
            $.each(fascicles, function(index, fascicle) {

                // Если есть материалы в полосах
                if (!!fascicle.broadsides) {

                    //console.log('broadside.broadsides__objects ', self.filterFirstMaterial(fascicle, 5));

                    //console.log('fascicle.broadsides ', fascicle.broadsides);

                    fascicle.broadsides = self.filterFirstMaterial(fascicle, 5);

                }

            });

            //console.log(fascicles);

            return fascicles;

        },

        // первая полоса
        // получаем выпуск
        // вытаскиваем из низ первую, и отдаем
        filterFirstBroadsides(fascicle) {
            //return _.where(fascicle.broadsides, {broadside: "1"})[0].broadsides__objects;
            return _.where(fascicle.broadsides, {broadside: "1"})[0];
        },

        // N первых материалов
        // получаем выпуск и количество первых материалов
        filterFirstMaterial(fascicle, sizeMaterial) {

            //console.log('fascicle ', fascicle);

            var broadsides = fascicle.broadsides,
                sizeCurMaterials = 0,
                result = [];

            $.each(broadsides, function(index, broadside){

                var materials = broadside.broadsides__objects;

                $.each(materials, function(index, material){

                    // Помещаем материал в выдачу
                    result.push(material);

                    // Увеличиваем счетчик на 1
                    sizeCurMaterials += 1;

                    // Проверяем, надо ли еще дополнять массив
                    if (sizeCurMaterials >= sizeMaterial) {
                        return false;
                    }
                    
                });

                // Если массив все еще не заполнен - дозаполняем
                if (sizeCurMaterials >= sizeMaterial) {
                    return false;
                }

            });

            // Функция получения материала
            //getMaterial(list) {}

            return { broadsides__objects: result };
            //return result;

        },

        // N шпигельных материалов
        filterFirstSpiegelMaterial(fascicle, sizeMaterial) {

            var broadsides = fascicle.broadsides,
                sizeCurMaterials = 0,
                result = [];

            $.each(broadsides, function(index, broadside){

                var materials = broadside.broadsides__objects;

                $.each(materials, function(index, material){

                    // Помещаем материал в выдачу
                    // если это шпигель
                    if (!!material.spiegel) {

                        result.push(material);

                        // Увеличиваем счетчик на 1
                        sizeCurMaterials += 1;

                        // Проверяем, надо ли еще дополнять массив
                        if (sizeCurMaterials >= sizeMaterial) {
                            return false;
                        }

                    }
                    
                });

                // Если массив все еще не заполнен - дозаполняем
                if (sizeCurMaterials >= sizeMaterial) {
                    return false;
                }

            });

            return { broadsides__objects: result };
            //return result;

        }

    });

// Экспортируем
module.exports = Fresh;