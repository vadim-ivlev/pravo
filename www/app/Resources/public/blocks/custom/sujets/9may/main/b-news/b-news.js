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
							
							feed: RGB('sujets.9may.feed, mobile tablet tabletLandscape desktopFull'), // лента новостей

							//vidgetDesktopFull: RGB('projects.zvezdy_pobedy.vidget, desktopFull'), // виджет

							//vidget: RGB('sujets.9may.vidget, mobile tablet tabletLandscape'), // виджет

							vidgetRodina: RGB('sujets.9may.vidget:rodina, mobile tablet tabletLandscape'),

							vidgetZvezdy: RGB('sujets.9may.vidget:zvezdy, mobile tablet tabletLandscape'),

							vidgetNagrady: RGB('sujets.9may.vidget:nagrady, mobile tablet tabletLandscape'),
							
						}
					}
				}
			]
		}
	
	}

};