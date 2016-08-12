/*
 * Вспомогательные методы для
 * обработки формы и полей формы
 *
 */

 /*
  * Для подключения счетчика введенных символов,
  * к атрибутам в data надо добавить объект maxlength,
  * в котором есть 3 параметра: size (int, ограничитель вводимых символов),
  * show (boolean, показывать ли этот счётчик)
  * и backward (boolean, считать от 0 до maxlength или наоборот)
  *
  */

var FormTools = Ractive.extend({

    checkMaxLength(form, name) {

        let maxNum = this.get('maxlength.size'), // Максимальная длина инпута
            maxlengthback = this.get('maxlength.backward');  // Обратный отсчёт

        if (this.get('maxlength') && typeof this.get('maxlength.show') === 'undefined') {
            this.set('maxlength.show', true);
        }

        // Слушатель изменения инпута
        this.observe('value', (nVal, oVal) => {

            // Если есть значение, или оно не равно предыдущему значению
            if (!_.isEmpty(nVal) && nVal !== oVal) {

                // Если в обратку
                if (maxlengthback) {

                    // То вычитываем из максимального числа длину введённых символов
                    this.set('enteredValueLength', (maxNum - nVal.length));

                } else {

                    // Считываем длину введённых символов
                    this.set('enteredValueLength', nVal.length);

                }

                // Если длина введённых символов больше максмимального значения
                if (nVal.length >= maxNum) {

                    // выкидываем событие максимальной заполненности
                    RG.events.publish(`form.${form}.${name}.reached.max`, nVal);

                }

                // Выкидываем событие обновления инпута
                RG.events.publish(`form.${form}.update.${name}`, nVal);

            } else {

                // Если в обратку
                if (maxlengthback) {

                    // Выставляем 0, если значение инпута отсутсвует
                    this.set('enteredValueLength', maxNum);

                } else {

                    // Выставляем 0, если значение инпута отсутсвует
                    this.set('enteredValueLength', 0);

                }

                // Выкидываем событие отсутствия заполненности
                RG.events.publish(`form.${form}.${name}.reached.zero`, nVal);

            }
        });

    },
                                 
    // Валидация
    validate(show) {

        // Если првоерка пройдена
        if (this.check()) {

            // Убираем подсветку
            return !this.highlight(false);

        } else {

            if (show) {
                this.showMsg();
            }

            // Подсвечиваем
            return !this.highlight(true);

        }
    },

    // Сообщения об ошибках
    showMsg() {

        var errorMsg = null,
            error = this.get('error'),
            type = this.get('type');

        errorMsg = error ? error : RG.config.messages[`${type}NotValid`] || RG.config.messages['inputNotValid'];

        this.set('errorMsg', null);
        this.set('errorMsg', errorMsg);

    },

    // Подсветка ошибок
    highlight(highlight) {

        if (this.get('highlight')) {

            this.set('highlighted', highlight);

        }

        return highlight;

    },

    // Сброс заполнения формы
    resetField() {

        if (this.get('type') !== 'submit') {

            this.set('value', null);

        }

    }

});

module.exports = FormTools;