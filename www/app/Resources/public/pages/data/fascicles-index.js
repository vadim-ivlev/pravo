module.exports = {

	toMerge: {

		/*
		 * Шапка
		 * 
		 */
		
		meta: {
			
    		blocks: [
				
				RGT('meta'), // метаинформация
				
				/*
    			 * Кастомная метаинформация
    			 * 
    			 */
    			{
					name: "fasciclePageTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Специальные выпуски &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "fasciclePageDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Специальные выпуски &mdash; Российская газета"
						}
					}
				},
				{
					name: "fasciclePageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Специальные выпуски"
						}
					}
				}
				
    		]
	    },
		
		head: {
		
			blocks: [
								
				RGInclude('fascicles-index', 'styles'), // стили
				
				RGInclude('fascicles-index', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:fascicles-index'),
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
				RGB('header:fascicles-index'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой
				
				RGB('list-head:fascicles-index'), // шапка
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_fascicles-index"
						},

						blocks: [							
							RGB('list-wrapper:fascicles-index'),
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
			uri: "fascicles-index"
		}
	},

};