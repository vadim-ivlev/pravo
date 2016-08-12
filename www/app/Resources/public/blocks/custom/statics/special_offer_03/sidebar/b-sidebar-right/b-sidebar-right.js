/*
 * Правый сайдбар
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bSidebarRight",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							partners: RGB('statics.special_offer_03.custom-content, desktop desktopFull:active') // Сайдбар с кастомным контентом

						}
					}
				}
			]
		}
	
	}

};