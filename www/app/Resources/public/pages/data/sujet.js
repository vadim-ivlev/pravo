module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('sujets.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('sujets.head'), // + RGT sujets.meta
		
		sidebarLeft: RGT('sidebarLeft:catalog'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			
			name: "main",

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
		        RGB('header:sujets'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой
							
				RGB('list-head:sujets'), // шапка
				
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
							
							RGB('news:spiegel-sujets'), // шпигели
							
							RGB('list-wrapper:sujets'), // тело
							
							RGB('yadirect:footer-page'), // Яндекс-директ
							
						]

					}
				}		        
		    ]

		},
		
		sidebarRight: RGT('sidebarRight:article'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "sujets"
		}
	},

};