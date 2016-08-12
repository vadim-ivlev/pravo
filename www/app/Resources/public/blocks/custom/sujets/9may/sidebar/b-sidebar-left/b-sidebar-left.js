/*
 * Левый сайдбар
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							lastNews: RGB('feed:last-news, tablet tabletLandscape desktop desktopFull:active'), // последние новости
							
							categories: RGB('categories, tablet tabletLandscape desktop desktopFull:active'), // меню
							
						}
						
					}
				}
			]
		}
	
	}

};