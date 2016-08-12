/*
 * Компонент рг-тьюба
 *
 */

var

    // Шаблон
    template = require('../b-rgtube.ihtml'),

    // Компонент
    Component = Ractive.extend({

        template,

        data() {
            return {
                list: null, // Вес данные из тега
                active: {},
                activeIndex: null
            };
        },

        oninit() {
            this.set('active', this.get('list.2'));
            this.set('activeIndex', 2);
            RG.logger.debug('RG-tube component init');
        },

        onrender() {

            var self = this;
            this.on('videoTrigger', this.videoTrigger);

            RG.logger.log(self);

        },

        /*
         * Методы
         *
         */

        videoTrigger(obj, index) {
            /*RG.logger.log(index);
            RG.logger.log(obj);
            RG.logger.log(this.get(obj.keypath));*/
            this.set('active', this.get(obj.keypath));
            this.set('activeIndex', index);

            RG.logger.log(this.get('active'));
        }




    });

// Экспортируем
module.exports = Component;