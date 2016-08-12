module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head'), // + RGT static.meta
		
		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main'), // основной блок контента
		
		sidebarRight: RGT('sidebarRight:static'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "static",
			type: "statics"
		}
	}

};