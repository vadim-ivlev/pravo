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

							partners: RGB('statics.special_offer_02.custom-content, desktopFull:active') // Сайдбар с кастомным контентом

						}
					}
				}
			]
		}
	
	}

};