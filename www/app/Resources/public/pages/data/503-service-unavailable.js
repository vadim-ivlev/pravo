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
								data: "503 Service Unavailable"
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
							content: "503 Service Unavailable &mdash; Российская газета"
						}
					}
				},
				{
					name: "notFoundPageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "503 Service Unavailable"
						}
					}
				},

    		]
	    },

		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
		        RGB('header:service-unavailable'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:service-unavailable'), // шапка
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_service-unavailable"
						},

						blocks: [
																	
							RGB('list-wrapper:service-unavailable'), // тело
							
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
			uri: "service-unavailable"
		}
	},

};