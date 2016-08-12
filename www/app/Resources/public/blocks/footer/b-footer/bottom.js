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
							social: RGB('footer&social'), // социальные сети + RGB social
							developer: RGB('footer&developer') // разработка и дизайн сайта
						}
						
					}
				}
			]
		}
	
	}

};