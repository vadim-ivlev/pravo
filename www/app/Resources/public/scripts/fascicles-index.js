
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/
 
/**
 * Подключения модуля
 */
RG.Fascicles = require('../blocks/main/b-fascicles-index/scripts/main');

$(function() {
    
    // Инициализируем блок
	RG.Fascicles.init();

	// Запускаем блок
    RG.Fascicles.run();

    var types = null,
        dates = null;

    RG.events.subscribe('Fascicles.loading.end', topic => {

        if(!types && !dates) {

            types = new RG.ListHeadToSelect('.b-fascicles__filters_type .b-rubricator-menu__link', '.b-fascicles__filters_type .b-rubricator-menu', '.b-fascicles__filters_type .b-rubricator-menu__list');
            dates = new RG.ListHeadToSelect('.b-fascicles__filters_date .b-rubricator-menu__link', '.b-fascicles__filters_date .b-rubricator-menu', '.b-fascicles__filters_date .b-rubricator-menu__list');
        }

        RG.events.publish(`${RG.ScreenViewer._modulePrefix}.update`, RG.ScreenViewer.getScreenInfo());
    });
});