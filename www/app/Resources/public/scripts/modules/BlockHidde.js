/*
* BlockHidde
* Модуль формирует стили, для скрытия элементов
* с data-id (внутри указанного контейнера),
* совпадающих с data-id элементов сравниваемого контейнера
* 
*/

var

    /*
     * Свойства
     * 
     */
    
    // Префикс модуля
    _modulePrefix = 'BlockHidde',

    // Параметры модуля
    _param = null,

    // Стандартный класс контейнеров
    _patternData = 'data-id',

    // Конечные стили
    _styleOut = null,

    // Хранилище основных id
    _idList = [],

    /*
     * Методы
     * 
     */

    // Формирование таблицы стилей
    // Вид
    // .${destLabel} .${destTargetLabel}["data-id"=${id}]
    //      display: none
    //
    createStyle = () => {

        var prefix = `${_param.destLabel} ${_param.destTargetLabel}`,
            prefixAttrs = `[data-id="REPLACE_ID"]`,
            styleValue = "display: none",
            _idListLength = _idList.length,
            styleOut = [];

        // Формируем поисковой запрос стилей
        $.each(_idList, function(index, id){

            var prefixCustom = null;

            // Создаем префикс
            prefixCustom = `${prefix}${prefixAttrs.replace('REPLACE_ID', id)}`;

            // Если не последний элемент, запятую ставим
            if (index < (_idListLength - 1)) {
                prefixCustom += ',';
            }

            styleOut.push(prefixCustom);

        });

        // Формируем конечный результат 
        styleOut.push(`{ ${styleValue} }`);

        _styleOut = styleOut.join('');

    },

    // Добавляем стили в документ
    appendStyle = () => {

        // Добавляем перед родительским контейнеров
        _param.$src.append(`<style>${_styleOut}</style>`);
    },

    // Получение id
    storeId = () => {

        var $src = null,
            $srcTarget = null;

        // Находим родительский контейнер
        // и сохраняем его
        _param.$src = $src = $(_param.srcLabel);

        // Ищем элементы
        $srcTarget = $src.find(_param.srcTargetLabel);

        // Заполняем хранилище id
        $srcTarget.each(function(index, el){

            var id = $(el).attr('data-id');

            // Если есть id, то помещаем в хранилище
            if (!!id) {
                _idList.push(id);
            }

        });

    },

    /*
     * Инициализация подписчиков модуля
     * Передаем объект с параметрами
     *  srcLabel - контейнер в котором ищем элементы с id (строка)
     *  srcTargetLabel - элементы у которых собираем id (строка)
     *
     *  destLabel - контейнер элементы которого будем скрывать (строка)
     *  destTargetLabel - элементы, которые скрываем (строка)
     *
     */

    init = (userParam) => {

        _param = userParam;
        
        // Ищем id которые нужно скрывть, при повторе
        storeId();

        // Если id нашли, то запускаем дальше
        if (!!_idList.length) {

            // Формируем стили
            createStyle();

            // Вставляем стили в документ
            appendStyle();

        }

    };

// Экспортируем как модуль
// передаем метод установки собственных функций
// и метод инициализации
module.exports = {
    _modulePrefix,
    init
};