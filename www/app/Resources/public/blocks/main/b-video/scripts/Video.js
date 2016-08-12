/*
 * Компонент видео
 *
 */

var

	// Отправляем статистику
    _sendStat = (url) => {

        var urlVideo = (/rg.ru/.test(url)) ? url : 'https://rg.ru' + url,
            urlArticle = location.href;

        RG.logger.info('send stat ' + urlVideo + ', ' + urlArticle);

        //Google
        if (!!window.ga) {
            ga('send', 'pageview', urlVideo);
        }

        //Yandex
        if (!!window.yaCounter22322746) {
            yaCounter22322746.hit(urlVideo, null, urlArticle);
        }

        //Mail
        if (!!window._tmr) {
            _tmr.push({id: "11659", url: urlVideo, referrer: urlArticle, type: "pageView", start: (new Date()).getTime()});
        }

        //Lifeinternet
        new Image().src = "//counter.yadro.ru/hit?t14.11;r"+escape(urlArticle)+((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(urlVideo)+";"+Math.random();

    },

	// Шаблон
	template = require('../b-video.ihtml'),

	// Компонент
	Component = Ractive.extend({

		template,

		/*
	     * Параметры инициализации
         * Получаем из тега
	     *      file
	     *      image
	     *      title
	     *      url
         *      aspectRatio
         *      authors
	     *
	     */

		data() {
			return {

				// Метаинформация
				meta: {
					id: null, // ID плеера
					playerNode: null, // Контейнер с плеером
					player: null, // Объект плеера
                    videoPlaying: false // статус видео (играет или остановлено)
				}
			};
		},

		decorators: {
            jwplayer(node) {

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
            RG.logger.debug('Video component init');
        },

        onrender() {

            // Приводим авторов к массиву
            // Из-за какого-то странного косяка с первым элементом массива
            if (!!this.get('authors')) {
                this.set('authorsList', JSON.parse(this.get('authors')));
            }

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
        	return 'rgVideo_' + Math.random().toString(36).substring(7);
        },

        // Инициализация плеера
        initPlayer() {

        	var

                // Линкуем компонент
                self = this,

        		// Получить id для плеера
        		playerId = this.getId(),

        		// Получить контейнер плеера
        		playerNode = this.get('meta.playerNode'),

        		// Контейнер в Jquery
        		$playerNode = null,

        		// Заголовок
	            title = this.get('title'),

	            // Путь до видео
	            file = this.get('file'),

	            // Путь до превью картинки
	            image = this.get('image'),

	            // URL для шаринга
	            url = this.get('url'),

                // Соотношение сторон
                aspectRatio = this.get('ratio'),

	            // Плеер
	            player = null,

	            // Настройки плеера
	            playerSettings = null,

	            statSend = false;

	        // Если есть контейнер для плеера и видео, то
	        // инициализируем его
	        if (playerNode && file) {

	            // Ищем контейнер
	            //$video = $(`#${videoElId}`);

	            // Default settings
	            playerSettings = {
	                width: "100%",
	                aspectratio: (!!aspectRatio) ? aspectRatio : "4:3",
	                sharing: {
	                    link: null
	                }
	            };

	            // Set Settings
	            playerSettings.file = file;

	            // если есть превью
	            if (image) {
	                playerSettings.image = image;
	            }

	            // если есть ссылка для шаринга
	            if (url) {
	                playerSettings.sharing.link = url;
	            }

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

                // Как останавливаем видео, меняем статус
                player.onPause(function(){

                    self.set('meta.videoPlaying', false);

                    RG.logger.log('meta.videoPlayed false');
                });

                // Если это не страница видео
                // И Как запускаем видео, меняем статус
                player.onPlay(function(){

                    self.set('meta.videoPlaying', true);

                    RG.logger.log('meta.videoPlayed true');

	               if (RG.meta.getPage() !== 'video') {

	                	var $jw = $(`#${playerId}`);

	                    if (!$jw.attr('data-sended') && (RG.config.env !== 'dev') ) {

	                        _sendStat(url);

	                        $jw.attr('data-sended', true);

                            RG.logger.log('video stat sended, url: ' + url);

	                    } else {

                            RG.logger.log('video stat not send');

                        }
	               }

                });

	            // Сохраняем объект плеера
	            self.set('meta.player', player);
	        }

        }

	});

// Экспортируем
module.exports = Component;