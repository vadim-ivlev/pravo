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
					name: "searchPageTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Поиск по сайту &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "searchPageDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Поиск по сайту rg.ru &mdash; Российская газета"
						}
					}
				},
				{
					name: "searchPageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Поиск по сайту"
						}
					}
				}
				
    		]
	    },
		
		head: {
		
			blocks: [
								
				RGInclude('search-page', 'styles'), // стили
				
				RGInclude('search-page', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:search-page'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
				RGB('header:search-page'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой
				
				RGB('list-head:search-page'), // шапка
				
				RGB('search-head:search-page'), // поиск
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_search-page"
						},

						blocks: [
																	
							RGB('list-wrapper:search-page'), // тело
							
						]

					}
				}
		        
		    ]

		},
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "search-page"
		}
	},

};