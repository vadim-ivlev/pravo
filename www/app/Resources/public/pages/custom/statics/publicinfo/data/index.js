module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:publicinfo'), // + RGT static.meta
		
		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:publicinfo'), // основной блок контента
		
		sidebarRight: RGT('statics.sidebarRight:publicinfo'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "publicinfo",
			id: 1176764,
			type: "statics"
		}
	}

};