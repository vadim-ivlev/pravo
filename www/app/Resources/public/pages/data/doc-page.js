module.exports = {
	
	toMerge: {

		meta: {
			
			blocks: [
				
				RGT('meta'), // метаинформация
				
				/*
    			 * Кастомная метаинформация
    			 * 
    			 */
    			{
					name: "searchDocPageTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Документы &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "searchDocPageDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Документы &mdash; Российская газета"
						}
					}
				},
				{
					name: "searchDocPageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Документы"
						}
					}
				}				
			]
			
    	},
		
		head: {
		
			blocks: [
			
				RGInclude('doc', 'styles'), // стили
				
				RGInclude('doc', 'scripts') // скрипты
				
			]
			
    	},
		
    	sidebarLeft: RGT('sidebarLeft:doc'), // левый сайдбар


		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
				RGB('header:doc'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:doc'), // шапка

				RGB('components:mailing_doc, mobile tablet tabletLandscape'),
				
				//RGB('search-head:doc'), // поиск
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_doc"
						},

						blocks: [
							
							RGB('list-wrapper:doc'), // тело
															
						]

					}
				}

		    ]

		},
		
		sidebarRight: RGT('sidebarRight:doc'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "doc"
		}
	},

};