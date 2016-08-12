/*
 * Шапка сайта + RGB &info, &menu, &content
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bHeader",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
						
							info: RGB('header&info'), // информация + RGB vendors
							
							menu: RGB('header&menu'), // меню
							
							content: RGB('header&content'), // основной контент + RGB logo, accents
							
							logo: RGB('logo'), // логотип
							
							titlePromo: RGB('header&title:promo, tablet tabletLandscape desktop desktopFull:active') // заголовок на промо страницах
							
						},

						sortBlocks: {
						
							'default': 'info menu content',
							
							promo: 'logo titlePromo',
							
							'not-found': 'logo'
							
						}
						
					}
				}
			]
		}
	
	}

};