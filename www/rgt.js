/*
 * Модуль подключения шаблонов
 *
 */

var fs = require('fs'),
	
	
	// Функция получения шаблонов и путей до них
	getPathTmpl = function(path, id) {
		
		var _tmplPaths = {};
		
		if (fs.existsSync(path)) {
		
			tmplItems = fs.readdirSync(path);
			
			for (var a = 0; a < tmplItems.length; a++) {
							
				if (fs.statSync(path +'/'+ tmplItems[a]).isFile()) {
					
					tmplName = tmplItems[a].replace('.js', '');
									
					_tmplPaths[tmplName] = path +'/'+ tmplItems[a];
				
				} 
				
			}
			
			if (id) {
			
				return _tmplPaths[id]; // путь до шаблона по id
				
			} else {
			
				return _tmplPaths; // массив шаблонов
				
			}
		
		} else {
		
			return null;
		
		}
		
	},
	
	
	/* RGT('article.sidebarLeft:article') */
	parseTmplParam = function(tmplParam) {
				
		var tmplPath = pathMap.src.pages +'/data/crosspages'; // путь до основных шаблонов
		
		tmplParam = tmplParam.split(':');
		
		tmplUri = tmplParam[0].split('.');
		
		id = tmplUri[0];
		
		if (tmplUri.length == 2) {
			
			tmplPath = tmplPath +'/'+ tmplUri[0];
			
			id = tmplUri[1];
			
		}
		
		var param = {
			'id': id, // уникальный идентификатор
			'mod': (tmplParam[1]) ? tmplParam[1] : '', // модификатор
			'path': getPathTmpl(tmplPath, id) // путь до шаблона
		}
		
		//console.log(param);
		
		return param;
	
	},
	
	// Модуль обработки блоков
	RGT = function(tmplParam) {
		
		var param = parseTmplParam(tmplParam); // парсим параметры
		
			data = {
				'id': param.id,
				'mod': param.mod,
				'path': (param.path) ? param.path : null
			}
			
			
			
		//console.log(data);
		
		if (data.path) {
		
			return require(data.path)(data);
			
		} else {
		
			console.log('File '+ data.id +' not found');
			
		}
	};

// Экспортируем
module.exports = RGT;
