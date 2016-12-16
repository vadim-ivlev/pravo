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
								data: "Бесплатная юридическая консультация.  Российская газета"
							}
						]
					}
				},
				{
    				name: "description",
    				opt: {
    					tag: "meta",
    					attrs: {
    						name: "description",
    						content: "Правовая поддержка граждан: вы можете получить юридическую помощь бесплатно. Задайте вопрос опытному юристу."
    					}
    				}
    			},
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
				}
			
			]
			
		},				
		
		/*
		 * Основной блок контента
		 * 
		 */

		main: {

		    blocks: [

				RGB('header:error404'), // шапка сайта
				
				RGB('main:error404') // основной контент

			]

		},	
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "juristical_error404"
		}
	}

};