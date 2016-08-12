/*
 * Модуль подключения шаблонов
 *
 */

var fs = require('fs'),
    UglifyJS = require('uglify-js'),
    
	
	// Функция проверки существования файла
    getFilePath = function(file, type) {
		
		if (type == 'scripts') {
			ext = 'js';
		} else if (type == 'styles') {
			ext = 'sass';
		}
		
		//console.log(file +'.'+ ext);
		
		if (fs.existsSync(file +'.'+ ext)) {
			
			return file +'.'+ ext;
			
		}
	},
    
    
    parseTmplParam = function(includeFile, typeFile) {
                
        //var tmplPath = pathMap.src.scripts +'/modules'; // путь до файлов
        
        var typeFile = typeFile.split(' ');
        
		if (typeFile[0] == 'scripts') {
			
			tmplPath = pathMap.src.scripts; // путь до директории скриптов
			
		} else if (typeFile[0] == 'styles') {
		
			tmplPath = pathMap.src.styles; // путь до директории стилей
		
		}
		
        var param = {
			'type': typeFile[0],
			'inline': (typeFile[1]) ? true : false,
			'resPath': '/res/'+ typeFile[0] +'/'+ includeFile, // ссылка на ресурс доступный из вне (dest/public)
            'filePath': getFilePath(tmplPath +'/'+ includeFile, typeFile[0]) // путь до файла (src)
        }
        
        //console.log(param);
        
        return param;
    
    },
    
    // Модуль обработки блоков RGInclude('modules/Fonts', 'scripts inline')
    RGInclude = function(includeFile, typeFile) {
        
        var param = parseTmplParam(includeFile, typeFile), // парсим параметры
				
		data = null;
		
		if (param.filePath) {
		
			if (param.inline) { // скрипты и стили в виде inline
				
				if (param.type == 'scripts') {
				
					dataContents = '<script>'+ UglifyJS.minify(param.filePath).code +'</script>';
				
				} else if (param.type == 'styles') {
					
					dataContents = 'НЕ РАБОТАЕТ! НАДО ДОПИСАТЬ RGInclude для вставки inline стилей';
				
				}
			
			} else { // скрипты и стили в виде ссылок
				
				if (param.type == 'scripts') {
					
					dataContents = '<script src="'+ param.resPath +'.js"></script>';
					
				} else if (param.type == 'styles') {
					
					dataContents = '<link rel="stylesheet" href="'+ param.resPath +'.css">';
				
				}
			
			}
			
			if (dataContents) {
			
				return data = {
					'opt': {
						'contents': [
							{ 'data': dataContents }
						]
					}
				};
				
			} else {
			
				console.log('dataContents is empty');
			
			}
		
		} else {
		
			//console.log('File '+ includeFile +' not found');
		
		}
    };

// Экспортируем
module.exports = RGInclude;
