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
								data: "502 Bad Gateway"
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
							content: "502 Bad Gateway &mdash; Российская газета"
						}
					}
				},
				{
					name: "notFoundPageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "502 Bad Gateway"
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
				
		        RGB('header:bad-gateway'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:bad-gateway'), // шапка
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_bad-gateway"
						},

						blocks: [
																	
							RGB('list-wrapper:bad-gateway'), // тело
							
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
			uri: "bad-gateway"
		}
	},

};