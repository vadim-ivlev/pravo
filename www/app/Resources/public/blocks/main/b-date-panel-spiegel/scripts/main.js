/*
 * Точка входа элемента
 *
 */

var Ajax = require('./helpers/Ajax'),
	DatePanel = require('./DatePanel'),
	Supersp = require('./Supersp'),

	/*
	 * Методы
	 *
	 */

	// Получаем выпуск
	getData = (topic, url) => {

		// Публикуем, что началась загрузка
		RG.events.publish('Supersp.processing', true);

		Ajax
			.getData(url)
        	.done(function(data){

        		// Публикуем, что данные получены
		        RG.events.publish('Supersp.materials.loaded', data.result);
        	})
        	.fail(function(data){
        		RG.logger.error(`Модуль Supersp. Не могу получить данные свежего выпуска`);
        	})
        	.always(function(){

        		// Публикуем, что закончилась загрузка
				RG.events.publish('Supersp.processing', false);
        	});
	},

	// Показать материалы за сегодня
	showDataToday = (topic) => {

		$('#superspToday')
			.addClass('is-show')
			.removeClass('is-hide')
			//.show();

	},

	// Показать материалы за сегодня
	hideDataToday = (topic) => {

		$('#superspToday')
			.addClass('is-hide')
			.removeClass('is-show')
			//.hide();

	},

	// Запускаем блок
	run = (topic) => {

		// Инициализируем панель данных
		DatePanel.init();

		// Отправляем запрос получения шаблона материалов
		Ajax.getMaterialsTmpl()
			.done(function(tmpl){
				showSupersp(`<div class="b-news__list {{isHide ? 'is-hide' : ''}}">{{#materials}}${tmpl}{{/materials}}<div class="b-news__info">За выбранную дату материалов нет</div></div>`);
			})
			.fail(function(data){
        		RG.logger.error(`Модуль Supersp. Не могу получить шаблон статей`);
        	});

	},

	// Показать блок
	showSupersp = (materialsTmpl) => {

    	// Инициализируем блок
    	new Supersp({ template: materialsTmpl });

	},

	// Инициализация блока
	init = () => {

    	RG.events.registerList({
			
			// Подписываемся на событие, начала работы элемента
    		'Supersp.run': run,

    		// Подписываемся на событие, загрузки данных
    		// с передачей параметров
    		'Supersp.getData': getData,

    		// Показать данные за сегодня
    		'Supersp.showDataToday': showDataToday,

    		// Скрыть данные за сегодня
    		'Supersp.hideDataToday': hideDataToday
    	});
	};


// Экспортируем
module.exports = {
    init
};