/*
 * Модуль работы табов выбора супершпигелей
 *
 */

var

    template = require('../datePanel.ihtml'),

    Calendar = require('../../../crosslayouts/b-custom-datepicker/scripts/main'),

    // Определяем элемент
    Module = Ractive.extend({

        el: 'datePanel',

        template,

        data: () => {
            return {

                // Данные для табов
                superspTabs: {
                    selected: 1,
                    items: [
                        {
                            title: `Сегодня <span class="b-date-panel-spiegel__date">${moment().format('H:mm')}</span>`,
                            topic: 'Supersp.hide'
                        },
                        {
                            title: 'Вчера',
                            topic: 'Supersp.getData',
                            data: moment().add(-1, 'days').format('YYYY-MM-DD')
                            //data: '2015-01-22'
                        },
                        {
                            title: "<div class=\"b-custom-datepicker\"><input id=\"superspPicker\" class=\"b-custom-datepicker__input js-datepicker\" type=\"text\"></div>" 
                        }
                    ]
                }
            }
        },

        oninit() {},

        onrender() {

            var self = this,
                calendar = null;

            calendar = new Calendar({
                root: '.b-custom-datepicker',
                el: '#superspPicker',
                methods: {
                    open(_calendar) {
                        var tab = _calendar.$elMap.$root.closest('.b-tabs__item')[0];

                        // Публикуем событие выбора таба
                        RG.events.publish('tab.selected.set', tab);
                    },
                    select(_calendar, date) {

                        // Подгружаем выбранный выпуск
                        // Публикуя запрос на загрузку выпуска
                        RG.events.publish('Supersp.getData', date);
                    }
                }
            });

            RG.events.publish(`${calendar.getName()}.run`);

        }

    }),

    // Инициализация блока
    init = () => {

        // Инициализируем панель
        new Module();
    };

// Экспортируем
module.exports = {
    init
};