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
    // В @param передается строка готового запроса
    get = (param) => {
        return $.get(`${globalPath.fascicles}/${param}.json`);
    };

// Экспортируем
module.exports = {
    get,
};