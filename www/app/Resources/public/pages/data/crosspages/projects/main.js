/*
 * Основной блок контента стандартного статического шаблона
 * 
 */

module.exports = function(data){

	return {

		name: "main",

		blocks: [

			RGB('ads:top'), // баннер - верхняя перетяжка
			
			RGB('projects.'+ data.mod +'.header:project'), // шапка сайта, + элементы RGB info, menu, content
			
			RGB('ads:central-header'), // баннер - перетяжка под шапкой
											
			RGB('projects.'+ data.mod +'.list-head:project'), // заголовок страницы
			
			/*
			 * Центральный блок
			 * 
			 */
			
			{
				name: "mainContentItemMain",
				opt: {
					tag: "div",
					
					attrs: {
						"class": "b-content b-content_project"
					},
					
					blocks: [
						
						(data.mod) ? RGB('projects.'+ data.mod +'.news:spiegel-project') : RGB('news:spiegel-project'), // шпигели
						
						RGB('projects.'+ data.mod +'.list-wrapper:project') // тело страницы
						
					]

				}
			}

		]

	}
	
};