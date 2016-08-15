/*
 * Ссылки + RGB counter
 * 
 */
 
module.exports = function(data){

	return {
	
		name: "bFooterLinks",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							counter: RGB('counter') // счётчики
						}
						
					}
				}
			]
		}
	
	}

};