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
    template = `{{#banner.content}}<div id="{{banner.id}}" class="b-adfox__item">{{{banner.content}}}</div>{{/banner.content}}`,

    // Компонент
    Component = Ractive.extend({

        template,

        data() {
            return {

                // получаем из тега
                uri: null,
                appear: null,

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

            var self = this;

            // Получаем информацию о экране
            /*RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.check`, (topic) => {

                self.set('screenInfo', RG.ScreenViewer.getScreenInfo());

                // Инициализируем компонент

                // Если информация обновилась
                RG.events.subscribe(`${RG.ScreenViewer._modulePrefix}.update`, (topic, screenInfo) => {

                    self.set('screenInfo', RG.ScreenViewer.getScreenInfo());

                    // Инициализируем компонент
                });

            });*/


            // Инициализация баннера
            self.initBanner(self.get('uri'), self.get('appear'));
        },

        /*
         * Методы
         *
         */

        // Устанавливаем поведение по показу
        setAppear(id, adfox) {

            // Загружаем после того, как появился
            $(`#${id}`).appear();

            // Подписываем событие
            $(`#${id}`).one('appear', function(e, $all_appeared_elements) {

                // Загружаем баннер
                this.loadBanner(adfox);
            });

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
        }

    });

// Экспортируем компонент
module.exports = Component;