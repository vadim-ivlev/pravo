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
							
							top: RGB('projects.juristical.footer&top'), // верх футера

							bottom: RGB('projects.juristical.footer&bottom') // низ футера
						}
						
					}
				}
			]
		}
	
	}

};