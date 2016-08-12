/*
 * Основной блок контента промо статического шаблона
 * 
 */

module.exports = function(data){

	return {

		name: "main",

		blocks: [
			
			RGB('statics.'+ data.mod +'.header:promo'), // шапка сайта
														
			RGB('statics.'+ data.mod +'.list-head:promo'), // заголовок страницы
			
			/*
			 * Центральный блок
			 * 
			 */
			
			{
				name: "mainContentItemMain",
				opt: {
					tag: "div",
					
					attrs: {
						"class": "b-content b-content_promo"
					},
					
					blocks: [
																
						RGB('statics.'+ data.mod +'.static-wrapper:promo') // тело страницы
						
					]

				}
			}
															
		]

	}
	
};