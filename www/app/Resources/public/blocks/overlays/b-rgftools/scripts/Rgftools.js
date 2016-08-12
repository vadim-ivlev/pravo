/*
 * Модуль инструментов для разработки фронта
 *
 */

var

    Meta = require('../../../../scripts/modules/Meta'),

    template = require('../b-rgftools.ihtml'),

    Component = Ractive.extend({

        template,

        data() {
            return {
                tools: [
                    {
                        name: 'Метатеги',
                        content: null,
                        alias: 'metatags'
                    }/*,
                    {
                        name: 'Таргетирование страницы',
                        alias: 'adfoxParam'
                    }*/
                ],
                /*active: {
                    alias: null,
                    content: null
                },*/
                toolsShow: false
            }
        },

        oninit() {},

        onrender() {

            var self = this;

            self.on({
                'toolTrigger': self.toolTrigger,
                //'selectTool': self.selectTool
            });

            /*RG.events.registerList({
                'Rgftools.use': self.toolsUse.bind(self)
            });*/

            try {

                self.get('tools').forEach((tool, i) => {

                    // Запускаем метод инструмента
                    if ($.isFunction(self[`${tool.alias}Run`])) {
                        this[`${tool.alias}Run`](i);
                    }

                });

            } catch (err) {
                RG.logger.error(err);
            }

            // Снимаем активность, по клику в любое место
            //self.deactiveBehavoir();

        },

        // Показать панель
        toolTrigger(e) {

            this.set('toolsShow', !this.get('toolsShow'));

            return false;
        },

        // Выбор инструмента
        /*selectTool(e) {

            RG.events.publish('Rgftools.use', this.get(e.keypath));
        },*/

        // Выбираем инструмент
        /*toolsUse(topic, tool) {

            var alias = tool.alias,
                activeAlias = this.get('active.alias'),
                callb = null;

            // Если выбираем новый инструмент, то открываем его
            // иначе, закрываем
            if (alias !== activeAlias) {

                // Включаем активный инструмент
                this.set('active.alias', alias);

                try {

                    // Запускаем метод инструмента
                    if ($.isFunction(this[`${alias}Run`])) {
                        this[`${alias}Run`](tool);
                    }

                } catch (err) {
                    RG.logger.error(err);
                }

            } else {
                this.toolClose();
            }

        },*/

        /*toolClose() {
            //this.set('active.alias', null);
            //this.set('active.content', null);

            this.toolTrigger();
        },*/

        // Показать метатеги страницы
        metatagsRun(toolItem) {

            var metaList = Meta.getAll('rg-data');

            metaList = metaList.map(meta => {
                return `<div class="b-rgftools__content-item">
                    <span class="b-rgftools__content-item-name">${meta.property}:</span>
                    <span class="b-rgftools__content-item-accent">${meta.content || '<span class="b-rgftools__content-item-null">null</span>'}</span>
                </div>`;
            });

            this.set(`tools.${toolItem}.content`, metaList.join(''));

        },

        /*adfoxParamRun(param) {

            this.set('active.content', 'adfoxParamRun');

        },*/

        /*deactiveBehavoir() {

            var self = this;

            $(document).on('click', function(e) {

                if (!!self.get('toolsShow')) {

                    // Если клик был сделан не по элементу или дочерним
                    if($('.b-rgftools__body').has(event.target).length === 0) {
                        self.toolClose();
                    }

                }

            });

        }*/

    });

module.exports = Component;