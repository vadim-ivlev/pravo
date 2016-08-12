/*
 * Тело страницы, содержит RGB form:gvp
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bStaticPageWrapper",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							form: RGB('form:mediacenter, desktop desktopFull:active'), // форма "медиацентр"

							formTabletLand: RGB('form:mediacenter, tabletLandscape'), // форма "медиацентр"

							formMobile: RGB('form:mediacenter, mobile tablet'), // форма "медиацентр"

							feed: RGB('statics.press_center.feed, desktop desktopFull:active'), // блок ленты новостей

							feedTabletLand: RGB('statics.press_center.feed, tabletLandscape'), // блок ленты новостей

							feedMobile: RGB('statics.press_center.feed, mobile tablet'), // блок ленты новостей

							contacts: RGB('statics.press_center.contacts') // контакты
						}
						
					}
				}
			]
		}
	
	}

};