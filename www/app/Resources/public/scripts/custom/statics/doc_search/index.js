
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/
/**
 * Подключения модуля
 */
RG.Search = RG.Search || require('../../../../blocks/main/b-search/scripts/main');

$(function() {
    
    // Передаем аргумент true, значит это поиск по документам.
    RG.Search.init(true);

    // Запускаем иниицализацию фильтров, подгружаем шаблоны и т.п.
    RG.Search.run(); 

    // Запускаем парсер компонента фильтра
    RG.parser.render('rg-search-filters');

    // Запускаем парсер компонента информационного блока поиска
    RG.parser.render('rg-search-info');

    // Запрашиваем получение данных
    RG.events.publish('search.get.result');

    /*RG.parser.render('rg-mailing');

    if(RG.session.isAuthorized()) {

        RG.events.publish('subscribe.doc.check');
    }

    RG.BlocksShifter.setCallback([

        // Обратный вызов в момент включения блока
        // Добавляем колонки
        {
            blockId: 'rgb_components_mailing_doc',
            screenType: 'mobile tablet tabletLandscape',
            callback: ($target, $active) => {

                RG.parser.init();
                RG.parser.render('rg-mailing');

                if(RG.session.isAuthorized()) {

                    RG.events.publish('subscribe.doc.check');
                }

            }
        }
    ]);*/

});