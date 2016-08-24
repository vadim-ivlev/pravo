/*
 * Левый сайдбар
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bSidebarLeft",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
														
							categoriesSidebar: RGB('categories:sidebar, tablet tabletLandscape desktop desktopFull:active'), // меню рубрик в сайдбаре

							adsSidebarRight: RGB('ads:sidebar-right, tablet tabletLandscape'), // рекламный баннер

							// feed: RGB('projects.juristical.feed:offers, tablet tabletLandscape desktop desktopFull:active'), // предложение услуг

							// topJurist: RGB('projects.juristical.top-jurist, tablet tabletLandscape desktop desktopFull:active'), // лучшие за неделю

							questionsLatest: RGB('questions:latest', '#questions_latest__length'), // Последние вопросы

							yandexDirect: RGB('yadirect:sidebar-left'), // Яндекс-директ

							juristsFeed: RGB('jurists:feed, tablet tabletLandscape desktop desktopFull:active'), // лента юристов, предлагающих услуги (в сайдбаре)

							juristsTop: RGB('jurists:top', '#jurist_top') // список лучших юристов (в сайдбаре)

						},
						
						sortBlocks: {

							// 'default': "categoriesSidebar adsSidebarRight juristsFeed juristsTop yandexDirect",

							index: "categoriesSidebar adsSidebarRight juristsFeed juristsTop yandexDirect",

							rubric_questions: "categoriesSidebar adsSidebarRight juristsFeed juristsTop yandexDirect",

							tag_questions: "adsSidebarRight juristsFeed juristsTop yandexDirect",

							answer: "categoriesSidebar questionsLatest adsSidebarRight yandexDirect",

							ask: "questionsLatest adsSidebarRight",

							rules: "juristsFeed",

							users: "juristsFeed juristsTop",

							rubrics: "juristsFeed",

							rubric_tags: "juristsFeed",
							
							lawer: "juristsFeed questionsLatest",

							partners: "juristsFeed"
						}
					}
				}
			]
		}
	
	}

};