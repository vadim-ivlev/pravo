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
					name: "notFoundPageTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Ошибка 404"
							}
						]
					}
				},
				{
					name: "notFoundPageDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Ошибка 404 &mdash; Российская газета"
						}
					}
				},
				{
					name: "notFoundPageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Ошибка 404"
						}
					}
				}
			
			]
			
		},
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {

		    blocks: [

		    	//RGB('ads:top'), // баннер - верхняя перетяжка
				
		        RGB('header:not-found'), // шапка сайта, + элементы RGB info, menu, content
		        
		        //RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:not-found'), // шапка
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_not-found"
						},

						blocks: [
																	
							RGB('static-wrapper:not-found'), // тело
							
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
			uri: "not-found"
		}
	},

};