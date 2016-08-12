/*
 * Правый сайдбар
 * 
 */
 
module.exports = function(data){

	return {

		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							vendors: RGB('statics.about.vendors:sidebar'), // наши издания

							adsSidebarRight: RGB('ads:sidebar-right') // баннер - правый сайдбар

						}
					}
				}
			]
		}
	
	}

};