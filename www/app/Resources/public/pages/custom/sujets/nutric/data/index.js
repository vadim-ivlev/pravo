module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('sujets.meta'), // метаинформация проектов

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

		head: RGT('sujets.head:nutric'),

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: {

			name: "main",

			blocks: [

				RGB('ads:top'), // баннер - верхняя перетяжка

				RGB('sujets.nutric.header:sujets'), // шапка сайта, + элементы RGB info, menu, content

				RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('sujets.nutric.list-head:sujets'), // заголовок страницы

				RGB('sujets.nutric.head-info'), // информация в шапке

				/*
				 * Центральный блок
				 *
				 */

				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",

						attrs: {
							"class": "b-content b-content_sujets"
						},

						blocks: [

							RGB('sujets.nutric.news'), // шпигели

							RGB('sujets.nutric.custom-content, mobile tabletLandscape tablet'), // Кастомный контент

							RGB('sujets.nutric.list-wrapper:sujets') // тело страницы

						]

					}
				}

			]

		},

		sidebarRight: RGT('sujets.sidebarRight:nutric'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "nutric",
			type: "sujets"
		}
	}

};