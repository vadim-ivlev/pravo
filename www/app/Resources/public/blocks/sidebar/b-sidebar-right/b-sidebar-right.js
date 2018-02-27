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

							rightTgb: RGB('adfox:tgb-1'), // баннер ТГБ

							yandexDirect: RGB('yadirect:sidebar-right'), // Яндекс-директ

							similarQuestions: RGB('questions:similar, tablet tabletLandscape desktop desktopFull:active', '#similar_questions__length'), // Похожие вопросы
							
						},
						
						sortBlocks: {

							'default': "bibliotechkaAdvert yandexDirect",

							index: "adfoxSidebarRight bibliotechkaAdvert rightTgb yandexDirect",

							rubric_questions: "adfoxSidebarRight rightTgb yandexDirect",

							tag_questions: "adfoxSidebarRight rightTgb yandexDirect",

							answer: "adfoxSidebarRight rightTgb yandexDirect similarQuestions",

							ask: "adfoxSidebarRight rightTgb yandexDirect",
							
							rules: "adfoxSidebarRight",

							users: "adfoxSidebarRight rightTgb yandexDirect",

							tags: "adfoxSidebarRight rightTgb yandexDirect",

							rubric_tags: "adfoxSidebarRight rightTgb yandexDirect",

							lawer: "adfoxSidebarRight rightTgb yandexDirect",

							partners: "adfoxSidebarRight",

							search: "adfoxSidebarRight bibliotechkaAdvert rightTgb yandexDirect"

						}

					}
				}
			]
		}
	
	}

};