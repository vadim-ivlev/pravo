module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('sujets.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('sujets.head:porabejat'), // + шапка

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('sujets.main:porabejat'), // основной блок контента

		sidebarRight: RGT('sujets.sidebarRight:porabejat'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "porabejat",
			type: "sujets"
		}
	}

};