/*
 * Тело материала
 * 
 */
 
module.exports = function(data){

	return {
	
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							imgArt: RGB('material-img:art', '#images_type__default__length'), // изображение в материале
							
							video: RGB('video'), // видео
							
							materialRelated: RGB('material-related:video'), // привязанные материалы

							share: RGB('projects.hockey.share, tablet tabletLandscape desktop desktopFull:active'), // шаринг
														
						}
						
					}
				}
			]
		}
	
	}
	
};