/*
 * Модуль контроля над колонками в ленте новостей
 * Обрабатывает и подгрузку материалов
 *
 */

var

    // Информация о экране
    screenInfo = null,

    // Корневой элемент потока
    $root = null,

    // Хранилище элементов
    StoreEl = [],

    // Переменная показывающая, можно ли еще что-то догрузить
    loadElementsIsEmpty = false,

    /*
     * Методы
     *
     */

    // Устанавливаем разрешение экрана
    setScreenInfo = (_screenInfo) => {

        return screenInfo = _screenInfo;
    },

    // Устанавливаем корневой контейнер
    setRootEl = (_$root) => {

        return $root = _$root || $('.b-news_last .b-news_last__part');
    },

    // Переводим строку с материалами в DOM дерево элементов
    htmlToDOM = (html) => {

        return $('<div/>').html(html);
    },

    // Обработка элементов, для записи в хранилище
    storageCtrl = (_$el) => {

        //var $el = _$el || $root.children(),
        var $el = null,
            elArray = null;

        // RG.logger.log('----before----');
        // RG.logger.log(_$el);
        // RG.logger.log(StoreEl);
        // RG.logger.log('----------');

        if (!_$el && !!StoreEl.length) {

            storeEl(StoreEl);

        } else {

            $el = _$el || $root.children();

            elArray = prepareForStoreEl($el);

            if (!!elArray) {
                storeEl(elArray);
            }

        }

        // RG.logger.log('---after----');
        // RG.logger.log(_$el);
        // RG.logger.log(StoreEl);
        // RG.logger.log('----------');

    },

    // Подготавливаем элементы для записи в хранилище
    prepareForStoreEl = ($el) => {

        var elArray = null;

        elArray = $el.toArray();

        return elArray;
    },

    // Записываем в хранилище массив элементов
    storeEl = (elArray) => {

        // RG.logger.log('--- start store -----');
        // RG.logger.log(StoreEl);
        // RG.logger.log(elArray);
        // RG.logger.log('---- end store ----');

        StoreEl = StoreEl.concat(elArray);

        return StoreEl;
    },

    // Удаляем тег picture
    destroyPicture = ($root, pattern) => {

        var $target = null,
            $items = null;

        // Находим первую колонку
        $target = $root.find('.b__col').eq(0);

        // Находим элементы
        $items = $target.find('.b-news__list-item');

        // Проходим 
        $items.each(function(i, el) {

            var $el = $(el),
                $pic = null,
                picSrc = null;

            $.each(pattern, function(i, item) {

                if (($el.index() % item) == 0) {

                    RG.logger.log($el.find('.b-link_title').text());

                    $pic = $el.find('picture');

                    picSrc = $pic.find('source').attr('srcset');

                    $pic.after(`<img src="${picSrc}" class="b-news__list-item-image">`);

                    $pic.remove();

                }

            });

            /*for (var z = 0; z <= pattern.length; z++) {

                if (elem.index() == pattern[z]) {

                    pic = elem.find('picture');

                    picSrc = pic.find('source').attr('srcset');

                    pic.after('<img src="'+picSrc+'" class="b-news__list-item-image">');

                    pic.remove();

                }
            }*/
        });

        return $root;

    },

    // Формируем колонки с материалами
    setCol = (ratio) => {

        var
            // обертка для элементов
            $wrapper = $('<div/>'),

            // Параметры плагина для колонок
            colmakerParam = {};

        // Настраиваем параметры разбиения на колонки
        if (ratio === '1:1') {
            colmakerParam.size = 1;
        } else {
            colmakerParam.type = 'userRatio';
            colmakerParam.ratio = ratio;
        }

        // В виртуальный объект помещаем колонки
        $wrapper
            .append(StoreEl)
            .colmaker(colmakerParam);

        // Помещаем в DOM
        $root
            .empty()
            .append($wrapper);

        // Вызываем обработку изображений,
        // если больше чем одна колонка
        if (ratio !== '1:1') {
            destroyPicture($root, [3]);
        }

    },

    // Контроллер потока
    flowCtrl = () => {

        var 

            // тип экрана
            type = screenInfo && (screenInfo.type || 'mobile'),

            colMap = {
                mobile: '1:1',
                tablet: '1:1',
                tabletLandscape: '3:5',
                desktop: '3:5',
                desktopFull: '3:5',
            };

        // Разбиваем на колонки в зависимотсти от типа экрана
        setCol(colMap[type]);
    },
    
    // Иниицализация модуля
    init = (param) => {

        // Определяем корневой элемент
        setRootEl((param && param.$root));

        // Определяем разрешение экрана
        setScreenInfo(RG.ScreenViewer ? RG.ScreenViewer.getScreenInfo() : null);

        // Если определили успешно,
        // Запукскаем контроллер
        if (screenInfo) {

            // Запускаем контроллер данных
            storageCtrl();

            // Запускаем контроль
            flowCtrl();

            // Подписываемся на изменение типа экрана
            RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, (topic, screenInfo) => {

                setScreenInfo(screenInfo);

                flowCtrl();
            });

            // Подгрузка данных по скроллу
            $(window).on('scroll.loadCtrl', function() {

                var 
                    $window = $(window),
                    $document = $(document),

                    dummyHeight = 200,
                    scrollTop = null,
                    windowHeight = null,
                    documentHeight = null;

                scrollTop = $window.scrollTop();
                windowHeight = $window.height();
                documentHeight = $document.height();

                // Если дошли до конца страницы
                if((scrollTop + windowHeight) >= (documentHeight - dummyHeight) && !isLoading) {

                    // Запускаем контроллер загрузки 
                    loadCtrl();

                    // Если больше нечего грузить,
                    // выключаем скрипт
                    if (loadElementsIsEmpty) {
                        $(window).off('scroll.loadCtrl');
                    }
                }

            });

        }

    };


/*
 * Модуль подгрузки новостей
 *
 */

var

    // Переменная указывает, идет ли загрузка данных
    isLoading = false,

    // Количество загружаемых материалов
    numMaterials = 24,

    // Количество на которое будем сдвигать материалы
    offsetMaterials = 24,
    
    /*
     * Методы
     *
     */

    // Контроллер статуса загрузки
    loadingCtrl = (status) => {

        var isLoadingClass = 'is-loading';

        isLoading = status;

        // Добавляем класс контейнера
        // если идет загрузка
        if (status) {
            $root.addClass(isLoadingClass);
        } else {
            $root.removeClass(isLoadingClass);
        }

        return isLoading;
    },

    // Увеличиваем счетчик подгрзуки
    increaseOffset = () => {

        offsetMaterials += numMaterials;

        return offsetMaterials;
    },

    // Контроллер загрузки
    loadCtrl = (param) => {

        //var url = prepareUrl(param.requestParam);
        var url = prepareUrl();

        // Говорим, что загрузка началась
        loadingCtrl(true);

        $.when(sendRequest(url))
            .done(function(data){

                var $el = htmlToDOM(data).children();

                // Отправляем данные в сторедж
                storageCtrl($el);

                // Обновляем список материалов
                flowCtrl();

                // Увеличиваем счетчик подгрузки
                increaseOffset();

                // Закончилась загрузка
                // Немножечко оттормаживаем
                //setTimeout(function(){
                    loadingCtrl(false);
                //}, 2000);

                // Если элементов нет, останавливаем подгрузку
                if (!$el.length) {
                    loadElementsIsEmpty = true;
                }

            })
            .fail(function(error){ RG.logger.info(`Не могу загрузить шаблон ${error}`); });
    },

    // Подготавливаем url
    prepareUrl = (param) => {

        var 
            include = `/include/tmpl-project-football-b-news/has-x-large-image/has-announce/project-football2016/num-${numMaterials}/`,
            offset = `offset-${offsetMaterials}/`,
            url = null;

        // Составляем запрос
        url = `${include}${offset}`;

        return url;

    },

    // Отправка запроса
    sendRequest = (param) => {

        var
            // Объект отложенных событий
            $def = $.Deferred();

        // Данные
        // если строка с url, то грузит url,
        // но если объект, то там целые настройки
        $.ajax(param)
            .done(function(data){
                $def.resolve(data);
            })
            .fail(function(jqXHR){
                $def.reject(`Ошибка запроса: ${jqXHR.statusText}`);
            });         

        return $def;
    };


module.exports = {
    init
};