module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:spec'), // + RGT static.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:spec'), // основной блок контента

		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "spec",
			id: 463685,
			type: "statics"
		}
	}

};