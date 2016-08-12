/* ------------------------------------------ Новые доработки ------------------------------------------- */

/*
 * Универсальный загрузчик loadarray
 *
 */

var LoadChain = function(param) {

    // Стандартные свойства модуля
    this._param = {
        chainName: this.generateChainName(), // Генерируем уникальное имя подгрузки
        tmplName: 'b-news-inner', // Имя шаблона
        tmplURL: '/res/templates/b-news-inner.html', // Шаблон для данных 
        fullOffset: 0, // счетчик для подгрузки

        elMap: {
            root: '#bNewsInnerChain', // Корневой элемент
            list: '.b-news-inner__list', // Блок списка новостей
            fireBtn: '.js-add-chain-btn' // Кнопка подгрузки
        }
    };

    // Свойства модуля
    this.param = null;

    // Параметры модуля
    this.requestParam = null;

    // Карта элементов
    this.$elMap = null;    

    // Запускаем инициализацию
    return this.init(param);
};

// Сокращаем обращение к прототипу
LoadChain.fn = LoadChain.prototype;

/*
 * AJAX и данные
 *
 */

LoadChain.fn.load = function(param) {

    // Массив промисов
    // Это или только данные с шаблоном (вариант loadarray)
    // или данные (json) и шаблон (html)
    var $def = $.Deferred();

    // Данные
    // если страка с url, то грузит url,
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

// Получаем шаблон данных для Ractive
LoadChain.fn.getChainTmpl = function() {

    var self = this,
        tmplURL = this.param.tmplURL;

    // Скрываем элемент кнопки, загрузить еще
    // Ведь пока работать ничего не будет еще
    self.hideEl(self.$elMap.$fireBtn);

    // Получаем шаблон
    $.when(self.load(tmplURL))
        .done(setView)
        .fail(function(error){ RG.logger.info(`Не могу загрузить шаблон ${error}`); });

    // Инициализация шаблона при получении
    function setView(tmpl) {

        // Создаем view (Ractive блок)
        self.view = new Ractive({

                el: setViewContainer(
                        self.$elMap.$list,
                        'append',
                        self.param.chainName.split('.')[1]
                    ),

                template: `{{#list}}${tmpl}{{/list}}`,

                data() {
                    return {
                        list: [],
                        dateFormat: RG.datetime.parseVmDate
                    };
                }

            });

        // Показываем кнопку
        self.showEl(self.$elMap.$fireBtn);

    }

    // Создать контейнер для Ractive элемента
    // @ $el - элемент в или после которого,
    // помещаем контейнер
    // возвращаем id получившегося контейнера
    function setViewContainer($el, destType, chainName) {

        var $container = null,
            containerId = `${chainName}_container`;

        $container = $('<div/>', {
            "id": containerId
        });

        $el[destType]($container);

        return `${containerId}`;
    };

    return this;
};


/*
 * Проверки
 *
 */

// Проверяем, показывать ли кнопку подгрузить еще
LoadChain.fn.checkFireBtn = function(sizeEl) {

    var noCheckSizeProp = this.param.checkSizeProp,
        sizeFull = this.requestParam.size,
        sizeEl = sizeEl || this.requestParam.num;

    // Если включен параметр, что проверять не надо,
    // то пропускаем эту проверку
    if (!noCheckSizeProp) {

        // Если есть параметр общего количества материалов
        // если нет, просто работаем дальше :)
        if (!!sizeFull) {

            // если всего материалов меньше, или столько же,
            // сколько уже на странице
            // то ничего не грузим, и убираем кнопку
            RG.logger.log(`${sizeFull} <= ${sizeEl}`);

            if (+sizeFull <= +sizeEl) {

                // Если нет - скрываем элемент кнопку загрузить еще
                this.hideEl(this.$elMap.$fireBtn);

                return false;

            } else {

                // Если материалов больше, чем мы хотим загрузить, то грузим
                return true;
            }

        }

    }

    return true;
};

/*
 * Получение данных или генерация
 *
 */

// Генерируем уникальное имя цепочки
LoadChain.fn.generateChainName = function() {
    return `chain.${Math.random().toString(36).substring(7)}`;
};

// Определяем ТИП загружаемых данных
LoadChain.fn.getHandlerType = function() {

    var handlerType = null;

    // Если есть параметр инклюда, а
    // инклюды у нас только через JSON
    // значит грузим через Ractive
    // Либо обычная вставка HTML
    if (!this.requestParam.include) {

        handlerType = 'html';

    } else {

        handlerType = 'json';
    }

    return this.param.handlerType = handlerType;
};

// Получаем корректный url для запроса
LoadChain.fn.getUrl = function() {

    var num = this.requestParam.num,
        fullOffset = this.fullOffset,
        uri = this.requestParam.uri,
        tmplName = this.param.tmplName,

        excludes = null, // если есть материалы для исключения

        url = null;

    // Если на конце нет слеша
    if (!/\/$/.test(uri)) {
        this.requestParam.uri += '/';
    }

    // Получаем материалы для исключения, если они есть
    excludes = this.prepareExcludes() || '';

    // Если JSON получаем, то это один вариант запроса
    // если HTML, то другой
    if (this.param.handlerType !== 'json') {

        url = `/${this.requestParam.uri}kind-article/${excludes}json/${tmplName}/${num}/${fullOffset}.json`
        //url = `/${this.requestParam.uri}kind-article/json/${tmplName}/${num}/${fullOffset}.json`

    } else {

        let include = `/${this.requestParam.include}/` || '/';

        url = `/include/tmpl-${tmplName}/offset-${fullOffset}${include}num-${num}/index.json`;

    }

    return url;
};

/*
 * Работы с элементами
 *
 */

// Скрываем элемент
LoadChain.fn.hideEl = function($el) {

    $el.addClass('has-hidden');

    return $el;
};

// Показываем элемент
LoadChain.fn.showEl = function($el) {

    $el.removeClass('has-hidden');

    return $el;
};

// Загрузка
LoadChain.fn.loading = function(status, $el) {

    if(status) {

        $el.addClass('has-loading');

    } else {

        $el.removeClass('has-loading');
    }

    return $el;
};

/*
 * Установка данных
 *
 */

// Устанавливаем параметры модуля
LoadChain.fn.setChainParam = function(param) {

    // Расширяем свойства
    this.param = $.extend(true, {}, this._param, param);

    return this;
};

// Получить карту с элементами jQuery
// передаем ему контроллен лейблов элементов и возвращаем контроллер элементов
LoadChain.fn.setElementsMap = function() {

    var elMap = this.param.elMap,

        $root = null,
        $list = null,
        $fireBtn = null;

    // Получаем корневой элемент
    $root = $(elMap.root);

    // Получаем остальные элементы
    $list = $root.find(elMap.list);
    $fireBtn = $root.find(elMap.fireBtn);

    // Если все элементы найдены, работаем дальше
    if (!!$root.length && !!$list.length && !!$fireBtn.length) {

        this.$elMap = {
            $root: $root,
            $list: $list,
            $fireBtn: $fireBtn
        };

    }

    return this;
};

// Вешаем на элемент дату
// о имени цепочки
// чтобы можно было к нему обратиться
LoadChain.fn.setNameToChain = function() {

    // Устанавливаем имя
    this.$elMap.$root.data('LoadChainName', this.param.chainName);

    return this;
};

LoadChain.fn.removeNameToChain = function() {

    // Удаляем имя
    this.$elMap.$root.data('LoadChainName', null);

    return this;
};

// Выставляем счетчик offset
LoadChain.fn.setOffsetFull = function() {

    var fullOffset = +this.fullOffset,
        offset = +this.requestParam.offset,
        num = +this.requestParam.num;

    // Если глобальный коунтер еще ни разу не итерировался,
    // то подставляем offset из данных, для первой инициализации
    if(!fullOffset) {

        // Если не передан параметр offset,
        // то он равен количеству подгрузки
        if (!offset) {

            fullOffset = num;

        } else {

            fullOffset = offset;

        }

    } else {

        // Это условие говорит, что мы уже не первый раз подгружаем
        fullOffset += num;
    }

    // Записываем в глобальный счетчик
    return this.fullOffset = fullOffset;
};

// Получаем информацию, для формирования запроса
// Из карты элементов
LoadChain.fn.getRequestParam = function() {

    var param = {},
        re = new RegExp('data-request');

    $.each(this.$elMap.$root[0].attributes, (i, attr) => {

        var attrName = attr.name,
            attrVal = attr.value;

        if (re.test(attrName)) {
            param[attrName.split('-')[2]] = attrVal;
        }

    });

    this.requestParam = param;

    return this;
};

// Обработка материалов для исключения
LoadChain.fn.prepareExcludes = function() {

    var excludes = this.requestParam.excludes || null;

    if (!!excludes) {

        // Если данные есть, то разбиваем на массив
        excludes = excludes.split(',');

        $.each(excludes, function(i, el){

            excludes[i] = 'exclude-' + el;

        });

        excludes = excludes.join('/') + '/';

        RG.logger.log(excludes);

    }

    return excludes;

};

/*
 * Обработка данных для вывода
 *
 */

// Обработка данных, если получаем plain HTML
LoadChain.fn.setDataHtml = function(data) {

    var result = data.result;

    // Если результат полон
    if (!!result.length) {

        // Добавляем данные в список элементов
        this.$elMap.$list.append(result);
    }

    return this;
};

// Обработка данных, если получаем JSON
LoadChain.fn.setDataJson = function(data) {

    var list = this.view.get('list');

    // Добавляем данные в список элементов
    this.view.set('list', [].concat(list, data));

    return this;
};

/*
 * Основной контроллер цепочки
 *
 */

// Контроллер загрузки
LoadChain.fn.chainCtrl = function() {

    var self = this,
        $root = this.$elMap.$root,
        $fireBtn = this.$elMap.$fireBtn;

    // Определяем offset
    self.setOffsetFull();

    // Включаем состояние загрузки
    self.loading(true, $root);

    // Отправляем запрос
    // По окончании запроса,
    // вставляем полученные данные
    $.when(self.load(self.getUrl()))

        // Успешный ответ
        .done(function(data) {

            // Если полученные данные не JSON (не нуждаются в View)
            // то просто добавляем в DOM
            if (self.param.handlerType !== 'json') {

                if (!!data) {
                    self.setDataHtml(data);
                }

            } else {

                // Если данные для View
                // проверяем, есть ли наш View
                // и вставляем данные
                if (!!self.view) {
                    self.setDataJson(data);

                    // Если данных нет - скрываем кнопку
                    if (!data.length) {
                        self.hideEl($fireBtn);
                    }
                }

            }

        })
        
        // Скрываем элемент кнопки, загрузить еще
        .fail(function(error) { self.hideEl($fireBtn); })
        
        // При любом ответе
        .always(function(){ 
            
            // Устанавливаем статус загрузки, на завершено
            self.loading(false, $root);

            // Проверяем, может кнопку пора скрыть
            self.checkFireBtn(self.fullOffset);

        });

    return this;
};

/*
 * События
 *
 */

// Инициатор события по клику
LoadChain.fn.setFireClick = function() {

    var self = this;

    // Вызов функции
    self.$elMap.$fireBtn.on('click', function(e) {

        e.preventDefault();

        // Вызываем действие
        RG.events.publish(self.param.chainName + '.fire');
    });

    return this;
};

// Инициализация приватных функций подписчиков
LoadChain.fn.privateFireInit = function() {

    var self = this;

    // Подписываемся на соытие перегрузки методов 
    RG.events.subscribe(self.param.chainName + '.override', $.proxy(self.overrideFn, self));

    return this;

};

/*
 * Вспомогательные функции
 *
 */

// Перегрузка стандартной функции
// Как работает
// Поулчаем имя цепочки - $(ЭЛЕМЕНТ ЦЕПОЧКИ).data('LoadChainName')
// Передаем в publish объект с именем перегружаемой функции - name
// и с самой функцией
// { name: 'METHOD NAME', func: FUNCTION }

LoadChain.fn.overrideFn = function(topic, param) {

    var nameFunc = param.name,
        userFunc = param.func;

    // Если данные корректные
    // переназначаем
    if (!!nameFunc && $.isFunction(userFunc)) {
        this[nameFunc] = userFunc;
    }

    return this;

};

/*
 * Инициализация
 *
 */

// Инициализация
LoadChain.fn.init = function(param) {

    var self = this;

    // 1.Устанавливаем свойства модуля
    self.setChainParam(param);

    // 2. Получаем карту элементов
    self.setElementsMap();

    // Если элементы для работы есть,
    if (!!self.$elMap) {

        // 3. Собираем параметры, для дальнейшей работы
        self.getRequestParam(); 

        // 4. Сохраняем на root элементе имя цепочки
        self.setNameToChain();
        
        // если количество материалов (data-size) меньше показанных уже,
        // то скрываем кнопку подгрузить еще и завершаем работу скрипта
        if (self.checkFireBtn()) {

            // 5. Определяем тип обработки данных (JSON или HTML)
            // и если тип - JSON, то грузим шаблон и скрываем кнопку подгрузить еще
            // он появится, как только шаблон будет загружен
            if(self.getHandlerType() === 'json') {

                // Получаем шаблон
                self.getChainTmpl();
            }

            // Вешаем обработчики
            self.setFireClick();

            // Подписываемся на клик
            RG.events.subscribe(self.param.chainName + '.fire', $.proxy(self.chainCtrl, self));
            
        }

        // Инициализируем приватные события
        self.privateFireInit();
    
    } else {

        // Если нет - скрываем элемент кнопку загрузить еще
        RG.logger.log('Не найдены элементы для обработки подгрузки');
    }

    return this;
};

module.exports = LoadChain;