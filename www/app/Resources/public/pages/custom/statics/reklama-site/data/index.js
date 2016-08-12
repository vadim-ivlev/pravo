module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:reklama-site'), // + RGT static.meta
		
		main: RGT('statics.main_promo:reklama-site'), // основной блок контента
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "reklama-site",
			promoSection: "reklama",
			id: 451466,
			type: "statics"
		}
	}

};