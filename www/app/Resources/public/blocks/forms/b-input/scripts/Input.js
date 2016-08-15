/**
 * Created by esolovyev on 25.02.2016.
 */

var 

    // Подключаем уведомления по инпутам
    InputNotification = require('../../b-input-notification/scripts/InputNotification'),

    // Инструменты, расширяющие стандартный модуль
    FormTools = require('../../b-form/scripts/FormTools'),

    // Шаблон
    template = require('../b-input.ihtml'),

    Input = Ractive.extend(

        FormTools,

        {

            template,

            components: {
                'input-notification': InputNotification
            },

            data() {

                return {
                    highlight: true,
                    highlighted: false,
                    type: 'text',
                    name: 'input'
                }

            },

            oninit() {

                let form = this.get('form'), // Элемент формы
                    name = this.get('name'), // Имя инпута
                    maxNum = this.get('maxlength.size'), // Максимальная длина инпута
                    maxlengthback = this.get('maxlength.backward');  // Обратный отсчёт

                RG.events.subscribe(`form.${form}.set.${name}`, (topic, value) => {

                    this.set('value', value);

                });

                // Слушатель изменения инпута
                this.observe('value', (nVal, oVal) => {

                    if(!_.isEmpty(nVal) && nVal !== oVal) {

                        RG.events.publish(`form.${form}.update.${name}`, nVal);
                    }
                });

                this.checkMaxLength(form, name);
            },

            check() {

                var pattern = this.get('pattern') || /.+/gi,
                    format = this.get('format'),
                    value = this.get('value');

                if (format) {

                    pattern = RG.config.formats[format];

                }

                if (this.get('required')) {

                    return pattern.test(value);

                }

                return true;

            }

        }
    );

module.exports = Input;
