/*
 * Основной блок контента стандартного статического шаблона
 * 
 */

module.exports = function(data){

	return {

		name: "main",

		blocks: [

			RGB('ads:top'), // баннер - верхняя перетяжка
			
			RGB('sujets.'+ data.mod +'.header:sujets'), // шапка сайта, + элементы RGB info, menu, content
			
			(!data.mod) && RGB('ads:central-header'), // баннер - перетяжка под шапкой

			RGB('sujets.'+ data.mod +'.branding-head:sujets'), // брендированный баннер
											
			RGB('sujets.'+ data.mod +'.list-head:sujets'), // заголовок страницы
			
			/*
			 * Центральный блок
			 * 
			 */
			
			{
				name: "mainContentItemMain",
				opt: {
					tag: "div",
					
					attrs: {
						"class": "b-content b-content_sujets"
					},
					
					blocks: [
												
						//RGB('sujets.'+ data.mod +'.news:spiegel-sujets'), // шпигели
						
						(data.mod) ? RGB('sujets.'+ data.mod +'.news:spiegel-sujets-custom') : RGB('news:spiegel-sujets'), // шпигели
						
						RGB('sujets.'+ data.mod +'.list-wrapper:sujets') // тело страницы
						
					]

				}
			}

		]

	}
	
};