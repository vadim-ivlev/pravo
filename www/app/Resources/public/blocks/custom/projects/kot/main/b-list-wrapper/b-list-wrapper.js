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
							
							newsLoadarray: RGB('projects.kot.news-inner:loadarray') // новости через loadarray
							
						}
						
					}
				}
			]
		}
	
	}

};