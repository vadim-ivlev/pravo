/**
 * Created by esolovyev on 14.02.2016.
 */

var template = require('../b-select.ihtml'), // подкючение шаблона

    // Инструменты, расширяющие стандартный модуль
    FormTools = require('../../b-form/scripts/FormTools'),

    Select = Ractive.extend(

        FormTools,

        {
            template,        
            data() {
                return {
                    items: [],
                    selectedOption: null,
                    name: 'select',
                    isObject: true,
                    highlight: true,
                    highlighted: false
                };
            },    
            oninit() {
                RG.logger.debug('Select');

                var self = this,
                    items = this.get('items'),
                    isObject = null;

                if ($('rg-select').hasClass('js-ask-form-select')) {
                    $.ajax({
                        url: 'https://front.rg.ru/jurists/ask/json/',
                        success: function(data) {
                            var itemsDefault = self.get('items'),
                                itemsNew = data.rubrics,
                                itemsList = null;

                            itemsList = itemsDefault.concat(itemsNew);

                            self.set('items', itemsList);
                        },
                        error: function(data) {
                            console.log(data);
                        }
                    });
                }
            },

            onrender() {

                var items = this.get('items');
                //isObject = _.some(items, item => { return !item.value});

                // Проверяем, массив ли у нас списка или массив объектов    
                this.set('isObject', _.isObject(items[0]));

                /**
                 *
                 * Локалные события
                 */
                this.on({
                    'select': (event) => {    
                        var item = this.get('selectedOption'),
                            form = this.get('form'),
                            name = this.get('name');
    
                        // Если вообще есть выбранная опция
                        // или ее данные (не будет работать, если <option value="null")
                        if (item) {

                            // Если есть параметр ссылки,
                            // то переходим по ссылке с перезагрузкой страницы
                            if(item.href && item.href !== '#') {

                                document.location.href = item.href;

                            // Если есть кастомное событие
                            // вызываем его
                            } else if(item.topic) {

                                RG.events.publish(item.topic, item);

                            // Публикуем обновление данных формы
                            // вариант, когда просто селект в форме
                            } else {

                                RG.events.publish(`form.${form}.update.${name}`, item);

                            }

                            // Я не знаю что это, Ефим делал
                            // какая-то связка данных
                            // if (!!this.get('value')) {
                                this.set('value', item);
                            // }

                        }       
                        event.original.preventDefault();
                    }
                });
    
            },
    
            check() {

                console.log(this);
    
                if(this.get('required')) {    
                    return this.get('value'); 
                }
    
                return true;
    
            }
        }

    );

module.exports = Select;