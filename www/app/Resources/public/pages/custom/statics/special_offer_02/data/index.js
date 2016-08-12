module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:special_offer_02'), // + RGT static.meta
		
		main: RGT('statics.main_promo:special_offer_02'), // основной блок контента

		sidebarRight: RGT('statics.sidebarRight_promo:special_offer_02'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "special_offer_02",
			promoSection: "subscription",
			id: 871579,
			type: "statics"
		}
	}

};