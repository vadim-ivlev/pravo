/*
 * Панель информации + RGB btn-fresh
 * 
 */
 
module.exports = function(data){

	return {

		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							fresh: RGB('btn-fresh'), // панель свежего выпуска
							subs: RGB('btn-subs') // подписка на издания
						}
						
					}
				}
			]
		}
	
	}

};