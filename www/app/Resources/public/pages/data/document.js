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
					name: "articleTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "{{{link_title}}} &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "articleDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "{{meta_description}}"
						}
					}
				},
    			{
					name: "articleOgUrl",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:url",
							content: "{{frontend_uri}}"
						}
					}
				},
				{
					name: "articleOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "{{link_title}}"
						}
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/spec/dok/doc/\">" } // Для подключения рекламы
						]
					}
				}
				
    		]
	    },
		
		head: {
		
			blocks: [
				
				RGB('builder:document'), // builder
				
				RGInclude('material', 'styles'), // стили
				
				RGInclude('material', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:document'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка
				
				RGB('header:document'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('material-head:doc'), // шапка
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_document"
						},

						blocks: [

							RGB('material-aside:doc'), // привязки + RGB material-meta, material-related, feed

							RGB('material-wrapper:doc'), // тело документа

							RGB('material-action:art'), // отслеживать сюжет, + RGB share:art
							
							RGB('main-today, mobile tablet tabletLandscape'), // главное сегодня
																
							RGB('feed:doc-binding, mobile tablet tabletLandscape'), // связанные с документами материалы
							
							RGB('ads:under-materials'), // баннер
							
							// Комментарии
							// {
							// 	name: "bComment",
							// 	opt: {
							// 		tag: "div",
							// 		attrs: {
							// 			"id": "comments"
							// 		}
							// 	}
							// },
							RGB('comment'),
							
							//RGB('ads&relap:under-materials'), // релап

							RGB('ads:tgb-under-materials'), // ТГБ

							RGB('ads:partners-under-doc'), // партнерки
							
							RGB('yadirect:under-materials'), // Яндекс-директ
							
							// RGB('actual-news') // Блок с актуальными новостями
							RGB('relap:underMaterial')
							
						]

					}
				}

		    ]

		},
		
		sidebarRight: RGT('sidebarRight:document'), // правый сайдбар
		
		footer: {
		
			blocks: [
					
				{
					opt: {
						contents: [
							{ data: "<script async src=\"https://relap.io/api/v6/head.js?token=G2Mb6m7qfYB93XRx\"></script>" }
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
			uri: "document"
		}
	}
};