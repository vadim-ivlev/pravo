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
				/*{
					name: "indexDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Российская газета - издание Правительства Российской Федерации, официальный публикатор документов"
						}
					}
				},*/
				{
					name: "indexYandexVerification",
					opt: {
						tag: "meta",
						attrs: {
							name: "yandex-verification",
							content: "58d136a02371d7f6"
						}
					}
				},
				{
					name: "indexGoogleVerification",
					opt: {
						tag: "meta",
						attrs: {
							name: "google-site-verification",
							content: "ugPuY0OOWfC1Uu1hIYjlkh3aFPNiaXYANXylo8GZ7nU"
						}
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/pravo/index/\">" } // Для подключения рекламы
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