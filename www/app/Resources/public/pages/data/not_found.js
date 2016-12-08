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
    				name: "canonicalLink",
    				opt: {
    					tag: "link",
    					attrs: {
    						rel: "canonical",
    						href: "{{ canonical }}"
    					}
    				}
    			},
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

				RGB('header:not_found'), // шапка сайта
				
				RGB('main:not_found') // основной контент

			]

		},	
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "juristical_not_found"
		}
	}

};