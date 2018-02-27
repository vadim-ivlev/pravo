/*
 * Модуль инициализации аналитики
 *
 */

var

    // Модуль Чартбита
    // Chartbeat = require('./Chartbeat'),

    // Модуль Google Аналитики
    Ga = require('./Ga'),

    // Модуль Contentinsights для аналитики статей
    Contentinsights = require('./Contentinsights'),

    // Инициализация модулей
    init = () => {
        // Chartbeat.init();
        Ga.init();
        Contentinsights.init();
    },

    // Запуск модулей
    run = () => {
        // RG.events.publish(`${Chartbeat._modulePrefix}.run`);
        RG.events.publish(`${Ga._modulePrefix}.run`);
    };

module.exports = {
    // Chartbeat,
    Ga,
    Contentinsights,
    init,
    run
}