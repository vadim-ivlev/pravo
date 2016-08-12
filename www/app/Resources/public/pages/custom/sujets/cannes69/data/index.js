module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('sujets.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('sujets.head:cannes69'), // + шапка

		sidebarLeft: RGT('sujets.sidebarLeft:cannes69'), // левый сайдбар
		
		//main: RGT('sujets.main:cannes69'), // основной блок контента

		main:  {

			name: "main",

			blocks: [

				//RGB('ads:top'), // баннер - верхняя перетяжка
			
				RGB('sujets.cannes69.header:sujets'), // шапка сайта, + элементы RGB info, menu, content
				
				//RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('sujets.cannes69.branding-head:sujets'), // брендированный баннер
												
				RGB('sujets.cannes69.list-head:sujets'), // заголовок страницы
				
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
							
							RGB('sujets.cannes69.news'),
							
							RGB('sujets.cannes69.list-wrapper:sujets') // тело страницы
							
						]

					}
				}

			]

		},

		sidebarRight: RGT('sujets.sidebarRight:cannes69'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "cannes69",
			type: "sujets"
		}
	}

};