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
					name: "gazetaTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Свежий номер {{# fascicles}}{{# fascicles__FIRST__}}{{fascicle__title}}{{# fascicle__subtitle}}: {{fascicle__subtitle}}{{/ fascicle__subtitle}} {{{fascicle__readable_date}}} № {{fascicle__number}}{{/ fascicles__FIRST__}}{{/ fascicles}}"
							}
						]
					}
				},
				{
					name: "gazetaDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Свежий номер Российской газеты"
						}
					}
				},
    			{
					name: "gazetaOgUrl",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:url",
							content: "{{arhiv_svezh_uri}}"
						}
					}
				},
				{
					name: "gazetaOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Свежий номер Российской газеты"
						}
					}
				},
				{
					name: "rgFascicle",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"fascicle:uri\" content=\"{{uri}}\">" } // Выпуски dimension5
						]
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"{{# title_id}}/gazeta/{{title_id}}/ind/{{/ title_id}}{{^ title_id}}/gazeta/svezh/ind/{{/ title_id}}\">" } // Для подключения рекламы
						]
					}
				},
				
    		]
	    },
		
		head: {
		
			blocks: [
								
				RGInclude('gazeta', 'styles'), // стили
				
				RGInclude('gazeta', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:gazeta-issues'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
		        RGB('header:gazeta-issues'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:gazeta'), // шапка

				RGB('components:mailing_fresh, mobile tablet tabletLandscape'),
											
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_gazeta-issues"
						},

						blocks: [
							
							RGB('list-wrapper:gazeta'), // тело
							
							RGB('ads:yandex-horizontal') // Яндекс-директ горизонтальный

						]

					}
				}

		    ]

		},
		
		sidebarRight: RGT('sidebarRight:gazeta-issues'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "gazeta-issues"
		}
	},

};