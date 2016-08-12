/*
 * Модуль работы табов выбора супершпигелей
 *
 */

var

    template = require('../datePanel.ihtml'),

    // Определяем элемент
    Module = Ractive.extend({

        el: 'datePanel',

        template,

        decorators: {

            'datepicker': function(node) {

                var self = this;

                $(node).datepicker({
                    dateFormat: 'yy-mm-dd',
                    constrainInput: true,
                    showOn: 'button',
                    buttonText: 'Select...',
                    onSelect: function(date) {

                        // Подгружаем выбранный выпуск
                        // Публикуя запрос на загрузку выпуска
                        RG.events.publish('Supersp.getData', date);

                    },
                    beforeShow: function(){
                        $('.ui-datepicker-trigger')
                            .addClass('is-active')
                            .addClass('animated')
                            .addClass('bounceIn');
                    },
                    onClose: function(){
                        $('.ui-datepicker-trigger')
                            .removeClass('is-active')
                            .removeClass('animated')
                            .removeClass('bounceIn');
                    }
                });

                return {
                    teardown() {
                        $(node).datepicker("destroy");
                    }
                };
            },

        },

        data: () => {
            return {

                // Данные для табов
                superspTabs: {
                    selected: 1,
                    items: [
                        {
                            title: `Сегодня <span class="b-date-panel__item-time">${moment().format('H:mm')}</span>`,
                            topic: 'Supersp.hide'
                        },
                        {
                            title: 'Вчера',
                            topic: 'Supersp.getData',
                            //data: moment().add(-1, 'days').format('DD-MM-YYYY')
                            data: '2015-01-22'
                        }
                    ]
                }
            }
        },

        oninit() {},

        onrender() {},

        /*
         * Методы
         *
         */

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