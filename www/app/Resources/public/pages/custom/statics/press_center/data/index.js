module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:press_center'), // + RGT static.meta
		
		main: RGT('statics.main_promo:press_center'), // основной блок контента

		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "press_center",
			promoSection: "reklama",
			id: 141887,
			type: "statics"
		}
	}

};