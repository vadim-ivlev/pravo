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
								data: "Юридическая консультация &mdash; Российская газета"
							}
						]
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
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/pravo/rubrics/\">" } // Для подключения рекламы
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

				{
					opt: {
						contents: [
							{ data: "<script src=\"/bundles/jurist/js/pagination.js\"></script>" }
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

				RGB('header:search'), // шапка сайта
				
				RGB('main:search') // основной контент

			]

		},

		/*
		 * Левый сайдбар
		 * 
		 */

		sidebarLeft: {

	 		blocks: [
				
				RGB('sidebar-left:search', '#sidebar')
				
			]
		},

		/*
		 * Правый сайдбар
		 *
		 */

		sidebarRight: {

    		blocks: [
				
				RGB('sidebar-right:search', '#sidebar')
				
			]
		},
		
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "juristical_search"
		}
	}

};