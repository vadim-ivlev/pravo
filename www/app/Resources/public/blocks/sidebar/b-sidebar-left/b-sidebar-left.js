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

							categoriesSidebarActiveLink: RGB('categories:sidebar-active-link, tablet tabletLandscape desktop desktopFull:active'), // меню рубрик в сайдбаре с кликабельной выбранной рубрикой

							// adsSidebarRight: RGB('ads:sidebar-right, tablet tabletLandscape'), // рекламный баннер

							adfoxSidebarRight: RGB('adfox:pravo-sidebar, tablet tabletLandscape'), // рекламный баннер

							// feed: RGB('projects.juristical.feed:offers, tablet tabletLandscape desktop desktopFull:active'), // предложение услуг

							// topJurist: RGB('projects.juristical.top-jurist, tablet tabletLandscape desktop desktopFull:active'), // лучшие за неделю

							questionsLatest: RGB('questions:latest, teblet tabletLandscape desktop desktopFull:active', '#questions_latest__length'), // Последние вопросы

							yandexDirect: RGB('yadirect:sidebar-left'), // Яндекс-директ

							juristsFeed: RGB('jurists:feed, tablet tabletLandscape desktop desktopFull:active', '#jurists_feed'), // лента юристов, предлагающих услуги (в сайдбаре)

							juristsTop: RGB('jurists:top, tablet tabletLandscape desktop desktopFull:active') // список лучших юристов (в сайдбаре)

						},
						
						sortBlocks: {

							// 'default': "categoriesSidebar adsSidebarRight juristsFeed juristsTop yandexDirect",

							index: "categoriesSidebar adfoxSidebarRight juristsFeed juristsTop yandexDirect",

							rubric_questions: "categoriesSidebar adsSidebarRight juristsFeed juristsTop yandexDirect",

							tag_questions: "adsSidebarRight juristsFeed juristsTop yandexDirect",

							answer: "categoriesSidebarActiveLink questionsLatest adsSidebarRight yandexDirect",

							ask: "questionsLatest adsSidebarRight",

							rules: "juristsFeed",

							users: "juristsFeed juristsTop",

							rubrics: "juristsFeed",

							rubric_tags: "juristsFeed",
							
							lawer: "juristsFeed questionsLatest",

							partners: "juristsFeed",

							search: "categoriesSidebar adfoxSidebarRight juristsFeed juristsTop yandexDirect"
						}
					}
				}
			]
		}
	
	}

};