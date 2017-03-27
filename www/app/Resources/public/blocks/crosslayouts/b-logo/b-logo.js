/*
 * Логотип
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bLogo",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							rg: RGB('rg') // Подпись "Проект РГ" у логотипа
							
						}
						
					}
				}
			]
		}
	
	}

};