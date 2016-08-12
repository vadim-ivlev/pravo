/*
 * Точка входа элемента
 *
 */

var Ajax = require('./helpers/Ajax'),
	Fascicles = require('./Fascicles'),

	/*
	 * Методы
	 *
	 */

	// Получаем выпуск
	getData = (topic, url) => {

		// Публикуем, что началась загрузка
		RG.events.publish('Fascicles.loading.start');

		Ajax
			.get(url)
        	.done(function(data){

        		// Публикуем, что выпуск получен
		        RG.events.publish('Fascicles.fascicleLoaded', data);
        	})
        	.fail(function(data){
        		RG.logger.error(`Модуль Fascicles. Не могу получить данные свежего выпуска`);
        	})
        	.always(function(){

        		// Публикуем, что закончилась загрузка
				RG.events.publish('Fascicles.loading.end');
        	});
	},

	// Запускаем блок
	run = () => {

		// Инициализируем блок
		new Fascicles();
	},

	// Инициализация блока
	init = () => {

		RG.events.registerList({

    		// Подписываемся на событие, загрузки выпуска
    		'Fascicles.get': getData
    	});

	};


// Экспортируем
module.exports = {
    init,
    run
};