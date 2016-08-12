module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('fascicles.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('fascicles.head:31712'), // + шапка

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('fascicles.main:31712'), // основной блок контента

		sidebarRight: RGT('fascicles.sidebarRight:31712'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "31712",
			type: "fascicles"
		}
	}

};