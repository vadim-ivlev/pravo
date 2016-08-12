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
					name: "accountPageTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Профиль &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "accountPageDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Профиль &mdash; Российская газета"
						}
					}
				},
				{
					name: "accountPageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Профиль"
						}
					}
				}
			]
    	},
		
		head: {
		
			blocks: [
			
				RGInclude('account', 'styles'), // стили
				
				RGInclude('account', 'scripts') // скрипты
				
			]
			
    	},
		
    	sidebarLeft: RGT('sidebarLeft:account'), // левый сайдбар


		/*
		 * Основной блок контента
		 * 
		 */
		
		main: {
			name: "main",

		    blocks: [

		        RGB('header:sujet'), // шапка сайта, + элементы RGB info, menu, content

				RGB('list-head:account'), // шапка
				
				/*
				 * Центральный блок
				 * 
				 */
				
				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_account"
						},

						blocks: [
																	
							RGB('list-wrapper:account') // тело
							
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
			uri: "account"
		}
	},

};