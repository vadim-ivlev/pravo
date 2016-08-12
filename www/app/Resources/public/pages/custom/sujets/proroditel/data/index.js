module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('sujets.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('sujets.head:proroditel'), // + шапка

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('sujets.main:proroditel'), // основной блок контента

		sidebarRight: RGT('sujets.sidebarRight:proroditel'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "proroditel",
			type: "sujets"
		}
	}

};