module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('fascicles.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('fascicles.head:31676'), // + шапка

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('fascicles.main:31676'), // основной блок контента

		sidebarRight: RGT('fascicles.sidebarRight:31676'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "31676",
			type: "fascicles"
		}
	}

};