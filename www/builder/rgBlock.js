/**
 * Модуль подключения блоков
 *
 */

var fs = require('fs'),
	extendify = require('extendify'),
	myExtend = extendify(),

	/**
	 * Функция получения блоков и путей до них
	 *
	 */
	getPathBlocks = function(path, blockCustom, block) {

		var _blockPaths = {},
			sectionItems,
			blockItems,
			pathBlock;


		if (blockCustom) {

			// Путь до кастомных блоков
			path = `${path}/custom/${blockCustom}`;

		}

		sectionItems = fs.readdirSync(path);

		sectionItems.map(function(section) {

			blockItems = fs.readdirSync(`${path}/${section}`);

			blockItems.map(function(block) {

				pathBlock = `${path}/${section}/${block}`;

				if (fs.statSync(pathBlock).isDirectory() && section !== 'custom') {

					// Удаляем преффикс 'b-', если он присутствует
					block = block.replace(/^b-/g, '');

					_blockPaths[block] = pathBlock;

				}

			});
		});

		// Если запрос на получение конкретного блока
		if (block) {

			// Возвращаем путь до блока по его идентификатору в RG.B ({block: ...})
			return _blockPaths[block];

		// Иначе массив блоков
		} else {

			// Возвращаем путь до всех найденных блоков
			return _blockPaths;

		}

	},


	/**
	 * Функция получения данных для блока по пути
	 *
	 */
	getDataBlock = function (path, param) {

		// Внутреняя функция очистки кеша у require (http://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate)
		var requireUncached = function (module){

				delete require.cache[require.resolve(module)]

				return require(module)

			},

			_data = requireUncached(path);

		//if (param.elem == 'ads') console.log(_data.article.uri);

		// Проверка на существование данных для расширения из RG.B
		if (param.data) {

			_data = myExtend(_data, param.data);

		}

		return _data;

	},

	/**
	 * Функция помошник
	 * Поведение элемента и блока идентично,
	 * поэтому, для дальнейшей проверки,
	 * можем вынести в отдельный обьект bem
	 *
	 */
	getBem = function (param) {

		// Для основного блока
		var bem = {
				block: 'block',
				mod: 'mod'
			};

		// Переназначение, если элемент
		if (param.elem) {

			bem = {
				block: 'elem',
				mod: 'elemMod'
			};
		}

		return bem;

	},


	/**
	 * Функция получения всех возможных вариантов существования путей
	 * Возвращает обьект options, с true если путь существует
	 * options {
	 *		block: true,
	 *		mod: true,
	 *		elem: true,
	 *		elemMod: true,
	 *		custom: { block: true, mod: true, elem: true, elemMod: true }
	 *	}
	 *
	 */

	getOptionsPath = function (param, bufferPaths, customInherit, type) {

		var options = {
				custom: {}
			},

			// Блок или элемент
			bem = getBem(param);

			if (param.custom.path) {

				// Проверка на существование кастомного блока с модификатором
				if (fs.existsSync(bufferPaths[type].custom[bem.mod])) {

					options.custom[bem.mod] = true;

				}

				// Проверка на существование кастомного блока
				if (fs.existsSync(bufferPaths[type].custom[bem.block])) {

					options.custom[bem.block] = true;

				}

				// Проверки на наследование кастомных блоков
				if (!customInherit[type]) {

					// Возвращаем кастомные опции, если наследование выключено
					return options;

				}
			}

			// Проверка на существование блока с модификатором
			if (fs.existsSync(bufferPaths[type][bem.mod])) {

				options[bem.mod] = true;

			}

			// Проверка на существование блока
			if (fs.existsSync(bufferPaths[type][bem.block])) {

				options[bem.block] = true;

			}

		return options;

	},

	/**
	 * Функция получения существующих путей
	 * Проверяются пути из буфера и создается карта существующих путей
	 * type может принимать следующие значения:
	 * ctrl - шаблоны контроллеров,
	 * swig - файлы шаблонизаторов,
	 * data - файлы с данными
	 *
	 */
	getExistsPath = function (param, bufferPaths, customInherit, type) {

		// Получение всех возможных вариантов путей до ресурса
		var options = getOptionsPath(param, bufferPaths, customInherit, type),

			// Блок или элемент
			bem = getBem(param);

		// Если имеется кастомный шаблон и наследование отключено
		if (param.custom.path) {

			// Проверка на наличие кастомного шаблона с модификатором
			if (options.custom[bem.mod]) {

				// Возвращаем путь до кастомного блока с модификатором
				return bufferPaths[type].custom[bem.mod];

			} else {

				// Проверка на наличие кастомного шаблона без модификатора
				if (options.custom[bem.block]) {

					// Возвращаем путь до кастомного блока без модификатора
					return bufferPaths[type].custom[bem.block];

				}
			}

			// Проверки на наследование кастомных блоков
			if (!customInherit[type]) {

				// Если не включено наследование, прерываем дальнейшие проверки и возвращаем путь до заглушки
				return bufferPaths[type].default;

			}

		};

		// Проверка на наличие основного шаблона с модификатором
		if (options[bem.mod]) {

			// Возвращаем путь с модификатором
			return bufferPaths[type][bem.mod];

		} else {

			// Проверка на наличие основного шаблона без модификатора
			if (options[bem.block]) {

				// Возвращаем путь без модификатора
				return bufferPaths[type][bem.block];

			// Если ничего не найдено
			} else {

				// Возвращаем путь до заглушки
				return bufferPaths[type].default;

			}
		}

	},


	/**
	 *  Функция получения существующих путей до ресурсов (styles)
	 *  Возможные варианты сборки стилей:
	 *	 - Блок/Элемент (далее элемент опускается)
	 *	 - Блок + блок с модификатором
	 *	 - Кастомный блок
	 *	 - Кастомный блок + блок с модификатором
	 *	 - Блок + кастомный блок с модификатором, если включено наследование
	 *
	 */

	getExistResPath = function (param, bufferPaths, customInherit, type) {

		// Получение всех возможных вариантов путей до ресурса
		var options = getOptionsPath(param, bufferPaths, customInherit, type),

			// Блок или элемент
			bem = getBem(param),

			path = {};

			// Проверка существания кастомного ресурса без модификатора
			if (options.custom[bem.block]) {

				path['custom'] = bufferPaths[type].custom[bem.block];

				// Проверка существания кастомного ресурса с модификатором
				if (options.custom[bem.mod]) {

					path['customMod'] = bufferPaths[type].custom[bem.mod];

				}

			/* Проверка
			 * отсутствия кастомного ресурса без модификатора
			 * и существания кастомного ресурса с модификатором
			 * и существование ресурса без модификатора
			 */
			} else if (!options.custom[bem.block] && options.custom[bem.mod] && options[bem.block]) {

				path['customMod'] = bufferPaths[type].custom[bem.mod];

				path['root'] = bufferPaths[type][bem.block];

			// Проверка существования ресурса без модификатора
			} else if (options[bem.block]) {

				path['root'] = bufferPaths[type][bem.block];

				// Проверка существования ресурса с модификатором
				if (options[bem.mod]) {

					path['rootMod'] = bufferPaths[type][bem.mod];

				}

			}

		return path;

	},


	/**
	 * Функция помошник
	 * Получение путей до файлов блоков
	 *
	 */
	getBlockPaths = function (param, dirpath, directory, extension) {

		var paths = {};

		// Путь до блока
		paths.block = dirpath +'/b-'+ param.block +'.'+ extension;

		if (param.mod) {

			// Путь до блока с модификатором
			paths.mod = dirpath +'/b-'+ param.block +'_'+ param.mod +'.'+ extension;

		}

		if (param.elem) {

			// Путь до элемента
			paths.elem = dirpath +'/'+ param.elem +'.'+ extension;

			if (param.elemMod) {

				// Путь до элемента с модификатором
				paths.elemMod = dirpath +'/'+ param.elem +'_'+ param.elemMod +'.'+ extension;

			}

		}

		return paths;

	},


	/**
	 * Получение путей до файлов блока
	 * type может принимать значения:
	 * ctrl - контроллер
	 * tmpl - шаблоны
	 * data - данные
	 * styles - стили
	 *
	 */
	getBufferPaths = function (type, param) {

		var paths = {},
			dirpath,
			directory,
			extension;

		switch (type) {

			case 'ctrl':
				directory = '';
				extension = 'js';
			break;

			case 'tmpl':
				directory = '/swig';
				extension = 'swig';
			break;

			case 'data':
				directory = '/data';
				extension = 'js';
			break;

			case 'styles':
				directory = '/styles';
				extension = 'sass';
			break;

		};

		// Директория блока
		dirpath = param.path + directory;

		// Пути до файлов блока
		paths = getBlockPaths(param, dirpath, directory, extension);

		// Проверка на существование кастомного блока
		if (param.custom.path) {

			// Переопределение: директория кастомного блока
			dirpath = param.custom.path + directory;

			// Пути до файлов кастомного блока
			paths.custom = getBlockPaths(param, dirpath, directory, extension);

		}

		// Путь до файлов дефолтного блока
		paths.default = pathMap.src.blocks + '/rgb'+ directory +'/rgb.'+ extension;

		/*if (param.block === 'form') {
			console.log(paths);
		}*/

		return paths;

	},


	/**
	 * Функция получения данных RGB
	 *
	 */
	getData = function (param, bufferPaths, customInherit) {

		var

			// Получение путей до данных
			dataPath = getExistsPath(param, bufferPaths, customInherit, 'data'),

			// Получение путей до шаблона
			tmplPath = getExistsPath(param, bufferPaths, customInherit, 'tmpl'),

			// Получение путей до контроллера
			ctrlPath = getExistsPath(param, bufferPaths, customInherit, 'ctrl'),

			// Получение путей до стилей
			stylesPath = getExistResPath(param, bufferPaths, customInherit, 'styles'),

			// Сборка данных
			data = {

				rgb: true, // Генерация блока через RG.B

				tag: param.tag, // Тег блока, может быть пустой

				block: param.block, // Блок

				elem: param.elem, // Элемент

				mod: param.mod, // Модификатор

				format: param.format, // Формат данных

				conditions: (param.conditions) && param.conditions.split(' '), // Условие для шаблонизатора

				render: param.render, // Отрисовка блока

				contents: [
					{
						path: tmplPath, // путь до swig шаблона

						// Получение информации о стилях
						stylesPath: {
							inline: (param.styles) && param.styles.inline, // Вывод стилей inline в header
							paths: stylesPath // Пути до стилей
						},

						param: {

							// Получаем данные для блока
							data: getDataBlock(dataPath, param),

							// Информация о родительском блоке
							parent: {
								type: (param.elem) ? 'elem' : 'block',
								name: (param.elem) ? param.block +'__'+ param.elem : param.block
							},

							mod: param.mod // Еще один модификатор, хрен знает зачем нужен, но без него не работает

						}
					}
				]

			};

			// Проверка на адаптивность блока (shift)
			if (param.shift) {

				data.shift = {
					active: param.shift.active, // активность
					resolution: param.shift.resolution, // разрешения
					block: 'rgb_'+ param.block // уникальный идентификатор блока
				};

				// Переопределение уникального идентификатора блока, если есть модификатор
				if (param.mod) {

					data.shift.block = 'rgb_'+ param.block +'_'+ param.mod;

				}

			};


			// Данные для панели инструментов
			data.tools = {
				block: param.block, // Блок
				elem: param.elem, // Элемент
				mod: param.mod, // Модификатор

				contents: {

					param: {

						// Информация о компоненте, забирается из данных в самом блоке
						meta: (data.contents[0].param.data.meta) && data.contents[0].param.data.meta,

						// Информация о родительском блоке
						parent: data.contents[0].param.parent,

						// Информация о путях
						path: {
							ctrl: ctrlPath,
							tmpl: tmplPath,
							data: dataPath,
							styles: stylesPath
						}
					}
				}
			};

			/*if (param.block == 'list-head') {
				console.log('---START---');
				console.log(getExistResPath(param, bufferPaths, customInherit, 'styles'));
				console.log('---STOP---');
			}*/

		return data;

	},


	/**
		RG.B({
			block: 'header', // Блок
			mod: 'index', // Модификатор
			elem: 'tools', // Элемент
			elemMod: 'big' // Модификатор элемента
			tag: 'span' // Тег блока, по-умолчанию dev
			tmpl: {
				render: false, // нужно ли рендерить шаблон, по-умолчанию true
				wrapper: false // нужно ли оборачивать в тег, по-умолчанию true
				conditions: false // условие для шаблонизатора mustache
			},
			data: { // произвольные данные, которые будут доступны в шаблоне
				...
			},
			styles: {
				inline: true // вывод стилей, по-умолчанию в css файл, если выбрано true то header
			},
			custom: { // кастомный блок
				type: 'projects', // тип шаблона
				uri: 'rgdigital', // идентификатор шаблона
				inherit: { // наследование от основного шаблона
					ctrl: true, // контроллер
					data: true, // данные
					tmpl: true, // шаблон
					styles: true // стили
				}
			},
			shift: { // шифтер
				resolution: [ 'mobile', 'tablet', 'tabletLandscape'], // разрешения экрана
				active: true // активный (содержит внутри html)
			},
			format: 'json' // формат данных, по умолчанию html
		})
	*/

	getParams = function (blockParam) {

		var param = {

				block: blockParam.block, // уникальный идентификатор

				mod: blockParam.mod, // модификатор

				elem: blockParam.elem, // элемент

				elemMod: blockParam.elemMod, // модификатор элемента

				path: getPathBlocks(pathMap.src.blocks, null, blockParam.block), // путь до блока из дефолтного набора

				data: blockParam.data, // данные

				render: true, // вывод шаблона, по умолчанию: true

				wrapper: true,

				custom: {

					path: false,

					inherit: { // наследование, по умолчанию false

						ctrl: false,

						data: false,

						tmpl: false,

						styles: false

					}

				},

				tag: 'div', // тег блока, по умолчанию div

				format: 'html', // формат данных, по умолчанию html

			}

			// Переопределение модификатора у элемента
			if (blockParam.elem) {

				param.mod = blockParam.elemMod;

			}

			// Проверка на адаптивность блока (shift)
			if (blockParam.shift) {

				param.shift = {
					resolution: blockParam.shift.resolution.join(' '), // разрешение экрана
					active: blockParam.shift.active // активность
				}

			}

			// Проверка на подключение стилей
			if (blockParam.styles) {

				param.styles = {
					inline: blockParam.styles.inline // принцип подключения стилей
				}

			}

			// Переопределение формата данных
			if (blockParam.format) {

				param.format = blockParam.format;

			}

			// Переопределение тега блока
			if (blockParam.tag) {

				param.tag = blockParam.tag;

			}


			// Проверка на существование кастомного блока
			if (blockParam.custom) {

				// Путь до блока из кастомного набора
				param.custom.path = getPathBlocks(pathMap.src.blocks, blockParam.custom.type + '/' + blockParam.custom.uri, blockParam.block);

				// Переопределение наследование
				if (blockParam.custom.inherit) {

					param.custom.inherit = {

						ctrl: (blockParam.custom.inherit.ctrl) && true, // наследовать контроллер

						data: (blockParam.custom.inherit.data) && true, // наследовать даныне

						tmpl: (blockParam.custom.inherit.tmpl) && true, // наследовать шаблон

						styles: (blockParam.custom.inherit.styles) && true // наследовать стили

					};

				}

			}

			// Обработка шаблона
			if (blockParam.tmpl) {

				// Условие шаблонизатора
				if (blockParam.tmpl.conditions) {

					param.conditions = blockParam.tmpl.conditions;

				}

				// Запрет на отрисовку шаблона
				if (blockParam.tmpl.render === false) {

					param.render = false;

				}

				// Запрет на отрисовку обертки
				if (blockParam.tmpl.wrapper === false) {

					param.wrapper = false;

					// Костыль: скрываем тег
					param.tag = '';

				}

			}

		/*if (blockParam.elem == 'ads') {
			console.log('-------');
			console.log(blockParam);
			console.log('-------');
		}*/

		return param;

	},


	// Модуль обработки блоков
	RGBlock = function(blockParam) {

		// Получаем обработанные параметры
		var param = getParams(blockParam),

			// Буфер путей: собираются все возможные пути, без проверки на существование
			bufferPaths = {

				ctrl: getBufferPaths('ctrl', param),

				tmpl: getBufferPaths('tmpl', param),

				data: getBufferPaths('data', param),

				styles: getBufferPaths('styles', param)

			},

			// Информация о наследовании у кастомных блоков
			customInherit = {

				ctrl: param.custom.inherit.ctrl, // наследовать контроллер

				data: param.custom.inherit.data, // наследовать данные

				tmpl: param.custom.inherit.tmpl, // наследовать шаблон

				styles: param.custom.inherit.styles // наследовать стили

			},

			// Получение данных
			data = getData(param, bufferPaths, customInherit),

			// Путь до контроллера
			ctrlPath = getExistsPath(param, bufferPaths, customInherit, 'ctrl');

			//console.log(ctrlPath);

			if (ctrlPath) {

				// Подключение данных для расширения
				var objectCustom = require(ctrlPath)(data),

					// Подключение дефолтных данных
					objectDefault = require(bufferPaths.ctrl.default)(data);

				/* Возвращаем дефолтные данные + данные для расширения
				 * Если дефолтный контроллер идентичен контроллеру для расширения - происходит обьединение одинаковых обьектов,
				 * но решили эти пренебречь
				 */
				return myExtend(objectDefault, objectCustom);

			}
	};

// Экспортируем
module.exports = RGBlock;
