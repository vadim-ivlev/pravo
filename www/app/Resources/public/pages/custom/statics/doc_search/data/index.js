module.exports = {
	
	toMerge: {

		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},

    	head: RGT('statics.head:doc_search'),
		
    	sidebarLeft: RGT('sidebarLeft:doc'), // левый сайдбар


		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
				RGB('header:doc'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:doc_search'), // шапка

				RGB('components:mailing_doc, mobile tablet tabletLandscape'),
				
				//RGB('search-head:doc'), // поиск
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_doc"
						},

						blocks: [

							RGB('search-info'), // информация по поиску
							
							RGB('list-wrapper:doc'), // тело
															
						]

					}
				}

		    ]

		},
		
		sidebarRight: RGT('sidebarRight:doc_search'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "doc_search",
			id: 1246256,
			type: "statics"
		}
	},

};