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
					name: "videoTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Видео: {{title}} &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "videoDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Видео: {{title}}"
						}
					}
				},
				{
					name: "videoOgUrl",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:url",
							content: "{{frontend_uri}}"
						}
					}
				},
				{
					name: "videoOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Видео {{title}}"
						}
					}
				},

				// Аттрибут, что это страница видео
				{
					opt: {
						tag: "meta",
						attrs: {
							name: "rg-data",
							property: "page",
							content: "video"
						}
					}
				},
				
			]
		},
		
		head: {
		
			blocks: [
								
				RGInclude('material', 'styles'), // стили
				
				RGInclude('material', 'scripts') // скрипты
				
			]
			
    	},
		
		sidebarLeft: RGT('sidebarLeft:video'), // левый сайдбар
		
		/*
		 * Основной блок контента
		 * 
		 */

		main: {
			name: "main",

			blocks: [

				RGB('ads:top'), // баннер - верхняя перетяжка
				
		        RGB('header:video'), // шапка сайта, + элементы RGB info, menu, content
		        
		        RGB('ads:central-header'), // баннер - перетяжка под шапкой
							
				RGB('material-head:video'), // шапка
				
				/*
				 * Центральный блок
				 * 
				 */

				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_video"
						},


						blocks: [
							
							RGB('material-wrapper:video'), // тело
							
							RGB('yadirect:under-materials'), // Яндекс-директ
							
						]

					}
				}

			]

		},
		
		sidebarRight: RGT('sidebarRight:video'), // правый сайдбар
		
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
			uri: "video"
		}
	},

};