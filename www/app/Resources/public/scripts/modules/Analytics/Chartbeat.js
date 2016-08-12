/*
 * Модуль аналитики Чартбита
 *
 */

var
    /*
     * Свойства
     * 
     */
    
    // Префикс событий
    _modulePrefix = 'Chartbeat',

    // Получить Тип материала
    getSections = () => {
        return $('meta[property="section:name"]').attr('content');
    },

    // Получить авторов
    getAuthors = () => {
        return $('meta[property="author:name"]').attr('content');
    },

    // Загрузка библиотеки
    loadLib = () => {

        // Загружаем библиотеку
        $.getScript('//static.chartbeat.com/js/chartbeat.js')
            .done(function(){

                // время окончания
                window._sf_endpt = (new Date()).getTime();

            })
            .fail(function(){
                RG.logger.error('chartbeat not loaded');
            });

    },

    // Начальные настройки
    // до открывающего body
    setupStart = () => {
        // время начала 
        window._sf_startpt = (new Date()).getTime();
    },

    // Завершающие настройки
    // перед закрывающем body
    setupEnd = () => {

        // Сторим функции, которые навешаны на onload уже
        var onloadStore = window.onload;

        window._sf_async_config = window._sf_async_config || {};

        // Настраиваем
        _sf_async_config.uid = 52857;
        _sf_async_config.domain = 'rg.ru';
        _sf_async_config.useCanonical = true;

        // Тип материала
        _sf_async_config.sections = getSections();

        // Автор
        _sf_async_config.authors = getAuthors();                        

        // Получаем библиотеку
        // после того, как вся страница будет полностью загружена
        // Если функций на onload  нет, то просто запускаем загрузку библиотеки
        if (typeof window.onload != 'function') {

            window.onload = loadLib;
        } else {

            // Если есть, то вызываем ранее навешанные функции, потом чартбит
            window.onload = function() { 
                //oldonload();
                loadLib();
            };
        }

    },

    // Инициализация
    init = () => {
        RG.events.subscribe(`${_modulePrefix}.run`, run);
    },

    // Запуск
    run = () => {
        setupStart();
        setupEnd();
    };

module.exports = {
    _modulePrefix,
    init
}  