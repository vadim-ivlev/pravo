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
					name: "authorTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "{{author__name}} &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "authorDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "{{author__name}} &mdash; Российская газета"
						}
					}
				},
				{
					name: "authorOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "{{author__name}}"
						}
					}
				}

    		]
	    },
		
		head: {
		
			blocks: [
				
				RGB('builder:author'), // builder
				
				RGInclude('author', 'styles'), // стили
				
				RGInclude('author', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:author'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",


		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
				RGB('header:author'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:author'), // шапка
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_author"
						},

						blocks: [
							
							RGB('list-wrapper:author'), // тело
							
							RGB('yadirect:footer-page'), // Яндекс-директ

						]

					}
				}

		    ]

		},
		
		sidebarRight: RGT('sidebarRight:author'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "author"
		}
	}
};