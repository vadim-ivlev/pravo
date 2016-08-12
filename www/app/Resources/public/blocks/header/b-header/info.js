/*
 * Информация в шапке сайта + RGB partners
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "eHeaderInfo",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							logo: RGB('logo, mobile'), // логотип в мобильной версии
							vendors: RGB('vendors:header'), // партнеры
							age: RGB('age, tablet tabletLandscape desktop desktopFull:active') // 12+
						}
						
					}
				}
			]
		}
	
	}

};