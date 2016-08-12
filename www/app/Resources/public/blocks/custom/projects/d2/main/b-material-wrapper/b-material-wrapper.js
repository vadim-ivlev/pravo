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
							
							imgArt: RGB('projects.d2.material-img:art', '#images_type__default__length'), // изображение в материале

							share: RGB('share'), // социалки
							
							//video: RGB('video'), // видео
							
							//materialRelated: RGB('material-related:video'), // привязанные материалы
							
							//authors: RGB('material-head&authors', '#authors_by_kind__length') // авторы
							
						}
						
					}
				}
			]
		}
	
	}
	
};