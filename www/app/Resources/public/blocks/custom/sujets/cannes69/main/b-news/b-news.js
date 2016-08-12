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
							
							feed: RGB('news:spiegel-sujets, mobile tablet tabletLandscape desktopFull'), // лента новостей

							//vidgetDesktopFull: RGB('projects.zvezdy_pobedy.vidget, desktopFull'), // виджет

							//vidget: RGB('sujets.cannes69.vidget, mobile tablet tabletLandscape'), // виджет

							// vidgetRodina: RGB('sujets.cannes69.vidget:rodina, mobile tablet tabletLandscape'),

							// vidgetZvezdy: RGB('sujets.cannes69.vidget:zvezdy, mobile tablet tabletLandscape'),

							// vidgetNagrady: RGB('sujets.cannes69.vidget:nagrady, mobile tablet tabletLandscape'),
							
						}
					}
				}
			]
		}
	
	}

};