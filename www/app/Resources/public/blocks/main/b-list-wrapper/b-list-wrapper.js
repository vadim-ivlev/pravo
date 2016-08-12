/*
 * Тело + RGB themetopic, issue-picture, news-inner
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							themetopicCatalog: RGB('themetopic:catalog, mobile tablet tabletLandscape', '#path__sections__second'), // основные темы catalog
							
							issuePicture: RGB('issue-picture, desktopFull:active', '#fascicle__index_picture__is_active'), // обложка выпуска
							
							newsInterviews: RGB('news-inner:interviews'), // новости interviews
							
							newsLaws: RGB('news-inner:laws'), // новости laws
							
							newsLoadarray: RGB('news-inner:loadarray'), // новости через loadarray
							
						},
						
						sortBlocks: {
							
							'default': "newsLoadarray",
							
							interviews: "newsInterviews",
							
							laws: "newsLaws"
							
						}
						
					}
				}
			]
		}
	
	}

};