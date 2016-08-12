/*
 * Тело страницы, содержит RGB form:inbox
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
							form: RGB('form:inbox') // форма обратной связи
						}
						
					}
				}
			]
		}
	
	}

};