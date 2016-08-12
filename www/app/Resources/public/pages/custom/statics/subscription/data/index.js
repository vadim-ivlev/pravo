module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:subscription'), // + RGT static.meta
		
		main: RGT('statics.main_promo:subscription'), // основной блок контента

		sidebarRight: RGT('statics.sidebarRight:subscription'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "subscription",
			promoSection: "subscription",
			id: 830591,
			type: "statics"
		}
	}

};