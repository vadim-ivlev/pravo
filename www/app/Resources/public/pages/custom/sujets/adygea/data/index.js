module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('sujets.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('sujets.head:adygea'), // + шапка

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('sujets.main:adygea'), // основной блок контента

		sidebarRight: RGT('sujets.sidebarRight:adygea'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "adygea",
			type: "sujets"
		}
	}

};