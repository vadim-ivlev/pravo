module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:lessons'), // + RGT static.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:lessons'), // основной блок контента

		sidebarRight: RGT('statics.sidebarRight:lessons'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "lessons",
			id: 1176826,
			type: "statics"
		}
	}

};