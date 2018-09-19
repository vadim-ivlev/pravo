'use strict';

/*
 * Модуль подключения ресурсов
 *
 */

var fs = require('fs'),
    uglifyJS = require('uglify-js'),
    babel = require('babel-core'),
    _ = require('lodash'),

	/**
	 * Функция проверки существования файла
	 *
	 */
    getSource = function(param) {

		var source = {},

			customPath = '';

		// Проверка подключение кастомного ресурса
		if (param.custom) {

			// Относительная ссылка на кастомный ресурс
			customPath = '/custom/' + param.custom.type + '/' + param.custom.uri;

		}

		// Проверка на подключение скриптов
		if (param.type === 'script') {

			source = {

				// Ссылка на исходники ресурса
				src: pathMap.src.scripts + customPath + '/' + param.src + '.js', // путь до скриптов

				// Ссылка на ресурс
				dest: '/res/scripts' + customPath + '/' + param.src + '.js'

			}

		// Проверка на подключение стилей
		} else if (param.type === 'styles') {

			source = {

				// Ссылка на исходники ресурса
				src: pathMap.src.styles + customPath + '/' + param.src + '.sass', // путь до стилей

				// Ссылка на ресурс
				dest: '/res/styles'+ customPath + '/' + param.src + '.css'

			}

		// Проверка на подключение SVG
		} else if (param.type === 'svg') {

			// Если подключаем по ссылке на один ресурс
			if (param.inline === false) {

				// Проверяем корректность переданного пути
				// не должен быть массив
				if (!Array.isArray(param.src)) {

					source = {

						// Ссылка на исходники ресурса
						src: pathMap.src.svg + customPath + '/' + param.src + '.svg', // путь до стилей

						// Ссылка на ресурс
						dest: '/res/svg'+ customPath + '/' + param.src + '.svg'

					}

				} else {

					console.error('src expected to be String, not Array');

				}

			} else if (param.inline === true) {

				// Если подключаем массив путей и инлайном
				if (Array.isArray(param.src)) {

					// Получаем абсолютные пути
					source = {
						src: param.src.map(path => pathMap.src.svg + customPath + '/' + path)
					};

				} else {

					console.error('src expected Array')

				}

			}

		}

		// Проверка на включение опции проверки существования ресурса в исходниках
		if (param.existsCheck) {

			// Проверка существования ресурса в исходниках
			if (fs.existsSync(source.src)) {

				return source;

			}

		// Если опция проверки отключена
		} else {

			return source;

		}

	},


	/**
	 * Функция получения атрибутов
	 *
	 */
	getAttrs = function(attrs) {

		var attributes = '';

		// Проверка наличия атрибутов
		if (attrs) {

			// Пробегаемся по всем атрибутам
			for (attr in attrs) {

				attributes += ' ' + attr + '="' + attrs[attr] + '"';

			}

			return attributes;

		}
	},


	/**
	 *
	 * RG.R({
	 *		type: 'script', // тип подключаемого файла script|styles|svg
	 *		src: 'material' // ссылка на файл, без расширения. Если тип svg, то можно в массиве передать набор путей, в том числе и папку (['socials/', 'main.svg', 'icons/print.svg'])
	 *		inline: true, // вывод ресурса, по-умолчанию в файл (false), если выбрано true то header
	 *		existsCheck: false, // опция проверки на существование файла, по умолчанию - проверять (true)
	 *		attrs: { // Список кастомных атрибутов и их значений
	 *	 		id: 'mediator-init'
	 *		},
	 *		custom: {
	 *			type: 'projects',
	 *			uri: 'rgdigital'
	 *		}
	 *	})
	 *
	 */
    getParams = function(resourceParam) {

        var param = {

			type: resourceParam.type,

			inline: false,

      keepStyle: resourceParam.keepStyle,

			src: resourceParam.src,

			existsCheck: true,

			attrs: {}

        };

		// Проверка на установку параметра inline
		if (resourceParam.inline) {

			// Переопределение типа вывода ресурса
			param.inline = true;

		}

		if (resourceParam.existsCheck === false) {

			// Переопределение
			param.existsCheck = false;

		}

		// Проверка на установку атрибутов
		if (resourceParam.attrs) {

			param.attrs = resourceParam.attrs;

		}

		// Проверка на подключение кастомного ресурса
		if (resourceParam.custom) {

			param.custom = {

				type: resourceParam.custom.type,

				uri: resourceParam.custom.uri

			};

		}

        //console.log(param);

        return param;

    },

    /**
     * Модуль обработки SVG ресурсов в спрайт
     *
     */

    generateSVGContents = function(options) {

    	let
    		// Подключаем библиотеки
    		cheerio = require('cheerio'),

    		SVGSpriter = require('svg-sprite'),

    		// Склеивает файлы в SVG
    		spriter = null,

    		// Пути до ресурсов
    		resPaths = null,

    		// Указатель, когда спрайт скомпилируется
    		compileEnd = false,

    		// Результат компиляции спрайта
    		compileResult = null;

		// Настраиваем сборщик спрайтов
		spriter = new SVGSpriter({
			"mode": {
				"symbol": {
					"inline": true
				}
			},
			"svg": {
				"xmlDeclaration": false,
				"doctypeDeclaration": false,
				"namespaceIDs": false,
				"namespaceClassnames": false,
				"dimensionAttributes": false
			}
		});

		// Обрабатываем пути до файлов
		// Преобразуя в массив путей
		// Если они нам переданы
		if (!!options.resPaths) {

			resPaths = _.uniq(getPathsFromSrc(options.resPaths));

			// Подготавливаем сборку спрайта
			if (!!resPaths.length) {

				// Настраиваем сборщик
				resPaths.forEach(path => {

					// Добавляем спрайт
					spriter.add(
						path,
						null,
						fs.readFileSync(path, { encoding: 'utf-8' })
					);

				});

				// Собираем спрайт
				spriter.compile((error, result) => {

					let
						// SVG контент
						svgContent = String(result.symbol.sprite.contents),

						// SVG элемент
						$ = null;

					// Преобразуем строку в html
				    $ = cheerio.load(svgContent);

				    // Удаляем ненужное
				    $('title').remove();
					$('[style]').removeAttr('style');
					$('[data-name]').removeAttr('data-name');

				    // Заполняем нужным
				    // Если есть тег g, то добавляем ему аттрибут
				    // Иначе добавляем его к path
				    $('symbol').each(function(i, el) {

				    	var $el = $(el),
				    		$g = null,
				    		id = null;

				    	// Обновляем ID
				    	id = $el.attr('id');
				    	$el.attr('id', 'svg-' + id);

              if (!options.keepStyle) {
                // Удаляем ненужное
  				    	$el.find('path').removeAttr('fill');
  				    	$el.find('path').removeAttr('style');

              }

				    	// Обрабатываем группы символов
				    	$g = $el.find('g');

				    	if (!!$g.length) {

					    	$g.attr('fill-rule', 'evenodd');


					    } else {

					    	$el.find('path').attr('fill-rule', 'evenodd');

					    }

				    });

				    // Выводим
				    compileResult = $.html();

				    // Говорим, что компиляция завершилась
				    compileEnd = true;

				});

				// Немного магии
				// Тормозим скрипт, пока не отработает компилятор
				while (compileEnd) {

					return compileResult;

				}

			} else {

				console.error('RG.R, no paths for getPathsFromSrc (SVG Spriter)');

			}

		} else {

			console.error('RG.R, no paths from RGResource (SVG Spriter)');

		}

    },

    /**
     * Получаем пути до ресурсов
     * и собираем массив из них
     *
     * @param {String} resPaths массив набора масок для путей вида
     *                          ['/socials/', 'main.svg', '/icons/print.svg']
     *
     * @return {Array} возвращаем массив путей до конкретных файлов     *
     */

    getPathsFromSrc = function(resPaths) {

    	let res = [];

    	// Обрабатываем
    	resPaths.forEach(path => {

    		var resObj = checkResType(path);

    		// Определяем тип ресурса,
    		// Если это путь до файла, то добавляем в массив
    		// Иначе, запускаем поиск всех файлов из папки
    		if (resObj.type === 'file') {

    			res.push(resObj.path);

    		} else if (resObj.type === 'dir') {

    			res = res.concat(findFilePathFormDir(resObj.path));

    		}

    	});

    	return res;

    },

    /**
     * Определяем тип ресурса - папка, либо путь до файла
     * @param {String} path путь до ресурса
     * @return {Object} возвращаем объект с типом и путем ресурса
     */

    checkResType = function(path) {

	    var type = null;

	    if (/^\/[a-zA-Z0-9-_.\/]+\/$/.test(path)) {

	        type = 'dir';

	    } else if (/^\/[a-zA-Z0-9-_.\/]+[\/]*.svg$/.test(path)) {

	        type = 'file';

	    }

	    return {
	        type,
	        path
	    };

	},

	/**
	 * Ищем все файлы в папке и формируем полный путь до файла
	 * @param  {String} path путь до папки
	 * @return {Array} массив найденных путей файлов
	 */
	findFilePathFormDir = function(dirPath) {

		var paths = [];

		try {

			fs.readdirSync(dirPath).forEach(item => {

                if (/^[a-zA-Z0-9-_.]+\.svg+$/.test(item)) {

                    paths.push(dirPath + item);

                }

            });

		} catch (err) {

			console.error(err);

		}

		return paths;

	},

	/**
	 * Модуль подключения ресурсов
	 *
	 */
    RGResource = function(resourceParam) {

		// Получение параметров
        var param = getParams(resourceParam),

			source = getSource(param),

			data = null,

			dataContents = '';

		// Проверка наличия атрибутов
		if (param.attrs) {

			var attributes = getAttrs(param.attrs);

		}

		//console.log(source);

		// Проверка существование файла
		if (source) {

			// Проверка вывода ресурсов inline
			if (param.inline) {

				if (param.type === 'script') {

					dataContents = '<script'+ attributes +'>'+ uglifyJS.minify(babel.transformFileSync(source.src, {compact: true}).code, { fromString: true }).code +'</script>';

				} else if (param.type === 'svg') {

					// Если обрабатываем SVG, да еще и инлайном
					dataContents = generateSVGContents({
						resPaths: source.src,
            keepStyle: param.keepStyle
					});

					// Оборачиваем в скрытый div
					dataContents = `<div class="svg-root" style="display: none">${dataContents}</div>`;

				}

			// Иначе, подключение скриптов и стилей в виде ссылок
			} else {

				if (param.type === 'script') {

					dataContents = '<script' + attributes + ' defer src="' + source.dest + '"></script>';

				} else if (param.type === 'styles') {

					dataContents = '<link' + attributes + ' rel="stylesheet" href="' + source.dest + '">';

				} else if (param.type === 'svg') {

					dataContents = '<img' + attributes + ' src="' + source.dest + '">';

				}

			}

			if (dataContents) {

				return data = {
					opt: {
						contents: [
							{ data: dataContents }
						]
					}
				};

			} else {

				console.log('RG.R Error: dataContents is empty');

			}

		} else {

			console.log(source);
			console.log('RG.R Error: File '+ param.src +' not found');

		}

    };

// Экспортируем
module.exports = RGResource;
