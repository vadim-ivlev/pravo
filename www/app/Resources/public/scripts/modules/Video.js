/*
 * Модуль инициализации видео
 *
 */

var
    /*
     * Свойства
     * 
     */
    
    // Префикс событий
    _modulePrefix = 'Video',

    // Блоки с видео по-умолчанию
    videoLabel = '.b-video-source',

    /*
     * Инициализация плеера
     * Принимаем параметры инициализации
     * @param = {
     *      videoElId
     *      file
     *      image
     *      title
     *      shareUrl
     * }
     * отдает объект плеера
     *
     */

    playerInit = (param) => {
        
        var
            // ID контейнера для плеера
            videoElId = param.videoElId || null,

            $video = $(`#${videoElId}`),

            // Путь до видео
            file = param.file || null,

            // Путь до превью картинки
            image = param.image || null,

            // URL для шаринга
            shareUrl = param.shareUrl || null,

            // Заголовок
            title = param.title || null,

            // Плеер
            player = null,

            // Настройки плеера
            playerSettings = null,

            statSend = false;

        // Если есть контейнер для плеера и видео, то
        // инициализируем его
        if (videoElId && file) {

            // Ищем контейнер
            $video = $(`#${videoElId}`);

            // Default settings
            playerSettings = {
                width: "100%",
                aspectratio: "4:3",
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
            if (shareUrl) {
                playerSettings.sharing.link = shareUrl
            }

            // если есть заголовок ПОПРОСИЛИ УБРАТЬ
            /*if (title) {
                playerSettings.title = title;
            }*/

            // Init player
            // Apply settings player
            player = jwplayer(videoElId).setup(playerSettings);

            // Если это не страница видео
            if (RG.meta.getPage() !== 'video') {

                player.onPlay(function(){

                    if (!$video.attr('data-sended')) {

                        sendStat(shareUrl);

                        $video.attr('data-sended', true);
                    }
                });

            }

            return player;

        } else {
            RG.logger.error(`Функция playerInit. jwplayer не запустился, проверьте входные данные ${param}`);
        }

    },

    // Инициализация видео
    videoInit = (topic, customVideoLabel) => {

        var $video = $((customVideoLabel || videoLabel));

        RG.logger.log(`Инициализация видео в статье. Элементов ${$video.length}`);

        if (!!$video.length) {

            // Ищем все видео на странице
            $video.each(function(e){

                var 
                    // Элемент видео
                    $el = $(this),

                    // ID которое мы сгенерируем для плеера
                    videoElId = null,

                    // Путь до видеофайла
                    file = $el.attr('data-file'),

                    // Путь до превью картинки
                    image = $el.attr('data-image'),

                    // Заголовок
                    title = $el.attr('data-title'),

                    // URL для шаринга
                    shareUrl = $el.attr('data-share-url'),

                    // Объект параметров для плеера
                    videoParam = {};

                // Назначаем ID плеера
                videoElId = 'rgVideo_' + Math.random().toString(36).substring(7);
                $el.attr('id', videoElId);

                // Назначаем параметры видео
                videoParam = {
                    videoElId: videoElId,
                    file: file,
                    image: image
                };

                // Если есть заголовок
                if (!!title) { 
                    videoParam.title = title;
                }

                // Если есть URL шаринга
                if (!!shareUrl) {
                    videoParam.shareUrl = shareUrl;
                }

                // Инициализируем видео
                // с добавлением объекта в глобальное пространство
                window['video' + videoElId] = playerInit(videoParam);

            });

        }

    },

    // Отправляем статистику
    sendStat = (shareUrl) => {

        //var urlVideo = '//rg.ru/' + shareUrl,
        var urlVideo = '//rg.ru' + shareUrl,
            urlArticle = location.href;
            
        console.info('send stat ' + urlVideo + ', ' + urlArticle);
            
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
        new Image().src = "//counter.yadro.ru/hit;RGSPORT?r"+escape(urlArticle)+((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(urlVideo)+";"+Math.random();

    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    init = () => {
        RG.events.subscribe(`${_modulePrefix}.run`, videoInit);
    };

// Экспортируем модуль
module.exports = {
    _modulePrefix,
    playerInit,
    init
}