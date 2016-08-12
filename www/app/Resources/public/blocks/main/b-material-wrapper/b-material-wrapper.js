/*
 * Тело материала
 * 
 */
 
module.exports = function(data){

	return {
	
		name: "bMaterialWrapper",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							imgArt: RGB('material-img:art', '#images_type__default__length'), // изображение в материале

							// share: RGB('share'),

							fastAccess: {
								name: "bFastAccess",
								opt: {
									tag: "div",
									attrs: {
										"id": "fastAccess",
										// "class": "stickedFastAccess"
									}
								}
							},
							
							video: RGB('video'), // видео
							
							materialRelated: RGB('material-related:video'), // привязанные материалы
														
						}
						
					}
				}
			]
		}
	
	}
	
};