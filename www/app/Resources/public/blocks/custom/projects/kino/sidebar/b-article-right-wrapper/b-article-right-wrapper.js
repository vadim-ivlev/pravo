/*
 * Правый сайдбар
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							adsSidebarRightTop: RGB('ads:sidebar-left'), // баннер - правый сайдбар первый экран
							
							adsSidebarRight: RGB('ads:sidebar-right'), // баннер - правый сайдбар
							
							advert: RGB('advert:index'), // внутренние анонсы материалов

							accentsEditor: RGB('accents:editor, desktop desktopFull:active'), // акценты "Выбор редакции"

							partners: RGB('ads:partners-sidebar-right'), // партнерки
							
							yandexDirect: RGB('ads:yandex-sidebar-right'), // Яндекс-директ
							
							tgbAnonse: RGB('ads:tgb-anonse-sidebar-right'), // ТГБ анонсирующие
							
							tgb: RGB('ads:tgb-sidebar-right'), // ТГБ
							
							turboroller: RGB('ads:turboroller-sidebar-right') // turboroller
							
						}						
					}
				}
			]
		}
	
	}

};