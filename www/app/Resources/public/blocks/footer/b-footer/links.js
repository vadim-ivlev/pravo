/*
 * Ссылки в подвале + RGB footer-links
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							links: RGB('footer-links'), // ссылки
						}
						
					}
				}
			]
		}
	
	}

};