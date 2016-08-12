/*
 * Отслеживать сюжет + RGB share
 * 
 */
 
module.exports = function(data){

	return {
	
		name: "bMaterialAction",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							share: RGB('share') // share
						}
						
					}
				}
			]
		}
	
	}

};