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
    
                        RG.logger.trace(this.get('selectedOption'));
    
                        if(item.href && item.href !== '#') {
    
                            document.location.href = item.href;
                        } else if(item.topic) {
    
                            RG.events.publish(item.topic, item);
                        } else {
    
                            RG.events.publish(`form.${form}.update.${name}`, item);
                        }
    
                        this.set('value', item);
    
                        event.original.preventDefault();
                    }
                });
                
                $.ajax({
                    url: 'https://front.rg.ru/jurists/ask/json/',
                    success: function(data) {
                        var itemsDefault = self.get('items'),
                            itemsNew = data.rubrics,
                            itemsList = null;

                        itemsList = itemsDefault.concat(itemsNew);

                        self.set('items', itemsList);
                        console.log(data.rubrics);
                    },
                    error: function(data) {
                        console.log(data);
                    }
                });
    
                /**
                 * Глобальные события
                 */
                RG.events.registerList({
    
                    'test': topic => {
    
                    }
                });
    
            },
    
            check() {
    
                if(this.get('required')) {
    
                    return this.get('value'); 
    
                }
    
                return true;
    
            }
        }

    );

module.exports = Select;