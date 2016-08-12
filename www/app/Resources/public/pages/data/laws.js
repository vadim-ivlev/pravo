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
					name: "lawsTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "{{# use_publishing_date}}Документы, опубликованные{{/use_publishing_date}}{{^ use_publishing_date}}{{# in_the_past}}Документы, вступившие в силу{{/in_the_past}}{{^ in_the_past}}Документы, вступающие в силу{{/in_the_past}}{{/use_publishing_date}} {{readable_date}} &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "lawsDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "{{# use_publishing_date}}Документы, опубликованные{{/use_publishing_date}}{{^ use_publishing_date}}{{# in_the_past}}Документы, вступившие в силу{{/in_the_past}}{{^ in_the_past}}Документы, вступающие в силу{{/in_the_past}}{{/use_publishing_date}} {{readable_date}}"
						}
					}
				},
				{
					name: "lawsOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "{{# use_publishing_date}}Документы, опубликованные{{/use_publishing_date}}{{^ use_publishing_date}}{{# in_the_past}}Документы, вступившие в силу{{/in_the_past}}{{^ in_the_past}}Документы, вступающие в силу{{/in_the_past}}{{/use_publishing_date}} {{readable_date}}"
						}
					}
				},

    		]
	    },
		
		head: {
		
			blocks: [
								
				RGInclude('laws', 'styles'), // стили
				
				RGInclude('laws', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:laws'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
		        RGB('header:laws'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:laws'), // шапка
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_laws"
						},

						blocks: [
							
							RGB('list-wrapper:laws') // тело
							
						]

					}
				}

		    ]

		},
		
		sidebarRight: RGT('sidebarRight:laws'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "laws"
		}
	},

};