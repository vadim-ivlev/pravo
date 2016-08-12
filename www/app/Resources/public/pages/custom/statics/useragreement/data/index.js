module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta') // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:useragreement'), // + RGT static.meta

		main: RGT('statics.main_promo:useragreement'), // основной блок контента
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "useragreement",
			promoSection: "useragreement",
			id: 941744,
			type: "statics"
		}
	}

};