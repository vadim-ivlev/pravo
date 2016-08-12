module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:services'), // + RGT static.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:services'), // основной блок контента

		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "services",
			id: 1176776,
			type: "statics"
		}
	}

};