module.exports = {

	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'), // метаинформация
				
				RGT('projects.meta'), // метаинформация проектов
			
			]
			
		},
		
		head: RGT('projects.head'), // + RGT project.meta

		sidebarLeft: RGT('sidebarLeft'), // левый сайдбар
		
		main: RGT('projects.main'), // основной блок контента

		sidebarRight: RGT('sidebarRight:project'), // правый сайдбар
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			type: "project"
		}
	}

};