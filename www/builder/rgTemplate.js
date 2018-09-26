/*
 * Модуль подключения шаблонов
 *
 */

var fs = require('fs'),
		
	/**
	 * Подключение шаблонов
	 * Шаблоны должны находиться в директории src/pages/data/crosspages
	 * Кастомные шаблоны должны находиться в директории src/pages/custom/#custom.type#/#custom.uri#/data/crosspages
	 * RG.T({
	 *		tmpl: 'meta', // путь до шаблона, без расширения
	 *		data: { // обьект с произвольными данными
	 *			mod: 'ads', // модификатор
	 *		}, 
	 *		custom: {
	 *			type: 'projects',
	 *			uri: 'rgdigital'
	 *		}
	 *	})
	 *
	 *
	 *
	 */
	
	getParams = function(tmplParam) {
	
		var 
		
			param = {
				// Путь до шаблона, относительно директории crosspages
				tmpl: tmplParam.tmpl,
				
				// Произвольные данные, по-умолчанию пустой обьект
				data: {}
			};
			
			// Проверка на существование кастомной сущности
			if (tmplParam.custom) {
				
				param.custom = {
					
					// Кастомная сущность
					type: tmplParam.custom.type,
					
					// Идентификатор кастомной сущности
					uri: tmplParam.custom.uri
					
				}
				
			}
			
			// Проверка на существование производьных данных
			if (tmplParam.data) {
				
				// Если есть произвольные данные добавляем
				param.data = tmplParam.data;
				
			}
			
		//console.log(param);
		
		return param;
	
	},
	
	// Модуль подключения шаблонов
	RGTemplate = function(tmplParam) {
		
		// Получение параметров
		var param = getParams(tmplParam),
			
			// Путь до основного шаблона
			tmplPath = pathMap.src.pages +'/data/crosspages/'+ param.tmpl +'.js';
		
		// Проверка на существование кастомной сущности
		if (param.custom) {
			
			// Переопределение: путь до кастомного шаблона
			tmplPath = pathMap.src.pages +'/custom/'+ param.custom.type +'/'+ param.custom.uri +'/data/crosspages/'+ param.tmpl +'.js';
			
		}
		
		//if (param.tmpl == 'meta') console.log(param);
		
		// Проверка на существование шаблона
		if (fs.existsSync(tmplPath)) {
			
			// Возвращаем шаблон с данными
			return require(tmplPath)(param.data);
			
		} else {
			
			// Выводим ошибку, если шаблон не найден
			console.log('RG.T Error: File '+ tmplPath +' not found');
			
		}
	};

// Экспортируем
module.exports = RGTemplate;
