/*
 * Правый сайдбар
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bSidebarRight",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							// adsSidebarRight: RGB('ads:sidebar-right, desktop desktopFull:active'), // баннер - правый сайдбар

							adfoxSidebarRight: RGB('adfox:media-2, desktop desktopFull:active'), // баннер - правый сайдбар

							bibliotechkaAdvert: RGB('bibliotechka-advert, desktop desktopFull:active'), // блок библиотечки

							yandexDirect: RGB('yadirect:sidebar-right') // Яндекс-директ 
							
						},
						
						sortBlocks: {

							'default': "bibliotechkaAdvert yandexDirect",

							index: "adfoxSidebarRight bibliotechkaAdvert yandexDirect",

							rubric_questions: "adfoxSidebarRight yandexDirect",

							tag_questions: "adfoxSidebarRight yandexDirect",

							answer: "adfoxSidebarRight yandexDirect",

							ask: "adfoxSidebarRight yandexDirect",
							
							rules: "adfoxSidebarRight",

							users: "adfoxSidebarRight yandexDirect",

							tags: "adfoxSidebarRight yandexDirect",

							rubric_tags: "adfoxSidebarRight yandexDirect",

							lawer: "adfoxSidebarRight yandexDirect",

							partners: "adfoxSidebarRight",

							search: "adfoxSidebarRight bibliotechkaAdvert yandexDirect"

						}

					}
				}
			]
		}
	
	}

};