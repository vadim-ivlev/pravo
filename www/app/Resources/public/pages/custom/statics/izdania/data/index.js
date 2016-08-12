module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:izdania'), // + RGT static.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:izdania'), // основной блок контента

		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "izdania",
			id: 318022,
			type: "statics"
		}
	}

};