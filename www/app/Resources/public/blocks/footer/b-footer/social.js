/*
 * Кнопки в подвале + RGB social
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							social: RGB('social') // социальные сети
						}
						
					}
				}
			]
		}
	
	}

};