/*
 * Шпигели каталога + RGB themetopic
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							themetopicCatalog: RGB('themetopic:catalog, mobile tablet tabletLandscape', '^region_catalog #block__themetopic__length'), // основные темы catalog
							
							themetopicCatalogFull: RGB('themetopic:catalog, desktopFull', '^region_catalog #block__themetopic__length'), // основные темы catalog
							
							accentsShowcaseRegDesktopFull: RGB('accents:showcase-catalog, desktopFull:active', '#region_catalog'), // акценты "Ветрина проектов"
							
							accentsShowcaseReg: RGB('accents:showcase-catalog, mobile tablet tabletLandscape desktop', '#region_catalog'), // акценты "Ветрина проектов"
							
							pressReleaseDesktopFull: RGB('top-news:press, desktopFull:active', '#region_catalog'), // блок пресс релизов

							pressReleaseDesktop: RGB('top-news:press, mobile tablet tabletLandscape', '#region_catalog'), // блок пресс релизов
							
						}
						
					}
				}
			]
		}
	
	}

};