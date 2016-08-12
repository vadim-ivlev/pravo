module.exports = function(data){

	return {
		
		name: "bSidebarRight",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							mainToday: RGB('feed:main-today, desktop:active'), // главное сегодня

							media: RGB('statics.mgimo.media'), // медиа кастомное (фото/видео)

							tgb: RGB('ads:tgb-sidebar-right'), // ТГБ

							accentsProjects: RGB('accents:projects, desktop desktopFull:active'), // акценты "Спецпроекты"

							adsSidebarRight: RGB('ads:sidebar-right'), // баннер - правый сайдбар

							yandexDirect: RGB('ads:yandex-sidebar-right') // Яндекс-директ

						}

					}
				}
			]
		}
	
	}

};