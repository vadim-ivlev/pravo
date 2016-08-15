/**
 * Created by esolovyev on 29.02.2016.
 */

var 
    
    // Инструменты, расширяющие стандартный модуль
    FormTools = require('../../b-form/scripts/FormTools'),

    // Шаблон
    template = require('../b-checkbox.ihtml'),

    Checkbox = Ractive.extend(

        FormTools,

        {
            
            template,

            data() {
                return {
                    name: 'checkbox',
                    highlight: true,
                    highlighted: false,
                }
            },

            oninit() {

                let form = this.get('form'),
                    name = this.get('name');

                RG.events.subscribe(`form.${form}.set.${name}`, (topic, value) => {

                    this.set('value', value);
                });

                this.on('toggle', (e) => {

                    this.toggle('value')

                    RG.events.publish(`form.${form}.update.${name}`, this.get('value'));

                    e.original.preventDefault();
                });
            },

            reset() {

                this.set('value', false);
            },

            check() {
                
                // Если поле обязательное, проверяем
                // выбрано ли оно
                if(this.get('required')) {
                    return this.get('value');
                }

                return true;
            }

        }
    );

module.exports = Checkbox;
