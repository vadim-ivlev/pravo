module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('sujets.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('sujets.head:9may'), // + шапка

		sidebarLeft: RGT('sujets.sidebarLeft:9may'), // левый сайдбар
		
		//main: RGT('sujets.main:9may'), // основной блок контента

		main:  {

			name: "main",

			blocks: [

				//RGB('ads:top'), // баннер - верхняя перетяжка
			
				RGB('sujets.9may.header:sujets'), // шапка сайта, + элементы RGB info, menu, content
				
				//RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('sujets.9may.branding-head:sujets'), // брендированный баннер
												
				RGB('sujets.9may.list-head:sujets'), // заголовок страницы
				
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
							
							RGB('sujets.9may.news'),
							
							RGB('sujets.9may.list-wrapper:sujets') // тело страницы
							
						]

					}
				}

			]

		},

		sidebarRight: RGT('sujets.sidebarRight:9may'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "9may",
			type: "sujets"
		}
	}

};