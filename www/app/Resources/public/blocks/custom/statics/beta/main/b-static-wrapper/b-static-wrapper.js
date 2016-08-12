/*
 * Тело страницы, содержит RGB form:vacancies
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
														
							//direct: RGB('yadirect:sidebar-right') // Директ для тестирования
							//ads: RGB('adfox') // Адфокс для тестирования
							
						}
						
					}
				}
			]
		}
	
	}

};