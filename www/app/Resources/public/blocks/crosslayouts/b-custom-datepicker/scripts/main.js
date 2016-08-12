/*
 * Модуль календаря
 *
 */

var Module = function(param) {

	var self = this;

	// Параметры по-умолчанию
	self._param = {

		// Элементы
		root: '#bCustomDatepickerRoot',
		el: '#bCustomDatepicker', // Сам календарь
		elDaterickerIcon: '.ui-datepicker-trigger', // Иконка календаря

		// Классы поведения
		behavoirClasses: {
			active: 'is-active',
			animationSrc: 'animated',
			animationBehavoir: 'bounceIn'
		},

		// Пользовательские методы
		methods: {},

		// Свойства календаря
		calendarParam: {

			// Свойства
		    dateFormat: 'yy-mm-dd',
		    constrainInput: true,
		    showButtonPanel: true,
		    showOn: 'button',
		    buttonText: 'Select...',
		    maxDate: '0',

		    /*
		     * Методы
		     *
		     */

		    // Как нажали на календарь
		    beforeShow() {

		    	RG.events.publish(`${self.name}.open`);
		    },

		    // Как закрыли календарь
		    onClose() {

		    	RG.events.publish(`${self.name}.close`);
		    },

		    // Как выбрали дату
		    onSelect(date) {

		    	RG.events.publish(`${self.name}.select`, date);
		    },
		}
	};

	// Свойства модуля
    self.param = null;

    // Имя модуля
    self.name = null;

    // Элементы модуля
    this.$elMap = null;

    // Инициализируем модуль
	return self.init(param);

};

// Наполняем методами
Module.prototype = {

	/*
	 * Вспомогательные функции
	 *
	 */

	// Устанавливаем параметры модуля,
	// расширяя если нужно
	setParam(param) {

		// Расширяем свойства
		// с глубокой вложенностью
    	this.param = $.extend(true, {}, this._param, param);

    	return this;
	},

	// Генерируем случайный хеш
	generateHash() {
	    return Math.random().toString(36).substring(7);
	},

	// Устанавливаем имя модуля
	setName() {
		this.name = 'calendar_' + this.generateHash();
	},

	// Получить имя модуля
	getName() {
		return this.name;
	},

	/*
	 * Элементы
	 *
	 */

	// Находим элементы
	setElMap() {

		// Задаем карту
		this.$elMap = {};

		// Контейнер
		this.$elMap.$root = $(this.param.root)

		// Элемент календаря
		this.$elMap.$el = this.$elMap.$root.find(this.param.el);

		return this;
	},

	// Получаем элемент иконки календаря
	setCalendarIcon() {

		// Элемент иконки календаря
		this.$elMap.$elDaterickerIcon = this.$elMap.$root.find(this.param.elDaterickerIcon);

	},

	// Выбираем календарь (жмем на него)
	openCalendar(callb) {

		var classes = this.param.behavoirClasses;

		this.$elMap.$elDaterickerIcon
			            .addClass(classes.active)
			            .addClass(classes.animationSrc)
			            .addClass(classes.animationBehavoir);

		// Если есть дополнительная функция,
		// вызываем
		if ($.isFunction(callb)) {
			callb(this);
		}

		return this;
	},

	// Снимаем выбор с календаря
	closeCalendar(callb) {

		var classes = this.param.behavoirClasses;

		this.$elMap.$elDaterickerIcon
			            .removeClass(classes.active)
			            .removeClass(classes.animationSrc)
			            .removeClass(classes.animationBehavoir);

		// Если есть дополнительная функция,
		// вызываем
		if ($.isFunction(callb)) {
			callb(this);
		}

		return this;
	},

	// Как выбрали дату
	selectCalendar(date, callb) {

		RG.logger.log('Выбрали дату ' + date);

		// Если есть дополнительная функция,
		// вызываем
		if ($.isFunction(callb)) {
			callb(this, date);
		}

		return this;
	},

	/*
	 * События
	 *
	 */

	setSubscribers() {

		var self = this,
			methods = this.param.methods;

		// Открытие календаря
		RG.events.subscribe(`${self.name}.open`, function(topic) {

			self.openCalendar(methods.open);
		});
		    
		// Закрытие календаря
    	RG.events.subscribe(`${self.name}.close`, function(topic) {

    		self.closeCalendar(methods.close);
    	});
    
    	// Выбор даты
    	RG.events.subscribe(`${self.name}.select`, function(topic, date) {

    		self.selectCalendar(date, methods.select);
    	});

    	return this;
	},

	/*
	 * Инициализация модуля
	 *
	 */

	// Запуск
	run() {

		// Инициализируем jQuery тейтпикер
		this.$elMap.$el.datepicker(this.param.calendarParam);

		// Находим иконку календаря
		this.setCalendarIcon();
	},

	// Инициализация
	init(param) {

		var self = this;

		// Устанавливаем имя модуля
		self.setName();

		// Устанавливаем параметры
		self.setParam(param);

		// Находим элементы
		self.setElMap();

		// Подписываемся на события
		self.setSubscribers();

		// Подписываем событие
		// на инициализацию календаря
		RG.events.subscribe(`${self.name}.run`, $.proxy(self.run, self));

		return this;
	}

};

// Экспортируем
module.exports = Module;