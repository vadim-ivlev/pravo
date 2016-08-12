module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('sujets.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('sujets.head:sochiautodrom'), // + шапка

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('sujets.main:sochiautodrom'), // основной блок контента

		sidebarRight: RGT('sujets.sidebarRight:sochiautodrom'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "sochiautodrom",
			type: "sujets"
		}
	}

};