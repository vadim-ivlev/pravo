module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:special_offer_03'), // + RGT static.meta
		
		main: RGT('statics.main_promo:special_offer_03'), // основной блок контента

		sidebarRight: RGT('statics.sidebarRight:special_offer_03'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "special_offer_03",
			promoSection: "subscription",
			id: 824948,
			type: "statics"
		}
	}

};