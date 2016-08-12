module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('projects.meta'), // метаинформация проектов
			
			]
			
		},

		// head: {
		// 	blocks: [

		// 		RGB('builder:project'), // builder

		// 		RGInclude('project', 'styles'), // стили

		// 		RGInclude('material', 'styles'), // стили

		// 		RGInclude('custom/projects/kot/index', 'styles'),

		// 		RGInclude('material', 'scripts'),

		// 		RGInclude('project', 'scripts'), // скрипты

		// 		RGInclude('custom/projects/kot/index', 'scripts')

		// 	]
		// },

		head: RGT('projects.head:kot'),

		// sidebarLeft: RGT('projects.sidebarLeft:kot'), // левый сайдбар

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар

		// sidebarLeft: {

		// 	blocks: [
		// 		RGB('projects.kot.sidebar-left')
		// 	]

		// },
		
		main: {

			name: "main",

			blocks: [

				//RGB('ads:top'), // баннер - верхняя перетяжка

				RGB('projects.kot.header:projects'), // шапка сайта, + элементы RGB info, menu, content

				RGB('projects.kot.branding-head:projects'), // брендированный баннер

				RGB('projects.kot.list-head:projects'), // заголовок страницы

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

							RGB('fascicle-widget, mobile tablet tabletLandscape'),

							RGB('projects.kot.news'), // шпигели

							RGB('projects.kot.list-wrapper:projects'), // тело страницы

							// RGB('projects.kot.news-rubric:feed, mobile tablet tabletLandscape'),
							

							//RGB('projects.kot.list-wrapper:projects') // тело страницы

						]

					}
				}

			]

		},

		//sidebarRight: RGT('projects.sidebarRight:kot'), // правый сайдбар

		sidebarRight: {

			blocks: [
				RGB('projects.kot.sidebar-right')
			]

		},
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "kot",
			id: "kot",
			type: "project"
		}
	}

};