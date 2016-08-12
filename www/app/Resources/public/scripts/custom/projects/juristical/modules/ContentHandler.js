/*
 * Модуль раскрывающихся блоков по клику на элемент
 *
 * Передаем элементы,
 * кликая на которые,
 * изменяем связанные с ними блоки.
 *
 * Изменение осуществляется css
 *
 * Когда активно - класс is-active
 * По инициализации нужно передать дефолтный активный элемент
 *
 */

function Module(root, options) {

    var $root = $(root),
        _options = null,
        defaults = {
            labelList: '.b-content-handler__btn',
            contentList: '.b-content-handler__ctx',
            active: 'is-active',
            attrFind: 'data-content-handler'
        };

    this.options = _options = $.extend({}, defaults, options);            

    // Родительский контейнер
    this.$root = $root;

    // Кнопки
    this.$labelList = $root.find(_options.labelList);

    // Контент
    this.$contentList = $root.find(_options.contentList);

    // Стор активной кнопки
    this.$activeBtn = null;

    // Стор активного элемента
    this.$activeCtx = null;

    // Инициализируем
    this.init();

};

// Коротака язапись для удобства
Module.fn = Module.prototype;

/*
 * Методы
 *
 */

// Выбор элемента
Module.fn.select = function($btn, ctxLabel) {

    var $ctx = null;

    // Удаляем активный класс у бывших элементов
    this.deselect();

    // выделяем кнопку
    $btn.addClass(this.options.active);

    // Сохранение выбранной кнопки
    this.storeBtn($btn);

    // Находим связанный с кнопкой элемент
    $ctx = this.$root.find(ctxLabel);

    // RG.logger.log($ctx);
    // RG.events.publish('ContentHandler.select', {});

    if (!!$ctx) {

        // добавляем активный класс у выбранного элемента
        $ctx.addClass(this.options.active);

        // сохраняем выделенный элемент
        this.storeCtx($ctx);    

    } else {
        throw new Error(`Не найден выбранный элемент, проверьте аттрибут поиска элемента: ${this.options.attrFind}`);
    }

    return this;

};

// Удаление выбора элемента
Module.fn.deselect = function() {

    // Удаляем активный класс у кнопки
    if (!!this.$activeBtn) {
        this.$activeBtn.removeClass(this.options.active);
    }

    // Удаляем активный класс у контента
    if (!!this.$activeCtx) {
        this.$activeCtx.removeClass(this.options.active);
    }

    return this;

};

// Сохранение выбранной кнопки
Module.fn.storeBtn = function($el) {

    this.$activeBtn = $el;

    return this;

};

// Сохранение выбранного элемента
Module.fn.storeCtx = function($el) {

    this.$activeCtx = $el;

    return this;

};

// Инициализируем активную кнопку и контент
Module.fn.storeActiveEl = function() {

    var active = this.options.active;

    // Сохраняем кнопку
    this.$activeBtn = this.$labelList.filter(`.${active}`);

    // Сохраняем текст
    this.$activeCtx = this.$contentList.filter(`.${active}`);

    return this;

};

// Инициализация модуля
Module.fn.init = function() {

    var self = this;

    this

        // Инициализируем активную кнопку и контент
        .storeActiveEl()

        // вешаем событие на кнопки
        .$labelList.on('click', function(e) {

            var $btn = $(this),
                ctxLabel = null;

            // на случай если будет ссылка на элементе
            e.preventDefault();

            // Получаем контекст элемента
            ctxLabel = $btn.attr(self.options.attrFind);

            if (!!ctxLabel) {

                // выделяем элемент
                self.select($btn, ctxLabel);

            } else {
                throw new Error(`Не установлен аттрибут поиска элемента: ${self.options.attrFind}`);
            }

        })

        // закрываем цепочку
        ;

    return this;

};

// Экспортируем модуль
module.exports = Module;