module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:finansist'), // + RGT static.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:finansist'), // основной блок контента

		sidebarRight: RGT('statics.sidebarRight:finansist'), // правый сайдбар

		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "finansist",
			id: 1176812,
			type: "statics"
		}
	}

};