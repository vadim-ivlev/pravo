module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('statics.meta'), // метаинформация статики
			
			]
			
		},
		
		head: RGT('statics.head:vacancies'), // + RGT static.meta
		
		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('statics.main:vacancies'), // основной блок контента
		
		sidebarRight: RGT('statics.sidebarRight:vacancies'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "vacancies",
			id: 448201,
			type: "statics"
		}
	}

};