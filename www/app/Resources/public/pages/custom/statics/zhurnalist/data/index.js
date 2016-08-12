module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:zhurnalist'), // + RGT static.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:zhurnalist'), // основной блок контента

		sidebarRight: RGT('statics.sidebarRight:zhurnalist'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "zhurnalist",
			id: 562446,
			type: "statics"
		}
	}

};