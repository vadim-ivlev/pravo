/*
 * Панель информации + RGB &spiegel, &issues
 * 
 */
 
module.exports = function(data){

	return {

		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							spiegel: RGB('date-panel&spiegel'), // панель управления шпигелями + RGB
							issues: RGB('date-panel&issues') // панель изданий + RGB fresh, subs
						}
						
					}
				}
			]
		}
	
	}

};