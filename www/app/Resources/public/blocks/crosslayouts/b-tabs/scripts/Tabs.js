/**
 * Created by esolovyev on 10.12.2015.
 */

var template = require('../tabs.ihtml'), // подкючение шаблона

    Tabs = Ractive.extend({

        template,

        data: () => {
            return {
                selected: 0,
                items: [],
            }
        },

        oninit() {

            RG.logger.debug('Tabs');
        },

        onrender() {

            /**
             * Получение позиции выбраного элемента
             */
            var index = this.get('selected'),
                tab = this.findAll('.b-tabs__item')[index],

                selectHandler = _.debounce((event, item) => {

                    let items = this.get('items'),
                        index = _.findIndex(items, item),
                        topic = item.topic || 'tab.click.${index}',
                        data = item.data || null;

                    this.set('selected', index);

                    this.setPosition(event.node);

                    /**
                     * Вызов глобального события
                     */
                    RG.events.publish(topic, data);
                }, 500);

            /**
             * Установка ползунка на начальную позицию
             */
            this.setPosition(tab);

            /**
             * Инициализация нажатия на элемент
             */

            this.on('select', selectHandler);

            RG.events.subscribe('tab.selected.set', (topic, element) => {

                RG.logger.info(topic);

                this.setPosition(element);
            });
        },

        /**
         * Установка позиции ползунка
         */
        setPosition(element) {

            if(element) {

                var $element = $(element),
                    left = $element.position().left,
                    width = $element.width();

                this.set('left', left);
                this.set('width', width);
            }
        }
    });

module.exports = Tabs;