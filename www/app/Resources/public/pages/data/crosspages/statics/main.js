/*
 * Основной блок контента стандартного статического шаблона
 * 
 */

module.exports = function(data){

	return {

		name: "main",

		blocks: [

			RGB('ads:top'), // баннер - верхняя перетяжка
			
			RGB('statics.'+ data.mod +'.header:static'), // шапка сайта, + элементы RGB info, menu, content
			
			RGB('ads:central-header'), // баннер - перетяжка под шапкой
											
			RGB('statics.'+ data.mod +'.list-head:static'), // заголовок страницы
			
			/*
			 * Центральный блок
			 * 
			 */
			
			{
				name: "mainContentItemMain",
				opt: {
					tag: "div",
					
					attrs: {
						"class": "b-content b-content_static"
					},
					
					blocks: [
																
						RGB('statics.'+ data.mod +'.static-wrapper:static') // тело страницы
						
					]

				}
			}
															
		]

	}
	
};