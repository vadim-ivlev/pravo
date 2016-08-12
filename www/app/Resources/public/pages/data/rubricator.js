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
					name: "rubricatorPageTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "{{# rubricator_theme}}Тематический рубрикатор{{/rubricator_theme}}{{# rubricator_region}}Региональный рубрикатор{{/ rubricator_region}}{{# rubricator_org}}Рубрикатор организаций{{/ rubricator_org}} &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "rubricatorPageDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "{{# rubricator_theme}}Тематический рубрикатор{{/rubricator_theme}}{{# rubricator_region}}Региональный рубрикатор{{/ rubricator_region}}{{# rubricator_org}}Рубрикатор организаций{{/ rubricator_org}} rg.ru &mdash; Российская газета"
						}
					}
				},
				{
					name: "rubricatorPageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "{{# rubricator_theme}}Тематический рубрикатор{{/rubricator_theme}}{{# rubricator_region}}Региональный рубрикатор{{/ rubricator_region}}{{# rubricator_org}}Рубрикатор организаций{{/ rubricator_org}} rg.ru"
						}
					}
				}

    		]
	    },

		
		head: {
		
			blocks: [

				RGInclude('rubricator', 'styles'), // стили
				
				RGInclude('rubricator', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:rubricator'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
		        RGB('header:rubricator'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:rubricator'), // шапка
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_rubricator"
						},

						blocks: [
																	
							RGB('list-wrapper:rubricator'), // тело
							
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
			uri: "rubricator"
		}
	},

};