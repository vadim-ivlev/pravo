/*
 * Модуль получения данных
 *
 */

$.ajaxSetup({
    xhrFields: {
        // for CORS
        withCredentials: true
    }
});

var

    // Глобальные пути
    globalPath = require('../../../../../scripts/config').paths,

    // Получить данные
    // @param - строка,
    // Необязательный регмион с ID
    // И обязательная дата, за которую получаем материалы
    // Пример "region-ID/2014-11-26.json"
    getData = (param) => {
        return $.get(`${globalPath.supersp}/${param}.json`);
    },

    // Получить шаблон статей b-main
    getMaterialsTmpl = () => {
        return $.get(`${globalPath.tmpl.bNews}`);
    };

// Экспортируем
module.exports = {
    getData,
    getMaterialsTmpl
};