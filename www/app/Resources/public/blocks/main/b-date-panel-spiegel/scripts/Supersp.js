/*
 * Модуль работы с супершпигелями
 *
 */

var

    // Определяем элемент
    Supersp = Ractive.extend({

        el: 'supersp',

        data: () => {
            return {
                processing: false,
                isHide: true,
                materials: null,
                info: null,
                dateFormat: RG.datetime.parseVmDate
            }
        },

        oninit() {

            var self = this;

            // Подписываемся на события
            RG.events.registerList({

                // Когда данные получены, обновляем их
                'Supersp.materials.loaded': self.updateData.bind(self),
                'Supersp.processing': self.processing.bind(self),
                'Supersp.hide': self.hide.bind(self)
            });

        },

        onrender() {},

        /*
         * Методы
         *
         */

        // Скрываем блок
        hide() {
            this.set('isHide', true);

            // Показываем блок шпигелей за сегодня
            RG.events.publish('Supersp.showDataToday');
        },

        // Обновление данных
        updateData(topic, data) {

            // Обновляем данные выпуска
            this.set('materials', data);

            // Показываем блок
            this.set('isHide', false);

            // Скрываем блок шпигелей за сегодня
            RG.events.publish('Supersp.hideDataToday');
        },

        // Элемент занят
        processing(topic, status) {

            // Устанавливаем состояние
            this.set('processing', status);

            // Устанавливаем класс загрузки для 
            // контейнера новостей
            if (status) {

                $('.b-content_index').addClass('is-loading');

            } else {

                $('.b-content_index').removeClass('is-loading');

            }
        }

    });

// Экспортируем как модуль
// передаем метод установки собственных функций
// и метод инициализации
module.exports = Supersp;