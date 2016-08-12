/*
 * Модуль раскрывающихся блоков по клику на элемент
 *
 * Передаем родительский элемент,
 * в котором есть кнопка и контент,
 * который будем скрывать.
 *
 * Скрытие осуществляется самостоятельно через css (по-умолчанию)
 * если в опциях 
 *
 *
 * Когда открыто - класс is-show, закрыто - is-hide
 * По инициализации нужно передать,
 * какое дефолтное состояние должно быть у блока,
 * Методж show или hide
 *
 */

function Module(root, options) {

    var $root = $(root),
        _options = null,
        defaults = {
            btn: '.b-content-toggler__btn',
            ctx: '.b-content-toggler__ctx',
            show: 'is-show',
            hide: 'is-hide',
            opened: false 
        };

    $.extend({
      'location'         : 'top',
      'background-color' : 'blue'
    }, options);

    // Настройки
    this.options = _options = $.extend({}, defaults, options);            

    // Родительский контейнер
    this.$root = $root;

    // Кнопка для действия
    this.$btn = $root.find(_options.btn);

    // Скрываемый элемент
    this.$ctx = $root.find(_options.ctx);

    // Инициализируем модуль
    this.init();
};


// Короткая запись
Module.fn = Module.prototype;

// Уничтожаем 
Module.fn.destroy = function() {

    this.$root
            .removeClass(this.options.show)
            .removeClass(this.options.hide);
    this.$ctx.css('height', 'auto');

    return this;
};

Module.fn.setHeight = function($el) {

    // Выставление высоты скрываемому/открываемому элементу

    $el.css('height', $el.children().outerHeight(true));

    return this;
};

// Статус скрыт контент
Module.fn.initialHide = function($el) { 

    // Скрыть
    var show = this.options.show;
    var hide = this.options.hide;
    this.$ctx.css('height', 0);
    this.$root
        .removeClass(show)
        .addClass(hide);

    return this;
};

Module.fn.showHide = function($el) { 

    // Скрыть или показать, в зависимости от класса

    var show = this.options.show;
    var hide = this.options.hide;

    if (this.$root.hasClass(show)) {
        this.$ctx.css('height', 0);
        this.$root
            .removeClass(show)
            .addClass(hide);
    } else {
        this.setHeight(this.$ctx);
        this.$root
            .removeClass(hide)
            .addClass(show);
    }

    return this;
};

Module.fn.initialShow = function($el) { 

    // Скрыть или показать, в зависимости от класса

    var show = this.options.show;
    var hide = this.options.hide;
    
    this.setHeight(this.$ctx);
    this.$root
        .removeClass(hide)
        .addClass(show);

    return this;
};

Module.fn.init = function() {

    var self = this;

    // Проверка начального состояния
    if (this.options.opened) { 
        this.$root.addClass(this.options.show);

        // Не всегда высота при загрузке соответствует высоте после загрузки :(
        setTimeout(function(){
            self.setHeight(self.$ctx);
        }, 1000);
    } else { 
        this.initialHide(this.$ctx);
    }

    $(window).resize(function(){ 
        if (self.$root.hasClass(self.options.show)) {
            self.setHeight(self.$ctx);
        } 
    });


    // клик по кнопке
    this.$btn.on('click', function(){ 
        self.showHide(self.$ctx);
    });

    RG.events.subscribe('ContentHandler.select', function(t, e) { 
        self.setHeight(self.$ctx);
    });

    return this;
};





// Экспортируем модуль
module.exports = Module;