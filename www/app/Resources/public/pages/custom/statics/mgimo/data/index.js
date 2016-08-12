module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:mgimo'), // + RGT static.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:mgimo'), // основной блок контента

		sidebarRight: RGT('statics.sidebarRight:mgimo'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "mgimo",
			id: 562446,
			type: "statics"
		}
	}

};