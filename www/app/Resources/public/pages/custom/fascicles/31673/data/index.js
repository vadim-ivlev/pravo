module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('fascicles.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('fascicles.head:31673'), // + шапка

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('fascicles.main:31673'), // основной блок контента

		sidebarRight: RGT('fascicles.sidebarRight:31673'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "31673",
			type: "fascicles"
		}
	}

};