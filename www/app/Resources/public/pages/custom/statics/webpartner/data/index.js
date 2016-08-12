module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:webpartner'), // + RGT static.meta
		
		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:webpartner'), // основной блок контента
		
		sidebarRight: RGT('statics.sidebarRight:webpartner'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "webpartner",
			id: 6183,
			type: "statics"
		}
	}

};