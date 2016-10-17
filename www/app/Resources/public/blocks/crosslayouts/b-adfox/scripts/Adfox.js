/*
 * Компонент adfox баннера
 *
 * Свойства компонента: uri - url ссылка инициализации баннера
 *
 */

var

    _getId = () => {
        return Math.random().toString(36).substring(7);
    },

    // подкючение шаблона
    template = `{{#banner.content}}<div id="{{banner.id}}" class="b-ads b-adfox__item">{{{banner.content}}}</div>{{/banner.content}}`,

    // Компонент
    Component = Ractive.extend({

        template,

        data() {
            return {

                // получаем из тега
                uri: null,
                appear: null,
                screentype: null,

                // Активный баннер
                banner: {
                    id: null,
                    content: null
                }

            }
        },

        oninit() {
            RG.logger.debug('Adfox component init');
        },

        onrender() {

            var self = this,
                screentype = self.get('screentype'),
                screentypeList = null;

            // Если баннер должен показываться на определенном типе экрана
            if (!!screentype) {

                screentypeList = screentype.split(' ');

                // Получаем информацию о экране
                RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.check`, (topic) => {

                    // Проходим по всем типам экрана и проверяем, можем ли мы загрузить баннер
                    self.checkForScreenType(screentypeList, RG.ScreenViewer.getScreenInfo().type, self.prepareRun.bind(self));

                    // Если информация обновилась
                    RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, (topic, screenInfo) => {

                        // Проходим по всем типам экрана и проверяем, можем ли мы загрузить баннер
                        self.checkForScreenType(screentypeList, screenInfo.type, self.prepareRun.bind(self));
                    });

                });

            } else {

                // Подготовка баннера
                self.prepareRun();

            }

        },

        /*
         * Методы
         *
         */

        // Устанавливаем поведение по показу
        setAppear(id, adfox) {

            var self = this,
                appear = null;

            /*$(window).load(function(){

                appear = new Waypoint({
                    element: $(`#${id}`)[0],
                    handler: function() {

                        // Загружаем баннер
                        self.loadBanner(adfox);

                        RG.logger.log(`banner #${id}, appeared`);

                        appear.disable();
                    },
                    offset: 'bottom-in-view'
                });

            });*/

        },

        // Подготовка uri
        prepareUri() {

            var uri = this.get('uri'),
                adsUri = RG.meta.getPlatform();

            uri = `${uri}&amp;dl=${adsUri}`;

            this.set('uri', uri);
        },

        // Инициализация баннера
        initBanner(uri, appear) {

            var tgNS = window.ADFOX.RELOAD_CODE,

                id = _getId(),
                initData = null,

                adfoxParam = null;

            // Получаем баннер
            // через метод AdFox - tgNS
            initData = tgNS.initBanner(id, uri);

            // Добавляем id
            this.set('banner.id', id);

            // Вставляем в элемент
            // контент баннера
            this.set('banner.content', initData.html);

            // Формуируем объект адфокса
            // для загрузки баннера
            adfoxParam = {
                    tgNS,
                    initData,
                    uri
                };

            RG.logger.log(adfoxParam);

            // Проверяем на догрузку по скроллу
            if (!appear) {

                // Загружаем баннер
                //tgNS.loadBanner(initData.pr1, uri, initData.sessionId);

                this.loadBanner(adfoxParam);

            } else {

                // Инициализируем догрузку по скроллу
                this.setAppear(id, adfoxParam);
            }

        },

        // Загрузка баннера
        loadBanner(adfox) {

            // Загружаем баннер
            adfox.tgNS.loadBanner(adfox.initData.pr1, adfox.uri, adfox.initData.sessionId);
        },

        // Проверка, подходит ли тип экрана
        checkForScreenType(screentypeList, globalScreenType, callb) {

            var self = this;

            // Проходим по всем типам экрана и проверяем, можем ли мы загрузить баннер
            $.each(screentypeList, function(i, item){

                // Инициализируем компонент
                if (item === globalScreenType) {

                    // Если баннера еще нет
                    if (!self.get('banner.content')) {

                        // Запускаем обратный вызов
                        callb();

                    }
                }

            });

        },

        // Предварительная подготовка перед инициализацией баннера
        prepareRun() {

            // Подготовка uri для баннера
            this.prepareUri();

            // Инициализация баннера
            this.initBanner(this.get('uri'), this.get('appear'));
        }

    });

// Экспортируем компонент
module.exports = Component;