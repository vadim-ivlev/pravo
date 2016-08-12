/**
 * Элемент галереи
 */

var template = require('../b-gallery.ihtml'), // подкючение шаблона

    Gallery = Ractive.extend({

        template,

        decorators: {
            fotorama(node) {

                this.set('meta.nodeGall', node);

                /*try {

                    var self = this,
                        fotoramaHandler = null;

                    // Инициализируем фотораму
                    fotoramaHandler = $(node).fotorama({
                        width: "100%",
                        nav: "thumbs",
                        ratio: "800/530",
                        arrows: true,
                        loop: true,
                        //hash: true,
                        keyboard: true
                    })
                        .on('fotorama:ready', function (topic, fotorama) {

                            // После того, как инициализировали,
                            // говорим, что можно счетчик обрабатывать
                            self.set('meta.fotoramaReady', true);
                        })

                        .on('fotorama:load', function (topic, fotorama) {

                            // Отправляем событие, что слайд сменился
                            RG.events.publish(`gallery_${self.get('gall')}_${self.get('option')}`, {
                                url: location.href,
                                title: self.get('meta.info').title,
                                description: self.get('meta.info').description,
                                image: fotorama.activeFrame.img || fotorama.activeFrame.thumb
                            });
                        })

                        // Отправляем событие, что слайд сменился
                        .on('fotorama:showend', function(topic, fotorama) {

                            // Отправляем статистику, если не отправлена
                            if (!self.get('meta.sendStat') && self.get('meta.fotoramaReady')) {
                                self.sendStat();
                            }

                        })
                        .data('fotorama');

                    self.set('meta.fotoramaHandler', fotoramaHandler);

                    return {
                        teardown: () => {
                            $(node).destroy();
                        }
                    };

                } catch(err) {
                    RG.logger.error(err);
                }*/

                return {
                    teardown: () => {
                        $(node).destroy();
                    }
                };

            }
        },

        data() {
            return {
                gall: null, // получаем через тег
                option: null,  // получаем через тег
                photos: [],
                meta: {
                    nodeGall: null,
                    info: null,
                    fullscreen: false,
                    sendStat: false,
                    fotoramaReady: false,
                    referers: []
                }
            }
        },

        oninit() {
            RG.logger.debug('Gallery from component init');
        },

        onrender() {

            var self = this;

            self.on({
                openFullscreen: self.openFullscreen,
                closeFullscreen: self.closeFullscreen
            });

            // Перенастраиваем галерею в зависимости от экрана
            RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, (topic, screenInfo) => {

                self.setupGallery(screenInfo);
            });

            // Получаем данные
            $.ajax({
                type: 'GET',
                url: `//foto.rg.ru/project/photos/insert.php?option_id=${self.get('option')}&photorep_id=${self.get('gall')}&callback=?`,
                dataType: 'json'
            }).done(function(data){

                // Заполняем данными
                self.set('photos', data.photos);
                self.set('meta.info', data.meta);
                self.set('meta.referers', data.referers);

                // Инициализируем фотораму
                self.initFotorama();

                // Донастраиваем галерею
                self.setupGallery();
            });

            if (RG.config.env === 'prod') {

                // Проверка refferer
                self.checkReferer();

            }

        },

        /*
         * Методы
         *
         */

        // Инициализация фоторамы
        initFotorama(node) {

            var node = this.get('meta.nodeGall'),
                self = this,
                fotoramaHandler = null;

            // Инициализируем фотораму
            fotoramaHandler = $(node).fotorama({
                width: "100%",

                // Показывать ли превью
                nav: "thumbs",
                ratio: "800/530",
                arrows: true,
                loop: true,
                //hash: true,
                keyboard: true,

                startindex: self.get('meta.info.main_photo_index')
            })
                .on('fotorama:ready', function (topic, fotorama) {

                    // После того, как инициализировали,
                    // говорим, что можно счетчик обрабатывать
                    self.set('meta.fotoramaReady', true);

                    //console.log('fotorama:ready');
                })

                .on('fotorama:load', function (topic, fotorama) {

                    //console.log('fotorama:load');

                    // После того, как инициализировали,
                    // говорим, что можно счетчик обрабатывать
                    self.set('meta.fotoramaReady', true);

                    // Отправляем событие, что слайд сменился
                    RG.events.publish(`gallery_${self.get('gall')}_${self.get('option')}`, {
                        url: location.href,
                        title: self.get('meta.info').title,
                        description: self.get('meta.info').description,
                        image: fotorama.activeFrame.img || fotorama.activeFrame.thumb
                    });
                })

                // Отправляем событие, что слайд сменился
                .on('fotorama:showend', function(topic, fotorama) {

                    //console.log(self);
                    //console.log(self.get('meta.sendStat'));
                    //console.log(self.get('meta.fotoramaReady'));
                    //console.log(!self.get('meta.sendStat') && self.get('meta.fotoramaReady'));

                    // Отправляем статистику, если не отправлена
                    //if (!self.get('meta.sendStat') && self.get('meta.fotoramaReady')) {
                    if (!self.get('meta.sendStat') && (RG.config.env !== 'dev') ) {
                        self.sendStat();

                        RG.logger.log('gallery stat sended, url: https://foto.rg.ru/photos/' + self.get('gall') + '/index.html');
                    } else {
                        RG.logger.log('photorep stat not send');
                    }

                })
                .data('fotorama');

            self.set('meta.fotoramaHandler', fotoramaHandler);
        },

        // Настроить галерею
        setupGallery() {

            var options = {},
                fotorama = this.get('meta.fotoramaHandler');

            // Определяем, если это не touch устройство
            if (
                ('ontouchstart' in window) ||
                (window.DocumentTouch && document instanceof DocumentTouch)
                ) {

                options.arrows = false;
            }

            if (!!fotorama) {
                fotorama.setOptions(options);
            }

        },

        // Октрыть фулскрин
        openFullscreen() {

            // Включаем внутреннее состояние о полном экране
            this.set('meta.fullscreen', true);

            // Пересчитываем размер галереи
            this.reinitGallery();

            // Включаем оверлей
            RG.events.publish('overlay.show');

            // Отправляем статистику, если не отправлена
            if (!this.get('meta.sendStat') && (RG.config.env !== 'dev')) {
                this.sendStat();
            } else {
                RG.logger.log('photorep stat not send');
            }

        },

        // Закрыть фулскрин
        closeFullscreen() {

            // Выключаем внутреннее состояние о полном экране
            this.set('meta.fullscreen', false);

            // Пересчитываем размер галереи
            this.reinitGallery();

            // Выключаем оверлей
            RG.events.publish('overlay.hide');

        },

        // Пересчет размеров галереи
        reinitGallery() {

            this.get('meta.fotoramaHandler')
                .resize();
        },

        // Отправить статистику
        sendStat() {

            var urlGall = 'https://foto.rg.ru/photos/' + this.get('gall') + '/index.html',
                urlArticle = location.href;

            RG.logger.info('send stat ' + urlGall + ', ' + urlArticle);
            //console.info('send stat ' + urlGall + ', ' + urlArticle);

            //Google
            if (!!window.ga) {
                ga('send', 'pageview', urlGall);
            }

            //Yandex
            if (!!window.yaCounter22322746) {
                yaCounter22322746.hit(urlGall, null, urlArticle);
            }

            //Mail
            if (!!window._tmr) {
                _tmr.push({id: "11659", url: urlGall, referrer: urlArticle, type: "pageView", start: (new Date()).getTime()});
            }

            //Lifeinternet
            new Image().src = "//counter.yadro.ru/hit?t14.11;r"+escape(urlArticle)+((typeof(screen)=="undefined")?"":";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?screen.colorDepth:screen.pixelDepth))+";u"+escape(urlGall)+";"+Math.random();

            // Устанавливаем, чтобы больше не отправлять статистику
            this.set('meta.sendStat', true);

        },

        // Проверка на refferer
        checkReferer() {

            //http://foto.rg.ru/project/photos/add_ref.php?url='//rg.ru/ARTICLE_HREF'&photorep_id='ID'&&option_id='ID'&aticle_id='ID'

            var gallId = this.get('gall'),
                optionId = this.get('option'),
                articleId = RG.meta.getMaterial(),
                referers = this.get('meta.referers'),

                result = '',
                sendToReferer = true;

            // Проверяем,
            // если это не буревестник,
            // то можно отправлять
            if (articleId != 823780) {

                $.each(referers, function(index, el) {

                    if (el.article_id == articleId) {
                        sendToReferer = false;
                    }

                });

                if (sendToReferer) {

                    result = `//foto.rg.ru/project/photos/add_ref.php?url=//${location.host}${location.pathname}&photorep_id=${gallId}&option_id=${optionId}&article_id=${articleId}&callback=?`;

                    $.getJSON(result, function(data){
                        RG.logger.log(`referrer sended, result ${data}`);
                    });

                    RG.logger.log(`send to refferer ${result}`);
                }

            } else {
                RG.logger.log('it is burevestnik');
            }

        },

    });

module.exports = Gallery;