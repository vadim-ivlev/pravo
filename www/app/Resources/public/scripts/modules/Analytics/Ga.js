/*
 * Модуль Google аналитики
 *
 */

var
    /*
     * Свойства
     * 
     */
    
    // Префикс событий
    _modulePrefix = 'Ga',

    _gaId = 'UA-7039329-31',

    // Конфигурация dimensions
    dimensionsConf = {
        1: "rubric:id" // ID рубрики
    },

    // Загрузка и инициализация библиотеки
    loadLib = () => {

        // Взято отсюда developers.google.com/analytics/devguides/collection/analyticsjs/
        $.getScript('//www.google-analytics.com/analytics.js');
    },

    // Устанавливаем dimensions
    dimensionsSet = () => {

        $.each(dimensionsConf, function(dimension, prop){

            var targetLabel = null,
                val = null;

            // Устанавливаем селектор элемента
            targetLabel = `meta[property="${prop}"]`;

            // Получаем значение
            val = $(targetLabel).attr('content');

            // Если значение есть, то устанавливаем
            // соответственный dimension
            if (!!val) {

                // Если проверка на длину,
                // округляем
                if (prop === 'article:length') {
                    val = Math.floor(+val/100)*100;
                }

                RG.logger.log('article:length = ' + val);

                ga('set', `dimension${dimension}`, val);

            }

        });

    },

    // Настройка стандартных параметров
    setup = () => {

        var customGaId = RG.meta.getGaId(),
            //customGaURI = RG.meta.getGaURI();
            customGaURI = RG.meta.getProjectUri();

    	// Настройка глобального обЪекта
    	window.ga = window.ga || function(){ 
    		ga.q = ga.q || [];
    		ga.q.push(arguments);
    	};

    	ga.l = +new Date;

        RG.logger.log('ga id: ' + customGaId);
        RG.logger.log('ga GaURI: ' + customGaURI);

    	// Настройки счетчика
        ga('create', _gaId, 'rg.ru');

        // Если есть кастомный счетчик для GA
        if(!!customGaId) {
            ga('create', customGaId, 'rg.ru', {'name': customGaURI});
        }

        //ga('create', 'UA-7039329-30', 'auto');

        // Устанавливаем dimensions
        dimensionsSet();

        // Отправляем информацию по экрану
        ga('set', 'dimension2', RG.ScreenViewer.getScreenInfo().type);

        ga('require', 'displayfeatures');
        ga('send', 'pageview');
    },

    // Регистрация одного события в GA
    // @data
    //	type - тип события (send или set)
    //	param - объект с параметрами
    //		tagLabel - лейбл, по которому искать элемент
    //		event - событие, по которому срабатывает счетчик
    //		
    //		hitType -  тип события
    //		eventCategory - категория события
    //		eventAction - действие по событию
    //		eventLabel - подпись события
    //		eventValue - значение события

    register = (data) => {

    	var type = data.type,
    		param = data.param;

    	// Вешаем слушателя
    	$(param.tagLabel).on(param.event, function(e) {

            sendTracker({
                type: type, 
                param: {
                    hitType: param.hitType,
                    eventCategory: param.eventCategory,
                    eventAction: param.eventAction,
                    eventLabel: param.eventLabel,
                    eventValue: param.eventValue
                }
            });

            // старый код
    		/*ga(type, {
				hitType: param.hitType,
				eventCategory: param.eventCategory,
				eventAction: param.eventAction,
				eventLabel: param.eventLabel,
				eventValue: param.eventValue
    		});*/

    		RG.logger.log(`send GA, event: ${param.event}, on element ${param.tagLabel}`);

    	});

    	RG.logger.log(`Зарегестрировано событие GA, event: ${param.event}, на элементе ${param.tagLabel}`);

    },

    // Регистрация пакета событий GA
    registerList = (data) => {

    	var list = data.list,
    		meta = data.meta;

    	// Проходим по списку событий
    	$.each(list, function(index, item){

    		// ОБрабатываем каждый набор событий
	    	// @type - тип события (send или set)
	    	// @param - параметры отправляемого события
	    	$.each(item, function(type, param){

	    		// Регистрируем все события
	    		$.each(param, function(index, paramItem){

	    			register({ type: type, param: paramItem });

	    		});

	    	});

    	});

    },

    // Отправка события
    // @type - тип события, по умолчанию send
    // @param - передаваемые параметры
    sendTracker = (data) => {

        var type = data.type || 'send',
            param = data.param;

        // отправляем
        ga(type, {
            hitType: param.hitType,
            eventCategory: param.eventCategory,
            eventAction: param.eventAction,
            eventLabel: param.eventLabel,
            eventValue: param.eventValue,
            nonInteraction: param.nonInteraction || true
        });

        RG.logger.log(`Отправлены GA данные, по событию ${type}`);
        RG.logger.log('Отправлены GA данные, с параметрами', param);

    },

    // Инициализация
    init = () => {
        RG.events.subscribe(`${_modulePrefix}.run`, run);
    },

    // Запуск
    run = () => {
        loadLib();
        setup();
    };

module.exports = {
    _modulePrefix,
    register,
    registerList,
    sendTracker,
    init
}