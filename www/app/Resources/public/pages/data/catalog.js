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
					name: "catalogTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "{{# this_section__title}}{{this_section__title}}{{/ this_section__title}} &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "catalogDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "{{# this_section__path}}{{title}}{{^ this_section__path__LAST__}} / {{/ this_section__path__LAST__}}{{/ this_section__path}}{{# this_section__title}} / {{this_section__title}}{{/ this_section__title}}"
						}
					}
				},
    			{
					name: "catalogOgUrl",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:url",
							content: "{{uri}}"
						}
					}
				},
				{
					name: "catalogOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "{{# this_section__title}}{{this_section__title}}{{/ this_section__title}}"
						}
					}
				},
				{
					name: "rgRegUri",
					opt: {
						contents: [
							{ data: "{{# region_catalog}}<meta name=\"rg-data\" property=\"reg:uri\" content=\"{{uri_for_include}}\">{{/ region_catalog}}" } // Регионы dimension1
						]
					}
				},
				{
					name: "rgThemeUri",
					opt: {
						contents: [
							{ data: "{{# theme_catalog}}<meta name=\"rg-data\" property=\"theme:uri\" content=\"{{uri_for_include}}\">{{/ theme_catalog}}" } // Темы dimension2
						]
					}
				},
				{
					name: "rgOrgUri",
					opt: {
						contents: [
							{ data: "{{# org_catalog}}<meta name=\"rg-data\" property=\"org:uri\" content=\"{{uri_for_include}}\">{{/ org_catalog}}" } // Организации dimension3
						]
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/{{uri}}ind\">" } // Для подключения рекламы
						]
					}
				}
				
    		]
	    },
		
		
		head: {
		
			blocks: [
				
				RGB('builder:catalog'), // builder
				
				RGInclude('catalog', 'styles'), // стили
				
				RGInclude('catalog', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:catalog'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

			/*
			 * Элементы основного контента
			 * 
			 */

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
		        RGB('header:catalog'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('list-head:catalog'), // шапка
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_catalog"
						},

						blocks: [
																	
							RGB('news:spiegel-catalog', '^path__sections__second'), // шпигели
							
							RGB('news-themetopic:catalog', '^path__sections__second #block__themetopic__length'), // новости основных тем
							
							RGB('accents:showcase', '#theme_catalog ^path__sections__second'), // акценты "Ветрина проектов"
							
							RGB('list-wrapper:catalog'), // тело
							
							RGB('yadirect:footer-page'), // Яндекс-директ

						]

					}
				}

		    ]

		},
		
		sidebarRight: RGT('sidebarRight:catalog'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "catalog"
		}
	}
};