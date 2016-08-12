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

							partners: RGB('statics.subscription.custom-content, desktopFull:active') // Сайдбар с кастомным контентом

						}
					}
				}
			]
		}
	
	}

};