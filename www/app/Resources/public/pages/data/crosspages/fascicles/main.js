/*
 * Основной блок контента стандартного статического шаблона
 * 
 */

module.exports = function(data){

	return {

		name: "main",

		blocks: [

			RGB('ads:top'), // баннер - верхняя перетяжка
			
			RGB('fascicles.'+ data.mod +'.header'), // шапка сайта, + элементы RGB info, menu, content
			
			RGB('ads:central-header'), // баннер - перетяжка под шапкой

			RGB('fascicles.'+ data.mod +'.branding-head'), // брендированный баннер
											
			RGB('fascicles.'+ data.mod +'.list-head:gazeta'), // заголовок страницы
			
			/*
			 * Центральный блок
			 * 
			 */
			
			{
				name: "mainContentItemMain",
				opt: {
					tag: "div",
					
					attrs: {
						"class": "b-content b-content_gazeta-issues"
					},
					
					blocks: [

						RGB('list-wrapper:gazeta')
						
					]

				}
			}

		]

	}
	
};