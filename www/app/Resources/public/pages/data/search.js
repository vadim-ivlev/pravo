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
                    name: "crosspageOgTitle",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:title",
                            content: "Юридическая консультация — Российская газета"
                        }
                    }
                },
                /*{
                    name: "crosspagesOgDescription",
                    opt: {
                        tag: "meta",
                        attrs: {
                            property: "og:description",
                            content: "Правовая поддержка граждан: вы можете получить юридическую помощь бесплатно. Задайте вопрос опытному юристу"
                        }
                    }
                },*/
    			{
					name: "indexTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Юридическая консультация — Российская газета"
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
					name: "infiniteLoadingScript",
					opt: {
						contents: [
							{ data: "<script src=\"/bundles/jurist/js/list.js\"></script>" }
						]
					}
				},

				{
					opt: {
						contents: [
							{ data: "<script src=\"/bundles/jurist/js/pagination.js\"></script>" },
							{ data: "<script src=\"/bundles/jurist/js/search-results.js\"></script>" }
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