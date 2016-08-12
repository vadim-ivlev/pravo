/*
 * Правый сайдбар
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							mainToday: RGB('feed:main-today, desktop desktopFull:active'),

							newsRubric: RGB('projects.forumspb2016.news-rubric:feed, desktop desktopFull:active'),

							newsRubricArticle: RGB('projects.forumspb2016.news-rubric:feed-article, desktop desktopFull:active'),
							
						},
						
						sortBlocks: {
							
							'default': "mainToday newsRubric",
							
							article: "mainToday newsRubricArticle"

						}
						
					}
				}
			]
		}
	
	}

};