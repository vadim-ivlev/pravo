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

							adsSidebarRight: RGB('projects.juristical.ads:sidebar-right, desktop desktopFull:active'), // баннер - правый сайдбар

							bibliotechkaAdvert: RGB('projects.juristical.bibliotechka-advert, desktop desktopFull:active'), // блок библиотечки

							yandexDirect: RGB('projects.juristical.yadirect:sidebar-right') // Яндекс-директ
							
						},

						sortBlocks: {

							'default': "adsSidebarRight bibliotechkaAdvert yandexDirect",

							index: "adsSidebarRight bibliotechkaAdvert yandexDirect",

							rubric_questions: "adsSidebarRight yandexDirect",

							tag_questions: "adsSidebarRight yandexDirect",

							answer: "adsSidebarRight yandexDirect",

							ask: "adsSidebarRight yandexDirect",
							
							rules: "adsSidebarRight",

							users: "adsSidebarRight yandexDirect",

							rubrics: "adsSidebarRight yandexDirect",

							rubric_tags: "adsSidebarRight yandexDirect",

							info: "adsSidebarRight yandexDirect",

							partners: "adsSidebarRight"

						}

					}
				}
			]
		}
	
	}

};