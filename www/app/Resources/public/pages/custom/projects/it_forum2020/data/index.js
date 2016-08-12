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

		head: RGT('projects.head:it_forum2020'),

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: {

			name: "main",

			blocks: [

				RGB('ads:top'), // баннер - верхняя перетяжка

				RGB('projects.it_forum2020.header:projects'), // шапка сайта, + элементы RGB info, menu, content

				RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('projects.it_forum2020.list-head:project'), // заголовок страницы

				RGB('projects.it_forum2020.head-info'), // информация в шапке

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

							RGB('projects.it_forum2020.news'), // шпигели

							RGB('projects.it_forum2020.custom-content, mobile tabletLandscape tablet'), // Кастомный контент

							RGB('projects.it_forum2020.list-wrapper:projects') // тело страницы

						]

					}
				}

			]

		},

		sidebarRight: RGT('projects.sidebarRight:it_forum2020'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "it_forum2020",
			id: "it_forum2020",
			type: "project"
		}
	}

};