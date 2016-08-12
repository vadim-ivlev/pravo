/*
 * Контент шапки сайта + RGB logo, accents
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "eHeaderContent",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
						
							logo: RGB('logo, tablet tabletLandscape desktop desktopFull:active'), // логотип
							
							accents: RGB('accents:header') // акценты
							
						}
						
					}
				}
			]
		}
	
	}

};