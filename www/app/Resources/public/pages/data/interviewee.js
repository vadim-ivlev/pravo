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
					name: "intervieweeTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Интервью: {{interviewee__name}} &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "intervieweeDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Интервью: {{interviewee__name}} - {{interviewee__occupation}}"
						}
					}
				},
				{
					name: "intervieweeOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Интервью: {{interviewee__name}}"
						}
					}
				},

    		]
	    },
		
		head: {
		
			blocks: [
								
				RGInclude('interviewee', 'styles'), // стили
				
				RGInclude('interviewee', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:interviewee'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
		        RGB('header:interviewee'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:interviewee'), // шапка
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_interviewee"
						},

						blocks: [
							
							RGB('list-wrapper:interviewee'), // тело
							
						]

					}
				}

		    ]

		},
		
		sidebarRight: RGT('sidebarRight:interviewee'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "interviewee"
		}
	},

};