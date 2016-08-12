
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

/**
 * Подключение модуля конвертации списка в выпадающее меню
 */
RG.ListHeadToSelect = RG.ListHeadToSelect || require('./modules/ListHeadToSelect');

$(function() {

	// Запускаем переключалку рубрик
	try {
		rubricsToggler();
	} catch(err) {
		RG.logger.error(`${err} ошибка функции rubricsToggler`);
	}

	RG.events.subscribe('rubricator.rubric.show', (topic, data) => {

        let rubricsSectionClass = 'b-rubricator-rubrics__item_sect',
            rubricsSectionShowClass = 'b-rubricator-rubrics__item_show';

        RG.logger.info(topic);
        RG.logger.trace('.' + rubricsSectionClass + data['data-rubid']);

        // Активируем выбранную рубрику
        $('.' + rubricsSectionShowClass).removeClass(rubricsSectionShowClass);
        $('.' + rubricsSectionClass + data['data-rubid']).addClass(rubricsSectionShowClass);
    });

    new RG.ListHeadToSelect('.b-rubricator-menu__link', '.b-rubricator-menu', '.b-rubricator-menu__list');
});

/*
 * Переключалка рубрик
 *
 */

function rubricsToggler() {

	var $rubricsItem = $('.b-rubricator-menu__item'),
		 rubricsActiveClass = 'b-rubricator-menu__item_active',
		 rubricsSectionClass = 'b-rubricator-rubrics__item_sect',
		 rubricsSectionShowClass = 'b-rubricator-rubrics__item_show';

	$rubricsItem.on('click', function(e){

		var $el = $(this),
			 rubId = null;

		// Получаем id выбираемой рубрики
		rubId = $el.attr('data-rubId');

		// Удаляем активный класс у предыдущего выбранного
		$('.' + rubricsActiveClass).removeClass(rubricsActiveClass);
		// Удаляем активный класс у секции предыдущей рубрики
		$('.' + rubricsSectionShowClass).removeClass(rubricsSectionShowClass);

		// Активируем выбранное меню
		$el.addClass(rubricsActiveClass);
		// Активируем выбранную рубрику
		$('.' + rubricsSectionClass + rubId).addClass(rubricsSectionShowClass);

	});

}