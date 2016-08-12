/*
 * Блок новостей
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							feed: RGB('projects.zvezdy_pobedy.feed, mobile tablet tabletLandscape desktopFull'), // лента новостей

							vidgetDesktop: RGB('projects.zvezdy_pobedy.vidget, desktopFull'), // виджет

							vidget: RGB('projects.zvezdy_pobedy.vidget, mobile tablet tabletLandscape'), // виджет

							contacts: RGB('projects.zvezdy_pobedy.contacts, mobile tablet tabletLandscape') // блок контактов
							
						}
					}
				}
			]
		}
	
	}

};