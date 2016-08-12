/*
 * панель выбора шпигелей + RGB data-panel-spiegel
 * 
 */
 
module.exports = function(data){

	return {

		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							spiegel: RGB('date-panel-spiegel') // панель выбора шпигелей
						}
						
					}
				}
			]
		}
	
	}

};