/*
 * Модуль получения данных
 *
 */

$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});

var

    // Глобальные пути
    globalPath = require('../../../../../scripts/config').paths,

    // Получить данные
    // @param - строка,
    // содержащая Идентефикатор выпуска и,
    // если надо Дату выпуска (ISO8601) и номер полосы
    // Пример "rg-centr/20150116/2"
    getFascicle = (param) => {
        return $.get(`${globalPath.fresh}/${param}/gazeta.json`);
    },

    // Получить шаблон статей b-main
    getMaterialsTmpl = () => {
        return $.get(`${globalPath.tmpl.bNews_broadsides}`);
    };

// Экспортируем
module.exports = {
    getFascicle,
    getMaterialsTmpl
};