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
							
							top: RGB('footer&top'), // верх футера

							bottom: RGB('footer&bottom') // низ футера
						}
						
					}
				}
			]
		}
	
	}

};