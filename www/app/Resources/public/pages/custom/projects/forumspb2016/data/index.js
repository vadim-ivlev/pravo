module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('projects.meta'), // метаинформация проектов
			
			]
			
		},

		head: RGT('projects.head:forumspb2016'),

		//sidebarLeft: RGT('projects.sidebarLeft:forumspb2016'), // левый сайдбар

		sidebarLeft: {

			blocks: [
				RGB('projects.forumspb2016.sidebar-left')
			]

		},
		
		main: {

			name: "main",

			blocks: [

				//RGB('ads:top'), // баннер - верхняя перетяжка

				RGB('projects.forumspb2016.header:projects'), // шапка сайта, + элементы RGB info, menu, content

				RGB('projects.forumspb2016.branding-head:projects'), // брендированный баннер

				RGB('projects.forumspb2016.list-head:projects'), // заголовок страницы

				/*
				 * Центральный блок
				 *
				 */

				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",

						attrs: {
							"class": "b-content b-content_projects"
						},

						blocks: [

							RGB('projects.forumspb2016.news'), // шпигели

							RGB('projects.forumspb2016.news-rubric:feed, mobile tablet tabletLandscape')

							//RGB('projects.forumspb2016.list-wrapper:projects') // тело страницы

						]

					}
				}

			]

		},

		//sidebarRight: RGT('projects.sidebarRight:forumspb2016'), // правый сайдбар

		sidebarRight: {

			blocks: [
				RGB('projects.forumspb2016.sidebar-right')
			]

		},
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "forumspb2016",
			id: "forumspb2016",
			type: "project"
		}
	}

};