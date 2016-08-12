module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},

		head: RGT('statics.head:reklama'), // + RGT static.meta
		
		main: RGT('statics.main_promo:reklama'), // основной блок контента
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "reklama",
			promoSection: "reklama",
			id: 451454,
			type: "statics"
		}
	}

};