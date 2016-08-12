/*
 * Скролл
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bScrollBlock",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							ads: RGB('ads:sidebar-left'), // баннер - левый сайдбар

							ads_more: RGB('ads:sidebar-left-second'), // баннер - левый сайдбар, второй экран

						}
						
					}
				}
			]
		}
	
	}

};