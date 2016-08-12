module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('fascicles.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('fascicles.head:31635'), // + шапка

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('fascicles.main:31635'), // основной блок контента

		sidebarRight: RGT('fascicles.sidebarRight:31635'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "31635",
			type: "fascicles"
		}
	}

};