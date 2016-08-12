module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('sujets.meta'), // метаинформация сюжета
			
			]
			
		},
		
		head: RGT('sujets.head:ulianovskahead'), // + шапка

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('sujets.main:ulianovskahead'), // основной блок контента

		sidebarRight: RGT('sujets.sidebarRight:ulianovskahead'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "ulianovskahead",
			type: "sujets"
		}
	}

};