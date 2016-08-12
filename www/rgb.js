/*
 * Модуль подключения блоков 
 *
 */

var fs = require('fs'),
	extendify = require('extendify'),

	myExtend = extendify(),

	
	getPathDefaultBlock = function(component) {
		
		rgbDefaultName = 'rgb';
		
		if (component == 'path') {
		
			return pathMap.src.blocks + '/'+ rgbDefaultName; // дефолтный блок
			
		} else if (component == 'name') {
			
			return rgbDefaultName; // дефолтный блок
			
		}
			
	}
	
	// Функция получения блоков и путей до них
	getPathBlocks = function(path, blockCustom, id) {
		
		var _blockPaths = {};
		
		if (blockCustom) {
			
			path = path +'/custom/'+ blockCustom; // путь до кастомных блоков
			
		}
		
		sectionItems = fs.readdirSync(path);
		
		for (var a = 0; a < sectionItems.length; a++) {
			
			blockItems = fs.readdirSync(path +'/'+ sectionItems[a]);
			
			for (var b = 0; b < blockItems.length; b++) {
							
				pathBlock = path +'/'+ sectionItems[a] +'/'+ blockItems[b];
								
				if (fs.statSync(pathBlock).isDirectory() && blockItems[b].match(/^b-/ig)) {
					
					blockName = blockItems[b].replace(/^b-/g, '');
					
					//console.log(pathBlock +' -> '+ blockName);
					
					_blockPaths[blockName] = pathBlock;
					
				}
				
			}
			
		}
		
		if (id) {
		
			return _blockPaths[id]; // путь до блока по id
			
		} else {
		
			return _blockPaths; // массив блоков
			
		}
		
	},
	
	
	// Функция получения данных для блока по пути
	getDataBlock = function (path) {
		
		return require(path);
		
	},
	
	// Функция получения путей swig, data
	getPath = function (block, type) {
		
		if (block.elem) { // Если это элемент блока
			
			if (block.custom) { // если имеется кастомный шаблон
					
				if (fs.existsSync(block.path[type].customElemMod)) {
					
					return block.path[type].customElemMod; // путь до элемента с модификатором
				
				} else {
				
					if (fs.existsSync(block.path[type].customElem)) {
					
						return block.path[type].customElem; // путь до кастомного элемента
					
					}
				}
					
			}
			
			if (fs.existsSync(block.path[type].elemMod)) {
				
				return block.path[type].elemMod; // путь до элемента
				
			} else {
				
				if (fs.existsSync(block.path[type].elem)) {
						
					return block.path[type].elem; // путь до элемента
					
				} else {
					
					return block.path[type].default; // путь до заглушки
				
				}
				
			}
		
		} else {
			
			if (block.custom) { // если имеется кастомный шаблон
					
				if (fs.existsSync(block.path[type].customMod)) {
			
					return block.path[type].customMod; // путь до кастомного с модификатором
					
				} else {
				
					if (fs.existsSync(block.path[type].custom)) {
						
						return block.path[type].custom; // путь до шаблона
					
					}
				}

			}
			
			if (fs.existsSync(block.path[type].mod)) {
				
				return block.path[type].mod; // путь с модификатором
				
			} else {
			
				if (fs.existsSync(block.path[type].root)) {
					
					return block.path[type].root; // путь шаблона
					
				} else {
					
					return block.path[type].default; // путь до заглушки
				
				}
			}
			
		}

	},
	
	// Функция получения путей styles
	getResPath = function (block, type) {
		
		path = {};
		
		if (block.elem) { // Если это элемент блока
			
			if (fs.existsSync(block.path[type].customElemMod)) {
				
				path['customElemMod'] = block.path[type].customElemMod;
			
			} 
			
			if (fs.existsSync(block.path[type].customElem)) {
			
				path['customElem'] = block.path[type].customElem
			
			}
				
			if (fs.existsSync(block.path[type].elemMod)) {
				
				path['elemMod'] = block.path[type].elemMod;
				
			} 
				
			if (fs.existsSync(block.path[type].elem)) {
					
				path['elem'] = block.path[type].elem;
				
			}

		} else {
			
			if (fs.existsSync(block.path[type].customMod)) {
		
				path['customMod'] = block.path[type].customMod;
				
			} 

			if (fs.existsSync(block.path[type].custom)) {
				
				path['custom'] = block.path[type].custom
			
			}

			if (fs.existsSync(block.path[type].mod)) {
				
				path['mod'] = block.path[type].mod;
				
			} 
			
			if (fs.existsSync(block.path[type].root)) {
				
				path['root'] = block.path[type].root;
				
			} 
			
		}
		
		return path;
		
	},
	
	// Функция получения данных RGB
	getData = function (block) {
		
		var dataPath = getPath(block, 'data'), // получаем путь до данных
		
			data = null;
			
			/*data = {
				'block': block.id,
				'format': block.format,
				'mod': block.mod,
				'elem': block.elem,
				'parent': {
					type: (block.elem) ? 'elem' : 'block',
					name: (block.elem) ? block.id +'__'+ block.elem : block.id
				},
				'path': {
					'tmpl': (block.custom) ? block.path.ctrl.custom : block.path.ctrl.root, // шаблон JS без модификатора
					'swig': (block.custom) ? block.path.swig.custom : block.path.swig.root, // шаблон SWIG без модификатора
					'data': (block.custom) ? block.path.data.custom : block.path.data.root, // данные без модификатора
					'swigElem': (block.custom) ? block.path.swig.customElem : block.path.swig.elem, // шаблон SWIG элемента без модификатора
					'dataElem': (block.custom) ? block.path.data.customElem : block.path.data.elem // данные элемента без модификатора
				},
				'swigPath': getPath(block, 'swig'), // путь до swig шаблона
				'stylesPath': getResPath(block, 'styles'), // путь до стилей
				'dataPath': dataPath, // путь до данных
				'dataBlock': getDataBlock(dataPath), // получаем данные для блока
				'mustache': (block.mustache) ? block.mustache.split(' ') : null
			}*/
			
			data = {
				rgb: true,
				tag: "div",
				block: block.id,
				elem: block.elem,
				mod: block.mod,
				format: block.format,
				//shift: data.shift,
				mustache: (block.mustache) && block.mustache.split(' '),
				contents: [
					{
						path: getPath(block, 'swig'), // путь до swig шаблона
						dataPath: dataPath, // путь до данных
						stylesPath: getResPath(block, 'styles'), // путь до стилей
						param: {
							data: getDataBlock(dataPath), // получаем данные для блока
							parent: {
								type: (block.elem) ? 'elem' : 'block',
								name: (block.elem) ? block.id +'__'+ block.elem : block.id
							},
							mod: block.mod,
							path: {
								ctrl: (block.custom) ? block.path.ctrl.custom : block.path.ctrl.root, // шаблон JS без модификатора
								swig: (block.custom) ? block.path.swig.custom : block.path.swig.root, // шаблон SWIG без модификатора
								data: (block.custom) ? block.path.data.custom : block.path.data.root, // данные без модификатора
								swigElem: (block.custom) ? block.path.swig.customElem : block.path.swig.elem, // шаблон SWIG элемента без модификатора
								dataElem: (block.custom) ? block.path.data.customElem : block.path.data.elem // данные элемента без модификатора
							}
						}
					}
				]
			}
			
			/* Если блок адаптивный */
			if (block.shift) {
			
				data.shift = {
					active: (block.shift.active == 'active') ? true : false, 
					resolution: block.shift.resolution, 
					id: 'rgb_'+ block.uri
				};
			
			}
			
		//if (data.block == 'my') console.log(data);
		
		
		return data;
		
	},
	
	
	// Парсер полученных параметров RGB('static.865804.feed&item:art, mobile desktop:active', 'include_related_by_org__length')
	parseParam = function (blockParam) {
			
		var uri = {},
			
			format; // формат вывода данных
			
			blockPath = pathMap.src.blocks; // путь до основных блоков
		
			blockParam = blockParam.replace(' ', '').split(','); // первый элемент - данные для блока (static.feed:art), второй адаптивность (mobile desktop:active)
			
			if (blockParam[0].replace(' ', '').indexOf('|json') + 1) { 
				
				format = 'json';
				
				blockParam[0] = blockParam[0].replace(' ', '').replace('|json', '');
				
			}
			
			blockUri = blockParam[0].split('.');
						
			if (blockUri.length == 3) {
				
				var blockCustom = blockUri[0] +'/'+ blockUri[1]; // кастомный шаблон и его id  (static.865804)
								
				blockUri = blockUri[2].split(':');
				
			} else {
			
				blockUri = blockUri[0].split(':');
				
			}
			
			uri.id = blockUri[0];
			
			uri.mod = blockUri[1];
			
			if (blockUri[0].indexOf('&') + 1) {
				
				blockUri = blockUri[0].split('&');
				
				uri.id = blockUri[0];
				
				uri.elem = blockUri[1];
				
			} 
			
			
		if (blockParam[1]) {
		
			var blockShift = blockParam[1].split(':'); // первый элемент - разрешение экрана (mobile desktop), второй - активность (active)
			
		}
	
		var param = {
				'id': uri.id, // уникальный идентификатор
				'elem': (uri.elem) ? uri.elem : null, // элемент
				'mod': (uri.mod) ? uri.mod : null, // модификатор
				'custom': (blockCustom) ? blockCustom : null, // кастомный шаблон
				'uri': (uri.mod) ? uri.id +'_'+ uri.mod : uri.id, // уникальный идентификатор + модификатор
				'format': (format) ? format : 'html', // формат данных
				'path': getPathBlocks(blockPath, null, uri.id), // путь до блока из дефолтного набора
				'pathCustom': (blockCustom) ? getPathBlocks(blockPath, blockCustom, uri.id) : null // путь до блока из кастомного набора
			}
				
		if (blockShift) {
	
			param.shift = { // адаптивность блока
				'resolution': (blockShift[0]) ? blockShift[0] : null, // разрешение экрана
				'active': (blockShift[1]) ? blockShift[1] : null // активность
			}
			
		} 
				
		//console.log(param);
		
		return param;
		
	},
	
	
// Модуль обработки блоков
	RGB = function(blockParam, mustache) {
		
		var param = parseParam(blockParam), // парсим параметры
		
			block = {
				'id': param.id,
				'elem': param.elem,
				'mod': param.mod,
				'uri': param.uri, // id_mod
				'custom': param.custom,
				'mustache': mustache,
				'format': param.format,
				'shift': (param.shift) ? param.shift : '',
				'path': {
					
					'ctrl': {
						'root': param.path +'/b-'+ param.id +'.js', // контроллер JS без модификатора
						'elem': param.path +'/'+ param.elem +'.js', // контроллер JS элемента
						'custom': param.pathCustom +'/b-'+ param.id +'.js', // кастомный контроллер JS без модификатора
						'customElem': param.pathCustom +'/'+ param.elem +'.js', // кастомный контроллер JS элемента
						'default': getPathDefaultBlock('path') +'/'+ getPathDefaultBlock('name') +'.js', // дефолтный JS контроллер
					},
					'swig': {
						'root': param.path +'/swig/b-'+ param.id +'.swig', // шаблон SWIG без модификатора
						'mod': param.path +'/swig/b-'+ param.id +'_'+ param.mod +'.swig', // шаблон SWIG с модификатором
						'elem': (param.elem) ? param.path +'/swig/'+ param.elem +'.swig' : '', // шаблон SWIG с модификатором
						'elemMod': (param.elem) ? param.path +'/swig/'+ param.elem +'_'+ param.mod +'.swig' : '', // шаблон SWIG с модификатором
						'custom': param.pathCustom +'/swig/b-'+ param.id +'.swig', // кастомный шаблон SWIG с модификатором
						'customMod': param.pathCustom +'/swig/b-'+ param.id +'_'+ param.mod +'.swig', // кастомный шаблон SWIG с модификатором
						'customElem': (param.elem) ? param.pathCustom +'/swig/'+ param.elem +'.swig' : '', // кастомный шаблон SWIG с модификатором
						'customElemMod': (param.elem) ? param.pathCustom +'/swig/'+ param.elem +'_'+ param.mod +'.swig' : '', // кастомный шаблон SWIG с модификатором
						'default': getPathDefaultBlock('path') +'/swig/'+ getPathDefaultBlock('name') +'.swig', // дефолтный SWIG шаблон
					},
					'data': {
						'root': param.path +'/data/b-'+ param.id +'.js', // данные без модификатора
						'mod': param.path +'/data/b-'+ param.id +'_'+ param.mod +'.js', // данные с модификатором
						'elem': (param.elem) ? param.path +'/data/'+ param.elem +'.js' : '', // данные с модификатором
						'elemMod': (param.elem) ? param.path +'/data/'+ param.elem +'_'+ param.mod +'.js' : '', // данные с модификатором
						'custom': param.pathCustom +'/data/b-'+ param.id +'.js', // кастомный шаблон SWIG с модификатором
						'customMod': param.pathCustom +'/data/b-'+ param.id +'_'+ param.mod +'.js', // кастомный шаблон SWIG с модификатором
						'customElem': (param.elem) ? param.pathCustom +'/data/'+ param.elem +'.js' : '', // данные с модификатором
						'customElemMod': (param.elem) ? param.pathCustom +'/data/'+ param.elem +'_'+ param.mod +'.js' : '', // данные с модификатором
						'default': getPathDefaultBlock('path') +'/data/'+ getPathDefaultBlock('name') +'.js' // дефолтные данные
					},
					'styles': {
						'root': param.path +'/styles/b-'+ param.id +'.sass', // стили без модификатора
						'mod': param.path +'/styles/b-'+ param.id +'_'+ param.mod +'.sass', // стили с модификатором
						'elem': (param.elem) ? param.path +'/styles/'+ param.elem +'.sass' : '', // стили с модификатором
						'elemMod': (param.elem) ? param.path +'/styles/'+ param.elem +'_'+ param.mod +'.sass' : '', // стили с модификатором
						'custom': param.pathCustom +'/styles/b-'+ param.id +'.sass', // кастомные стили с модификатором
						'customMod': param.pathCustom +'/styles/b-'+ param.id +'_'+ param.mod +'.sass', // кастомные стили с модификатором
						'customElem': (param.elem) ? param.pathCustom +'/styles/'+ param.elem +'.sass' : '', // стили с модификатором
						'customElemMod': (param.elem) ? param.pathCustom +'/styles/'+ param.elem +'_'+ param.mod +'.sass' : '', // стили с модификатором
						'default': getPathDefaultBlock('path') +'/styles/'+ getPathDefaultBlock('name') +'.sass' // дефолтные стили
					}
					
				}
			}
			
			data = getData(block); // получаем данные
		
		//console.log(data.stylesPath); 
		//console.log(block);
		//console.log(param.path);
		
		if (block.elem) {
			
			if (block.custom) { // если имеется кастомный шаблон
			
				if (fs.existsSync(block.path.ctrl.customElem)) { // если есть js для расширения элемента
				
					var objectDefault = require(block.path.ctrl.default)(data);
						objectCustom = require(block.path.ctrl.customElem)(data);
									
					return myExtend(objectDefault, objectCustom); // возвращаем дефолтный js элемента + js для расширения
					
				}
				
			}
			
			if (fs.existsSync(block.path.ctrl.elem)) {
				
				var objectDefault = require(block.path.ctrl.default)(data);
					objectCustom = require(block.path.ctrl.elem)(data);
								
				return myExtend(objectDefault, objectCustom); // возвращаем дефолтный шаблон элемента + кастомный
				
			} else {
				
				return require(block.path.ctrl.default)(data); // возвращаем дефолтный шаблон
				
			}
			
		} else {
			
			if (block.custom) { // если имеется кастомный шаблон
			
				if (fs.existsSync(block.path.ctrl.custom)) { // если есть js для расширения
				
					var objectDefault = require(block.path.ctrl.default)(data);
						objectCustom = require(block.path.ctrl.custom)(data);
									
					return myExtend(objectDefault, objectCustom); // возвращаем дефолтный js + js для расширения
					
				}
				
			}
			
			if (fs.existsSync(block.path.ctrl.root)) { // если есть js для расширения
				
				var objectDefault = require(block.path.ctrl.default)(data);
					objectCustom = require(block.path.ctrl.root)(data);
								
				return myExtend(objectDefault, objectCustom); // возвращаем дефолтный js + js для расширения
				
			} else {
				
				return require(block.path.ctrl.default)(data); // возвращаем дефолтный шаблон
				
			}
			
		}
	};

// Экспортируем
module.exports = RGB;
