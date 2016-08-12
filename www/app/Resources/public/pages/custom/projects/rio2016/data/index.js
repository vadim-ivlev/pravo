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

		// 		// RGInclude('project', 'styles'), // стили

		// 		// RGInclude('material', 'styles'), // стили

		// 		RGInclude('custom/projects/rio2016/index', 'styles'),

		// 		// RGInclude('material', 'scripts'),

		// 		RGInclude('project', 'scripts'), // скрипты

		// 		RGInclude('custom/projects/rio2016/index', 'scripts')

		// 	]
		// },

		head: RGT('projects.head:rio2016'),

		// sidebarLeft: RGT('projects.sidebarLeft:rio2016'), // левый сайдбар

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар

		// sidebarLeft: {

		// 	blocks: [
		// 		RGB('projects.rio2016.sidebar-left')
		// 	]

		// },
		
		main: {

			name: "main",

			blocks: [

				//RGB('ads:top'), // баннер - верхняя перетяжка

				RGB('projects.rio2016.header:projects'), // шапка сайта, + элементы RGB info, menu, content

				RGB('projects.rio2016.branding-head:projects'), // брендированный баннер

				RGB('projects.rio2016.list-head:projects'), // заголовок страницы

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

							RGB('projects.rio2016.news'), // шпигели

							RGB('projects.rio2016.calendar:static, mobile tablet tabletLandscape'),

							RGB('projects.rio2016.team-standings, mobile tablet tabletLandscape'),

							RGB('projects.rio2016.cor-punkt, mobile tablet tabletLandscape'),
							
							RGB('projects.rio2016.media, mobile tablet tabletLandscape'),

							RGB('projects.rio2016.list-wrapper:projects'), // тело страницы

							// RGB('projects.rio2016.news-rubric:feed, mobile tablet tabletLandscape'),
							

							//RGB('projects.rio2016.list-wrapper:projects') // тело страницы

						]

					}
				}

			]

		},

		//sidebarRight: RGT('projects.sidebarRight:rio2016'), // правый сайдбар

		sidebarRight: {

			blocks: [
				RGB('projects.rio2016.sidebar-right')
			]

		},
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "rio2016",
			id: "rio2016",
			type: "project"
		}
	}

};