/**
 * Created by esolovyev on 29.02.2016.
 */


var 

    // Подключаем уведомления по инпутам
    InputNotification = require('../../b-input-notification/scripts/InputNotification'),

    // Инструменты, расширяющие стандартный модуль
    FormTools = require('../../b-form/scripts/FormTools'),

    // Шаблон
    template = require('../b-textarea.ihtml'),

    Textarea = Ractive.extend(

        FormTools,

        {

            template,

            components: {
                'input-notification': InputNotification
            },

            data() {

                return {
                    name: 'textarea',
                    highlight: true,
                    highlighted: false
                }

            },

            oninit() {

                let form = this.get('form'),
                    name = this.get('name');

                RG.events.subscribe(`form.${form}.set.${name}`, (topic, value) => {

                    this.set('value', value);
                });

                this.observe('value', (nVal, oVal) => {

                    if(!_.isEmpty(nVal) && nVal !== oVal) {

                        RG.events.publish(`form.${form}.update.${name}`, nVal);
                    }
                });

                this.checkMaxLength(form, name);

            },

            check() {

                var value = this.get('value');

                if(this.get('required')) {
                    return !_.isEmpty(value);
                }

                return true;

            }
        }
    );

module.exports = Textarea;
