
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

var Tolinker = require('../../../modules/Tolinker');

RG.FascicleWidget = RG.FascicleWidget || require('../../../../blocks/crosslayouts/b-fascicle-widget/scripts/main');

$(function() {

	RG.FascicleWidget.init();

	// Вешаем на элементы - ссылки, куда можно кликнуть для перехода
    new Tolinker({
    	targetEls: ['body', '.l-page', '.l-page__body'],
    	//link: 'http://www.kr-pro.ru/rassvet/?utm_source=Rg.ru&utm_medium=banner&utm_campaign=Rg.ru_partnership_pmef_rassvet_june'
    	link: '/kot/'
    });
    
});