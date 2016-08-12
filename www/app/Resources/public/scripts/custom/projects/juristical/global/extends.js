/**
 * Подулючения директивы плавной анимации
 * https://github.com/ractivejs/ractive-transitions-fade
 */
Ractive.transitions.fade = require('ractive-transitions-fade');

/**
 * Дополнения для underscore
 * TODO Вынести в отдельный файл
 */
_.mixin({

    getQueryParam: (url, name) => {

        if (!url) url = window.location.href;
        url = url.toLowerCase(); // This is just to avoid case sensitiveness
        name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    remove: (obj, key) =>{
        delete obj[key];
        return obj;
    },
    // ### _.objMap
    // _.map for objects, keeps key/value associations
    objMap: (input, mapper, context) => {
        return _.reduce(input, function (obj, v, k) {
            obj[k] = mapper.call(context, v, k, input);
            return obj;
        }, {}, context);
    },
    // ### _.objFilter
    // _.filter for objects, keeps key/value associations
    // but only includes the properties that pass test().
    objFilter: (input, test, context) => {
        return _.reduce(input, function (obj, v, k) {
            if (test.call(context, v, k, input)) {
                obj[k] = v;
            }
            return obj;
        }, {}, context);
    },
    // ### _.objReject
    //
    // _.reject for objects, keeps key/value associations
    // but does not include the properties that pass test().
    objReject: (input, test, context) => {
        return _.reduce(input, function (obj, v, k) {
            if (!test.call(context, v, k, input)) {
                obj[k] = v;
            }
            return obj;
        }, {}, context);
    }
});

/*
 * Русификация дейтпикера(Агима)
 * TODO Вынести в отдельный файл
 */

if (!!jQuery.datepicker) {
    jQuery.datepicker.regional['ru'] = {
        closeText: '',
        prevText: 'Пред.',
        nextText: 'След.',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв.', 'Февр.', 'Март', 'Апрель', 'Май', 'Июнь',
            'Июль.', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'],
        dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesShort: ['Вск.', 'Пон.', 'Вт.', 'Ср.', 'Чт.', 'Пт.', 'Суб.'],
        dayNamesMin: ['вс','пн','вт','ср','чт','пт','сб'],
        weekHeader: 'Sem.',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };

    jQuery.datepicker.setDefaults(jQuery.datepicker.regional['ru']);
}