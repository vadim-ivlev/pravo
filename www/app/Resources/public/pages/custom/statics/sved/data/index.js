module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:sved'), // + RGT static.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:sved'), // основной блок контента

		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "sved",
			id: 1116365,
			type: "statics"
		}
	}

};