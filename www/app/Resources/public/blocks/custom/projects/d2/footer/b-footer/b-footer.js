/*
 * Подвал сайта + RGB partners, footer-links, social
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
							counter: RGB('counter')
						}
						
					}
				}
			]
		}
	
	}

};