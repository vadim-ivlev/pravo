/*
 * Тело страницы, содержит RGB form:gvp
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bStaticPageWrapper",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							form: RGB('form:gvp') // форма "главная фоенная прокуратура отвечает"
						}
						
					}
				}
			]
		}
	
	}

};