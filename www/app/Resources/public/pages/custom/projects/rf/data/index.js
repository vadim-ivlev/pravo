module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('projects.meta'), // метаинформация проектов
			
			]
			
		},
		
		head: RGT('projects.head:rf'), // + RGT static.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('projects.main:rf'), // основной блок контента

		sidebarRight: RGT('projects.sidebarRight:rf'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "rf",
			id: "rf",
			type: "project"
		}
	}

};