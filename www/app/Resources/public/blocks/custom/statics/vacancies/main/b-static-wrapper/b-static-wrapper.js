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
							form: RGB('form:vacancies') // форма вакансий
						}
						
					}
				}
			]
		}
	
	}

};