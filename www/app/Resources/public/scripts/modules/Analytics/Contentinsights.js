/*
 * Модуль Google аналитики
 *
 */

var
    /*
     * Свойства
     * 
     */
    
    // Префикс событий
    _modulePrefix = 'Contentinsights',

    // Наш ID сайта
    _moduleId = '1339',

    // Инициализация библиотеки
    loadLib = () => {

        // Взято отсюда contentinsights.com
        // личный кабинет
        (function (d, s) {
        var sf = d.createElement(s); sf.type = 'text/javascript'; sf.async = true;
        sf.src = (('https:' == d.location.protocol) ? 'https://d7d3cf2e81d293050033-3dfc0615b0fd7b49143049256703bfce.ssl.cf1.rackcdn.com' : 'http://t.contentinsights.com')+'/stf.js';
        var t = d.getElementsByTagName(s)[0]; t.parentNode.insertBefore(sf, t);
        })(document, 'script');

    },

    // Настраиваем
    setup = () => {

        var _ain = {
                id: _moduleId,
                url: RG.meta.getMaterialUrl() || '',
                postid: RG.meta.getMaterial() || '',
                title: RG.meta.getMaterialTitle() || '',
                pubdate: RG.meta.getPubTime() || '',
                authors: RG.meta.getAuthorName() || '',
                sections: RG.meta.getSectionName() || '',
                //tags: "news, politic, white house",
                //comments: "24"
        };

        // Как глобальная переменная
        window._ain = _ain;

        RG.logger.log(_ain);

    },

    // Инициализация
    init = () => {
        RG.logger.log('Contentinsights init');

        RG.events.subscribe(`${_modulePrefix}.run`, run);
    },

    // Запуск
    run = () => {

        RG.logger.log('Contentinsights run');

        setup();
        loadLib();
    };

module.exports = {
    init,
    _modulePrefix
}