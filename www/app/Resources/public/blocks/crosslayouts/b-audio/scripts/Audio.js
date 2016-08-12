/*
 * Компонент видео
 *
 */

var

	// Отправляем статистику
    _sendStat = (_url) => {

        var url = (/rg.ru/.test(_url)) ? _url : '//rg.ru' + _url,
            urlArticle = location.href;
            
        RG.logger.info('send stat ' + url + ', ' + urlArticle);
            
        //Google
        if (!!window.ga) {
            ga('send', 'pageview', url);
        }

        //Yandex
        if (!!window.yaCounter22322746) {
            yaCounter22322746.hit(url, null, urlArticle);
        }

        //Mail
        if (!!window._tmr) {
            _tmr.push({id: "11659", url: url, referrer: urlArticle, type: "pageView", start: (new Date()).getTime()});
        }

        //Lifeinternet
        new Image().src = "//counter.yadro.ru/hit;RGSPORT?r"+escape(urlArticle)+((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(url)+";"+Math.random();

    },

	// Шаблон
	template = require('../b-audio.ihtml'),

	// Компонент
	Component = Ractive.extend({

		template,

		/*
	     * Параметры инициализации
	     * @file - путь до аудиофайла
	     * @title - подпись
	     *
	     */

		data() {
			return {
				file: null, // получаем из тега
				title: null, // получаем из тега

				// Метаинформация
				meta: {
					id: null, // ID плеера
					playerNode: null, // Контейнер с плеером
					player: null // Объект плеера
				}
			};
		},

		decorators: {
            jwplayeraudio(node) {

            	// Сохраняем элемент контейнера
                this.set('meta.playerNode', node);

                return {
                    teardown: () => {
                        $(node).destroy();
                    }
                };

            }
        },

		oninit() {
            RG.logger.debug('Audio component init');
        },

        onrender() {

            // Проверяем изменение данных
			this.observe('file meta.playerNode', function(newValue, oldValue, keypath) {
	            this.initPlayer();
			});
        },

        /*
         * Методы
         *
         */

        // Получить ID
        getId() {
        	return 'rgAudio_' + Math.random().toString(36).substring(7);
        },

        // Инициализация плеера
        initPlayer() {

        	var

        		// Получить id для плеера
        		playerId = this.getId(),

        		// Получить контейнер плеера
        		playerNode = this.get('meta.playerNode'),

        		// Контейнер в Jquery
        		$playerNode = null,

        		// Заголовок
	            title = this.get('title'),

	            // Путь до файла
	            file = this.get('file'),

	            // Плеер
	            player = null,

	            // Настройки плеера
	            playerSettings = null,

	            statSend = false;

	        // Если есть контейнер для плеера и видео, то
	        // инициализируем его
	        if (playerNode && file) {

	            // Default settings
	            playerSettings = {
					'width': '100%',
					'height': '24',
					'controlbar': 'bottom',

					//'flashplayer': 'http://img.rg.ru/i/player/v/player.swf',
					//'skin': '//rg.ru/i/m/rg.zip',

					'plugins': {
						'gapro-1': {
							'accountid': 'UA-7039329-10',
							'trackstarts': 'true',
							'trackpercentage': 'true',
							'tracktime': 'true',
							//'skin': '//rg.ru/i/m/rg.zip',
							'idstring': 'one',	 
						}
					},

					'modes': [
						/*{
							type: 'flash',
							src: 'http://img.rg.ru/i/player/v/player.swf'
						},*/
						{
							type: 'html5',
							config: {
								'provider': 'video'
							}
						},
					]
				};
	            
	            // Set Settings
	            playerSettings.file = file;

	            // Получаем контейнер в jQuery
	            $playerNode = $(playerNode);

	            // Очищаем контейнер
	            $playerNode.empty();

	            // Добавляем контейнер для видео
	            $playerNode.append(
	            	$('<div />', {
	            		'id': playerId
	            	})
	            );

	            // Init player
	            // Apply settings player
	            player = jwplayer(playerId).setup(playerSettings);

	            // Подписываем отправку статистики
                player.onPlay(function(){

                	var $jw = $(`#${playerId}`);

                    if (!$jw.attr('data-sended')) {

                        _sendStat(url);

                        $jw.attr('data-sended', true);
                    }
                });

	            // Сохраняем объект плеера 
	            this.set('meta.player', player);

	        }

        }

	});

// Экспортируем
module.exports = Component;