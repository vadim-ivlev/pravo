module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:article-ads'), // + RGT static.meta
		
		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:article-ads'), // основной блок контента
		
		sidebarRight: RGT('sidebarRight:article'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "article-ads",
			id: 1222199 ,
			type: "statics"
		}
	}

};