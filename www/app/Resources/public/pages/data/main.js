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
					name: "indexTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Российская газета"
							}
						]
					}
				},
				{
					name: "indexDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Российская газета - издание Правительства Российской Федерации, официальный публикатор документов"
						}
					}
				},
				{
					name: "indexYandexVerification",
					opt: {
						tag: "meta",
						attrs: {
							name: "yandex-verification",
							content: "68d57ae756ac44ad"
						}
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/static/juristical/ind\">" } // Для подключения рекламы
						]
					}
				}
			
			]
			
		},
		
		/*
		 * Шапка
		 * 
		 */
		
		head: {

    		blocks: [
				
				//RGInclude('/custom/projects/juristical/global', 'styles'), // стили
				
				//RGInclude('/custom/projects/juristical/global', 'scripts') // скрипты

				{
					opt: {
						contents: [
							{ data: "<script src=\"https://jurist.dev.rg.ru/res/scripts/custom/projects/juristical/pagination.js\"></script>" }
						]
					}
				}
				
			]
		},
				
		
		/*
		 * Основной блок контента
		 * 
		 */

		main: {

		    blocks: [

				RGB('header:index'), // шапка сайта
				
				RGB('main:index') // основной контент

			]

		},

		/*
		 * Левый сайдбар
		 * 
		 */

		sidebarLeft: {

	 		blocks: [
				
				RGB('sidebar-left:index', '#sidebar')
				
			]
		},

		/*
		 * Правый сайдбар
		 *
		 */

		sidebarRight: {

    		blocks: [
				
				RGB('sidebar-right:index', '#sidebar')
				
			]
		},
		
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "juristical_index"
		}
	}

};