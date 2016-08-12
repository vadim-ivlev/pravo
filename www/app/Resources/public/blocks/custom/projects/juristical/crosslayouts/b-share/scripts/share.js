/*
 * Блок шаринга через социальные сети (использует yandex share https://tech.yandex.ru/share/)
 *
 * Принцип работы:
 *  В js коде получаем компонент new Ractive.components.share
 *  В ractive шаблоне это компонент <share options={{ Опции модуля yandex share }} owner={{ Топик издателя }} />
 *  По топику издателя - owner мы вызываем событие обновления данных для шаринга
 *
 */

module.exports = Ractive.extend({

	// Шаблон
	template: `<div class="b-share__body {{ classes }}">
                    {{#if content }}<div class="b-share__content b-share__item">{{{content}}}</div>{{/if}}
                    <div class="b-share_ya-share b-share__item" decorator="yandexShare"></div>
                </div>`,

	decorators: {
		yandexShare(node) {

            var
                // Блок яндекса
                Ya = window.Ya || null,
                
                // Алиас на модуль
                share = null,

                // Стандартные настройки модуля
                options = {
                    theme: {
                        services: 'facebook,twitter,vkontakte,odnoklassniki,gplus',
                        lang: 'ru',
                        size: 's'
                    }
                };

            // Устанавливаем опции
            options = $.extend(true, {}, options, this.get('options'));

            // Инициализируем шаринг
            if (!!Ya && !!Ya.share2) {
                share = Ya.share2(node, options);
            }

            // Сохраняем в данные
            this.set('share', share);

            return {
                teardown: () => {
                    $(node).destroy();
                }
            };

        }
	},

	// Данные
    data: () => {
    	return {

            // Топик подписчика, от которого
            // получаем данные для шеринга
            owner: null,

            // Настройки yashare
            options: null,

            // Кастомный текст в блоке
            // может быть и с тегами
            content: null,

            // Модификаторы модуля
            classes: 'b-share_horizontal'
    	}
    },

    /*
     * Методы
     *
     */

    oninit() {},

    onrender() {

        RG.events.subscribe(this.get('owner'), (topic, data) => {

            if (!!data) {

                try {

                    // ОБновляем данные для шаринга
                    this.get('share').updateContent({
                        //url: data.url.replace('beta', 'www') || '',
                        url: data.url || '',
                        title: data.title || '',
                        description: data.description || '',
                        image: data.image || ''
                    });

                } catch(error) {

                    RG.logger.error('Share не может обновить данные');
                    RG.logger.error(error);
                }
            }

        });
    }

});