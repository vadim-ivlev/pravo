module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('projects.meta'), // метаинформация проектов

				{
					opt: {
						tag: "meta",
						attrs: {
							name: "rg-data",
							property: "ads:hide", // скрываем всю рекламу кроме adfox
							content: "true"
						}
					}
				}
			
			]
			
		},

		head: RGT('projects.head:vreki2016'),

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: {

			name: "main",

			blocks: [

				RGB('ads:top'), // баннер - верхняя перетяжка

				RGB('projects.vreki2016.header:projects'), // шапка сайта, + элементы RGB info, menu, content

				RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('projects.vreki2016.list-head:project'), // заголовок страницы

				RGB('projects.vreki2016.head-info'), // информация в шапке

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

							RGB('projects.vreki2016.news'), // шпигели

							RGB('projects.vreki2016.custom-content, mobile tabletLandscape tablet'), // Кастомный контент

							RGB('projects.vreki2016.list-wrapper:projects') // тело страницы

						]

					}
				}

			]

		},

		sidebarRight: RGT('projects.sidebarRight:vreki2016'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "vreki2016",
			id: "vreki2016",
			type: "project"
		}
	}

};