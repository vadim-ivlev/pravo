module.exports = {
	
	toMerge: {
		
		meta: {
			
			blocks: [
			
				RGT('meta'),

				RGT('projects.meta'),
			
			]
			
		},
		
		/*
		 * Шапка
		 * 
		 */
		
		head: {

    		blocks: [
				
				RGInclude('/custom/projects/hockey/global', 'styles'), // стили
				
				RGInclude('/custom/projects/hockey/global', 'scripts') // скрипты
				
			]
		},
				
		
		/*
		 * Основной блок контента
		 * 
		 */

		main: {

		    blocks: [

				RGB('projects.hockey.schedule'), // распиание

				RGB('projects.hockey.news'), // новости

				RGB('projects.hockey.media'),

				RGB('projects.hockey.news:scores'), // новости с турнирной таблицей

				RGB('projects.hockey.news:goalscorers'), // новости с таблицей бомбардиров

				RGB('projects.hockey.news:last'), // новости

			]

		},

		// /*
		//  * Левый сайдбар
		//  * 
		//  */

		// sidebarLeft: {

	 // 		blocks: [
				
		// 		RGB('projects.juristical.sidebar-left')
				
		// 	]
		// },

		// /*
		//  * Правый сайдбар
		//  *
		//  */

		// sidebarRight: {

  //   		blocks: [
				
		// 		RGB('projects.juristical.sidebar-right')
				
		// 	]
		// },
		
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "hockey2016",
			type: "project-index"
		}
	}

};