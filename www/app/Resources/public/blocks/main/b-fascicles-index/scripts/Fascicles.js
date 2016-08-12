/*
 * Блок списка Специальных выпусков
 *
 */

var

    // Форматирование даты
    _formatDate = (date) => {
        return moment(date, 'YYYYMMDD').format('DD.MM.YYYY');
    },

    _formatFileSize = (filesize) => {

        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'],
            i;

        if (filesize == 0) {
            return '0 Byte';
        }

        i = parseInt(Math.floor(Math.log(filesize) / Math.log(1024)));

        return Math.round(filesize / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },

    // Шаблон блока
    template = require('../fascicles-index.ihtml'),

    // Блок
    Block = Ractive.extend({

        magic: true,

        el: 'fascicles',
        template,
        data() {
            return {

                // Фильтры по типу
                types: [
                    {
                        "name": "Все",
                        "val": "common",
                        "check": false
                    },
                    {
                        "name": "Тематические",
                        "val": "tematic",
                        "check": true
                    },
                    {
                        "name": "Все регионы",
                        "val": "regional",
                        "check": false
                    },
                    {
                        "name": "Северо-Запад",
                        "val": "region-1",
                        "check": false
                    },
                    {
                        "name": "Центральная Россия",
                        "val": "region-2",
                        "check": false
                    },
                    {
                        "name": "Урал и Западная Сибирь",
                        "val": "region-3",
                        "check": false
                    },
                    {
                        "name": "Кубань и Северный Кавказ",
                        "val": "region-16",
                        "check": false
                    },
                    {
                        "name": "Башкортостан",
                        "val": "region-6",
                        "check": false
                    },
                    {
                        "name": "Пермский край",
                        "val": "region-7",
                        "check": false
                    },
                    {
                        "name": "Волга-Кама",
                        "val": "region-8",
                        "check": false
                    },
                    {
                        "name": "Восточная Сибирь",
                        "val": "region-9",
                        "check": false
                    },
                    {
                        "name": "Дальний Восток",
                        "val": "region-10",
                        "check": false
                    },
                    {
                        "name": "Приволжье",
                        "val": "region-11",
                        "check": false
                    },
                    {
                        "name": "Сибирь",
                        "val": "region-12",
                        "check": false
                    },
                    {
                        "name": "Средняя Волга",
                        "val": "region-13",
                        "check": false
                    },
                    {
                        "name": "Юг России",
                        "val": "region-14",
                        "check": false
                    },
                    {
                        "name": "Киргизия",
                        "val": "region-15",
                        "check": false
                    }
                ],

                // Фильтры по дате
                dates: null,

                // Список спецвыпусков
                list: null,

                // Состояние загрузки
                isLoading: false,

                // Флаг: пустая ли выдача
                // по умолчанию - пустая
                isFascicleEmpty: true,

                // Свойство с метаданными
                meta: {

                    // Переключатель типа запроса данных
                    // dates || types || chain
                    handler: null,

                    offsetId: null
                },

                // Параметры запроса
                urlParam: {
                    dates: 'all',
                    offset: 'latest',
                    //types: 'common' попросили грузить тематические по-умолчанию
                    types: 'tematic'
                },

                // Helpers
                // Форматирование даты
                formatDate: _formatDate,

                // Форматирование размера файла
                formatFileSize: _formatFileSize
            };
        },

        oninit() {

            var self = this;

            // Подписываемся на события
            RG.events.registerList({

                // Когда данные получены, обновляем их
                'Fascicles.fascicleLoaded': self.updateController.bind(self),

                'Fascicles.loading.start': self.loadingStart.bind(self),
                'Fascicles.loading.end': self.loadingEnd.bind(self),

                'fascicles.type.change': (topic, context) => {

                    self.setFilter(context.type, context.val, context.keypath);
                }
            });

        },

        onrender() {

            // Вешаем слушателей
            this.on({

                // Слушатель события фильтр года
                'setFilter': this.setFilter
            });

            // Запрашиваем первые данные
            this.getData();

        },

        /*
         * Методы
         *
         */

        // получаем данные
        getData() {

            // параметры
            //    {path}/
            //      year-{YYYY} - фильтр по году
            //      after-fascicle-{ID} || latest - если догружаем выпуски
            //      {type} || common - либо по типу, либо все сразу

            // Примеры
            // Список всех выпуксков - /latest/common.json
            // Список региональных - /latest/regional.json
            // Список за 2005 год всех выпусков - /year-2005/latest/common.json
            // Список догруженных выпусков за 2014 год - /year-2014/after-fascicle-29804/common.json

            // Собираем url запроса
            var

                param = [],

                // Даты
                dates = this.get('urlParam.dates'),

                // Порядок цепочки
                offset = this.get('urlParam.offset'),

                // Тип
                type = this.get('urlParam.types');

            // Даты
            if (!!dates) {
                if (dates !== 'all') {
                    dates = 'year-' + dates;

                    param.push(dates);
                }
            }

            // Порядок
            if (!!offset) {
                if (offset !== 'latest') {
                    offset = 'after-' + offset;
                }
                param.push(offset);
            }

            // Тип
            param.push(type);

            // Отправляем событие
            RG.events.publish('Fascicles.get', param.join('/'));
        },

        // Установить фильтр
        // type - либо date (дата), либо type (тип)
        // val - значение
        setFilter(type, val, keypath) {

            //var activeKeypath = this.get('meta.activeKeypath_' + type);

            //console.log('установить фильтр');

            // Снимаем активность
            //this.set(activeKeypath + '.check', false);

            //console.log('сняли активность ');

            this.uncheckAllFilters(this.get(type));

            // Выделяем выбранный фильтр
            this.set(keypath + '.check', true);


            //console.log('Выделяем выбранный фильтр ');

            // Обновляем активный элемент
            //this.set('meta.activeKeypath_' + type, keypath);

            //console.log('Обновляем активный элемент ');

            //console.log(this.get('meta.activeKeypath_' + type));

            // Сохраняем выбранный фильтр в хранилище
            //this.set('meta.active_' + type, keypath);

            // Устанавливаем активный фильтр
            this.set('urlParam.' + type, val);

            // Сбрасываем фильтр догрузки
            this.set('urlParam.offset', 'latest');

            // Если рубрику выбираем, то сбрасываем дату
            if (type === 'types') {
                this.set('urlParam.dates', 'all');
            }

            // Устанавливаем активное действие
            this.set('meta.handler', type);

            // Загружаем данные
            this.getData();
        },

        // Догрузить ленту
        addChain(offsetId) {

            // Устанавливаем активное действие
            this.set('meta.handler', 'offset');

            // Устанавливаем активный фильтр
            this.set('urlParam.offset', offsetId);

            // Загружаем данные
            this.getData();

            // останавливаем всплытие
            return false;

        },

        // Контроллер обновления
        updateController(topic, data) {

            var handler = this.get('meta.handler');

            if (handler === 'dates') {

                // Обновляем тип
                this.updateFascicle(data);


            } else if (handler === 'types') {

                // Обновляем дату
                this.updateDates(data);

                // Обновляем тип
                this.updateFascicle(data);


            } else if (handler === 'offset') {

                // Добавляем список
                this.addFascicle(data);

            } else {

                // Обновляем дату
                this.updateDates(data);

                // Обновляем тип
                this.updateFascicle(data);

            }

        },

        // Обновляем данные
        updateFascicle(data) {

            // Если ответ не пустой
            if (!!data.size) {

                // Понимаем, если мы не догружаем данные
                //if (!this.get('meta.active_offset')) {

                // Добавляем
                this.set('list', data.result);

                /*} else { // иначе аппендим в список

                    // Добавляем
                    this.set('list', [].concat(this.get('list'), data.result));
                }*/

                // Указываем, что выпуски есть
                this.set('isFascicleEmpty', false);

            } else {

                // Указываем, что выпусков нет
                this.set('isFascicleEmpty', true);

                // Добавляем
                this.set('list', null);
            }

            // Добавляем offset ID
            this.set('meta.offsetId', data.after);

        },

        // Добавляем данные
        // Контроль над догрузкой в функции addChain в шаблоне
        // Но id обновляем тут. Какой кошмар...
        addFascicle(data) {

            // Добавляем
            this.set('list', [].concat(this.get('list'), data.result));

            // Добавляем offset ID
            this.set('meta.offsetId', data.after);

        },

        updateDates(data) {

            // Устанавливаем года выпусков
            //this.initFiltersDate(data.years);

            var datesList = [],
                years = data.years;

            // Заполняем массив дат стандартным значением - все даты
            // по-умолчанию он активен
            datesList.push({
                    'name': 'Все',
                    'val': 'all',
                    'check': true
                });

            // Меняем сортировку полученных дат
            years.reverse();

            // Заполняем годами
            $.each(years, function(index, date){

                datesList.push({
                    name: date, // год как имя
                    val: date, // год как параметр для запроса
                    check: false // выключен
                });

            });

            // Сохраняем в данные
            this.set('dates', datesList);

        },

        // Начало загрузки
        loadingStart(topic) {

            this.set('isLoading', true);
        },

        // Конец загрузки
        loadingEnd(topic) {

            this.set('isLoading', false);
        },

        /*
         * Helpers
         *
         */

        uncheckAllFilters(root, item /* вместо объявления var */) {

            for (item in root) {

                if (root[item].check)
                    root[item].check = false;

            }

        }

        // Инициализация фильтров даты
        /*initFiltersDate(list) {

            var datesList = [];

            // Заполняем массив дат стандартным значением - все даты
            // по-умолчанию он активен
            datesList.push({
                    'name': 'Все',
                    'val': 'all',
                    'check': true
                });

            // Сохраняем в url параметры
            this.set('urlParam.dates', 'all');

            // Меняем сортировку полученных дат
            list.reverse();

            // Заполняем годами
            $.each(list, function(index, date){

                datesList.push({
                    name: date, // год как имя
                    val: date, // год как параметр для запроса
                    check: false // выключен
                });

            });

            // Сохраняем в данные
            this.set('dates', datesList);
        }*/

    });

// Экспортируем
module.exports = Block;



/*
     * Fascicles Class
     *
     */
/*
    var Fascicles = Ractive.extend({

        // Enable dirty-checking
        magic: true,

        onrender: function() {

            this.on('getMore', this.getMore);
            this.on('checkFilter', this.checkFilter);
            this.on('checkDate', this.checkDate);

            // Observe filter check
            this.observe('meta.active_filter', function(filter, old_filter, keypath){

                if (!filter)
                    return false;

                // Set offset as latest
                this.set('meta.active_offset', false);

                // Set type check
                this.set('meta.active_check_type', 'filter');

                // Load Data
                this.getData();

            });

            // Observe date check
            this.observe('meta.active_date', function(filter, old_filter, keypath){

                if (!filter)
                    return false;

                // Set offset as latest
                this.set('meta.active_offset', false);

                // Set type check
                this.set('meta.active_check_type', 'date');

                // Load Data
                this.getData();

            });

            // Observe more btn check
            this.observe('meta.active_offset', function(filter, old_filter, keypath){

                if (!filter)
                    return false;

                // Load Data
                this.getData();

            });

        },

        // Methods
        checkFilter: function(filter_type, type, keypath, has_sub) {
            // Function use observe!

            var self = this,
                parent = null,
                data_hash = null;

            // Uncheck all filters
            self.uncheckAllFilters(self.get('filters.' + filter_type));

            // Check active filter
            self.set(keypath + '.check', true);

            // Set hash for load content
            if (has_sub) {

                parent = self.getParentNodeKeypath(keypath);

                self.set(parent + '.check', true);
                self.set(parent + '.name_selected', self.get(keypath + '.name'));

                if (filter_type === 'type') {

                    if (type !== 'regional') {
                        // если отдельный регион
                        data_hash = self.get(parent + '.type') + '-' + type;

                    } else {
                        // если все регионы
                        data_hash = type;

                    }

                } else if (filter_type === 'date') {

                    if (type === 'all') {

                        data_hash = 'false';

                    } else {

                        data_hash = 'year-' + type;

                    }

                }

            } else {

                data_hash = type;

            }

            if (filter_type === 'type') {

                // Set active filter
                self.set('meta.active_filter', data_hash);

            } else if (filter_type === 'date') {

                // Set active filter
                self.set('meta.active_date', data_hash);

            }

            return false;

        },

        setDateFilter: function(dates) {

            var old_dates = this.get('filters.date[0].subtype'),
                dates_arr = [],
                dates_length = dates.length,
                iterator = 0;

            // Set default state (look in tmpl)
            this.set('filters.date[0].name_selected', false);
            old_dates[0].check = true;

            // Set active filter
            this.set('meta.active_date', 'false');

            dates_arr.push(old_dates[0]);

            // reverse dates
            dates.reverse();

            for (; iterator < dates_length; iterator++) {

                dates_arr.push({
                    name: dates[iterator],
                    type: dates[iterator],
                    check: false
                });

            }

            this.set('filters.date[0].subtype', dates_arr);

        },

        getMore: function(after) {
            // Function use observe!

            // Set offset
            this.set('meta.active_offset', 'after-' + after);

        },

        getUrl: function() {

            var url = [],
                path = this.get('meta.path_fascicles'),
                date = this.get('meta.active_date'),
                offset = this.get('meta.active_offset') || 'latest',
                filter = this.get('meta.active_filter'),
                ext = '.json';

            url.push(path);

            if (!!date && date !== 'false') url.push(this.get('meta.active_date'));

            url.push(offset);

            url.push(this.get('meta.active_filter') + ext);

            return url.join('/');

        },

        getData: function() {

            var self = this,
                active_check_type = self.get('meta.active_check_type'),
                url = self.getUrl();

            // Activate loading spinner
            self.set('processing', true);

            // Load content
            $.getJSON(url)
                .done(function(fascicles_data){

                    var after = null,
                        result = null;

                    // Check to load new data or append more data
                    if (!self.get('meta.active_offset')) {

                        fascicles.set('list', fascicles_data);

                        if (active_check_type !== 'date') self.setDateFilter(fascicles_data.years);

                    } else {

                        after = fascicles_data.after,
                        result = fascicles_data.result;

                        fascicles.set('list.after', after);

                        fascicles.set('list.result', [].concat(fascicles.get('list.result'), result));

                    }

                })
                .fail(function(data){
                    console.error('load json data error,\nurl: ' + url, data);
                })
                .always(function(){
                    // Deactivate loading spinner
                    self.set('processing', false);

                    //check first load result
                    self.set('meta.first_loaded', true);
                });

        },

        // instruments
        getParentNodeKeypath: function(keypath) {

            var path_array = keypath.split('.'),
                path_array_length = path_array.length,
                parent_node_keypath = path_array.join('.').split('.', (path_array_length - 2)).join('.');

            return parent_node_keypath;

        },

        uncheckAllFilters: function(root) {

            var self = this,
                filters = root,
                filter = null;

            for (filter in filters) {

                if (filters[filter].check) filters[filter].check = false;

                if (filters[filter].name_selected) filters[filter].name_selected = null;

                if (filters[filter].subtype) {

                    self.uncheckAllFilters(filters[filter].subtype);

                }

            }

        }

    });

    var fascicles = null,
        el_content = '#fascicles-index',
        tmpl_data = require('../fascicles-index.ihtml');

            fascicles = new Fascicles({
                el: el_content,
                template: tmpl_data
            });

            fascicles.set('meta', {
                path_filters: {
                    "type": [
                        {
                            "name": "Все",
                            "type": "common",
                            "check": true
                        },
                        {
                            "name": "Тематические",
                            "type": "tematic",
                            "check": false
                        },
                        {
                            "name": "Региональные",
                            "type": "region",
                            "check": false,
                            "subtype": [
                                {
                                    "name": "Все регионы",
                                    "type": "regional",
                                    "check": false
                                },
                                {
                                    "name": "Северо-Запад",
                                    "type": "1",
                                    "check": false
                                },
                                {
                                    "name": "Центральная Россия",
                                    "type": "2",
                                    "check": false
                                },
                                {
                                    "name": "Урал и Западная Сибирь",
                                    "type": "3",
                                    "check": false
                                },
                                {
                                    "name": "Кубань и Северный Кавказ",
                                    "type": "16",
                                    "check": false
                                },
                                {
                                    "name": "Башкортостан",
                                    "type": "6",
                                    "check": false
                                },
                                {
                                    "name": "Пермский край",
                                    "type": "7",
                                    "check": false
                                },
                                {
                                    "name": "Волга-Кама",
                                    "type": "8",
                                    "check": false
                                },
                                {
                                    "name": "Восточная Сибирь",
                                    "type": "9",
                                    "check": false
                                },
                                {
                                    "name": "Дальний Восток",
                                    "type": "10",
                                    "check": false
                                },
                                {
                                    "name": "Приволжье",
                                    "type": "11",
                                    "check": false
                                },
                                {
                                    "name": "Сибирь",
                                    "type": "12",
                                    "check": false
                                },
                                {
                                    "name": "Средняя Волга",
                                    "type": "13",
                                    "check": false
                                },
                                {
                                    "name": "Юг России",
                                    "type": "14",
                                    "check": false
                                },
                                {
                                    "name": "Киргизия",
                                    "type": "15",
                                    "check": false
                                }
                            ]
                        }
                    ],
                    "date" : [
                        {
                            "name": "Все",
                            "type": "date",
                            "check": true,
                            "subtype": [
                                {
                                    "name": "ВСЕ",
                                    "type": "all",
                                    "check": true
                                }
                            ]
                        }
                    ]
                },
                path_fascicles: '/json/fascicles',
                first_loaded: false
            });

            // GET FILTERS
            var filters_data = fascicles.get('meta.path_filters');

            fascicles.set('filters.type', filters_data.type)
                .then(function(){

                    // GET FASCICLES
                    fascicles.set('meta.active_filter',(function(){
                        // Function use observe!

                        var filters = filters_data.type;

                        for (var key in filters) {
                            if (filters[key].check)
                                return filters[key].type;
                        }

                    }()));

                })
                .then(function(){

                    fascicles.set('filters.date', filters_data.date);

                });*/