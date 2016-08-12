/*
 * Подвал сайта + RGB vendors, footer-links, social
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bFooter",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							meta: RGB('material-meta:doc, mobile tablet tabletLandscape desktopFull:active'), // метаинформаця
													
							relatedDoc: RGB('material-related:doc, mobile tablet tabletLandscape desktopFull:active'), // привязки
													
							feedDocBinding: RGB('feed:doc-binding, desktopFull:active') // связанные с документами материалы
							
						}
						
					}
				}
			]
		}
	
	}

};