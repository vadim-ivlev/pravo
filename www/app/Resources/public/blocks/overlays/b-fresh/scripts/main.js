/*
 * Точка входа элемента
 *
 */

var Ajax = require('./helpers/Ajax'),
	Fresh = require('./Fresh'),

	$cbox = null, // получим после метода RUN
	$cboxOverlay = null,

	/*
	 * Методы
	 *
	 */

	// Получаем выпуск
	getFascicle = (topic, param) => {

		var url = param.url || param,
			materialsTmpl = param.materialsTmpl || null;

		// Публикуем, что началась загрузка
		RG.events.publish('Fresh.loading.start');

		Ajax
			.getFascicle(url)
        	.done(function(data){

        		if (materialsTmpl) {

	        		// Инициализируем блок
	            	new Fresh({
						partials: { broadsides: materialsTmpl }
					});

					/*
			         * Работа с colorbox
			         *
			         */

					// Обновляем колорбокс
					$.colorbox.resize({
					    innerWidth: $('#fresh .b-fresh').outerWidth(true),
					    innerHeight: "80%"
					});

					// Если ширина больше планшета, добавляем overflow
					if ($(window).width() > 768) {
					    $('#cboxLoadedContent').css('overflow', 'hidden');
					}

					setTimeout(function(){
	                    // Удаляем класс загрузки
	                    $cbox.removeClass('has-loading');
	                    $cboxOverlay.removeClass('has-loading');
	                }, 300);

					// Публикуем, что колорбокс открыт
                	RG.events.publish('colorbox.opened');

                	// Работа с colorbox
				}

        		// Публикуем, что выпуск получен
		        RG.events.publish('Fresh.fascicleLoaded', data);
                
        	})
        	.fail(function(data){
        		RG.logger.error(`Модуль Fresh. Не могу получить данные свежего выпуска`);
        	})
        	.always(function(){

        		// Публикуем, что закончилась загрузка
				RG.events.publish('Fresh.loading.end');
        	});
	},

	// Получаем шаблон материала
	getMaterialsTmpl = (topic) => {
		return Ajax.getMaterialsTmpl();
	},

	// Запускаем блок
	/*freshRun = (topic) => {

		// Отправляем запрос получения шаблона материалов
		getMaterialsTmpl()
			.done(function(materialsTmpl){
				showFresh(materialsTmpl);
			})
			.fail(function(data){
        		RG.logger.error(`Модуль Fresh. Не могу получить шаблон статей`);
        	});

	},*/

	freshRun = (topic) => {

		$cbox = $('#colorbox');
		$cboxOverlay = $('#cboxOverlay');

		// Отправляем запрос получения шаблона материалов
		getMaterialsTmpl()
			.done(function(materialsTmpl) {
				showFresh(materialsTmpl);
			})
			.fail(function(data){
        		RG.logger.error(`Модуль Fresh. Не могу получить шаблон статей`);
        	});

	},

	showFresh = (materialsTmpl) => {

		$cboxOverlay.addClass('has-loading');

		$.colorbox({

        	// Объявляем контентер для элемента
            html: '<div id="fresh" class="b-fresh-wrapper"></div>',

            onComplete() {

				// Отправляем запрос получения данных
				RG.events.publish('Fresh.getFascicle', {url: 'rg', materialsTmpl: materialsTmpl});
            },

            onCleanup() {

            	// Очищаем данные
            	RG.events.publish('Fresh.clearFascicle');

            	// Статус закрытия
            	$cbox.addClass('hidding');
            	setTimeout(function(){
                    $cbox.removeClass('hidding');
                }, 1000);

            	// Публикуем, что колорбокс закрыт
                RG.events.publish('colorbox.closed');
            },

            onOpen() {
            	$cbox.addClass('has-loading');
            },

            onLoad() {},

            onClosed() {},

            opacity: 0.7,

            transition: 'none',

            //width: $(window).width()/3,
            initialWidth: 0,
            //height: $(window).height()/3
            initialHeight: 0,
        });

	},

	// Показать блок
	/*showFresh = (materialsTmpl) => {

		$.colorbox({

        	// Объявляем контентер для элемента
            html: '<div id="fresh" class="b-fresh-wrapper"></div>',

            onComplete() {

            	// Инициализируем блок
            	new Fresh({
					partials: { broadsides: materialsTmpl }
				});

				// Отправляем запрос получения данных
				RG.events.publish('Fresh.getFascicle', 'rg');
                
                // Публикуем, что колорбокс открыт
                RG.events.publish('colorbox.opened');
            },

            onCleanup() {

            	// Очищаем данные
            	RG.events.publish('Fresh.clearFascicle');

            	// Публикуем, что колорбокс закрыт
                RG.events.publish('colorbox.closed');
            },

            onLoad() {},

            onClosed() {},

            opacity: 0.7,

            width: $(window).width()/3,
            height: $(window).height()/3
        });

	},*/

	// Инициализация блока
	init = () => {

    	RG.events.registerList({
			
			// Подписываемся на событие, открытия блока
    		'Fresh.run': freshRun,

    		// Подписываемся на событие, загрузки выпуска
    		'Fresh.getFascicle': getFascicle
    	});
	};


// Экспортируем
module.exports = {
    init
};