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
					name: "interviewsTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Интервью &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "interviewsDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Интервью &mdash; Российская газета"
						}
					}
				},
				{
					name: "interviewsOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Интервью &mdash; Российская газета"
						}
					}
				}
    		]
	    },
		
		head: {
		
			blocks: [
								
				RGInclude('interviews', 'styles'), // стили
				
				RGInclude('interviews', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:interviews'), // левый сайдбар
		
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
							
				RGB('list-head:interviews'), // шапка
				
				RGB('alphabet:interviews'), // алфавит
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_interviews"
						},
						
						blocks: [
							
							RGB('news:spiegel-interviews', '#latest_interviews__length'), // шпигели

							RGB('list-wrapper:interviews'), // тело

						]

					}
				}

		    ]

		},
		
		sidebarRight: RGT('sidebarRight:interviews'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "interviews"
		}
	},

};