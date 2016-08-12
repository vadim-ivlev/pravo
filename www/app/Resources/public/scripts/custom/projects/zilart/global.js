
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

// Скрипты блока меню
RG.bMenu = RG.bMenu || require('../../../../blocks/custom/projects/zilart/header/b-menu/scripts/main');

// Переход по ссылке из галереи с thumbs'ами
RG.bGallery = RG.bGallery || require('../../../../blocks/custom/projects/zilart/main/b-gallery/scripts/main');


$(function() {

	// Инициализируем скрипты меню
	RG.bMenu.init();
	RG.bGallery.init();
});