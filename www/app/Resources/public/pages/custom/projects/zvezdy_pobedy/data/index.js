module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('projects.meta'), // метаинформация проектов
			
			]
			
		},

		head: RGT('projects.head:zvezdy_pobedy'),

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: {

			name: "main",

			blocks: [

				//RGB('ads:top'), // баннер - верхняя перетяжка

				RGB('projects.zvezdy_pobedy.header:projects'), // шапка сайта, + элементы RGB info, menu, content

				//RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('projects.zvezdy_pobedy.branding-head:projects'), // брендированный баннер

				RGB('projects.zvezdy_pobedy.list-head:projects'), // заголовок страницы

				RGB('projects.zvezdy_pobedy.head-info'), // информация в шапке

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

							RGB('projects.zvezdy_pobedy.news'), // шпигели

							RGB('projects.zvezdy_pobedy.list-wrapper:projects') // тело страницы

						]

					}
				}

			]

		},

		sidebarRight: RGT('projects.sidebarRight:zvezdy_pobedy'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "zvezdy_pobedy",
			id: "zvezdy_pobedy",
			type: "project"
		}
	}

};