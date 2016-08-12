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
				
				RGInclude('/custom/projects/football/global', 'styles'), // стили
				
			]
		},
				
		
		/*
		 * Основной блок контента
		 * 
		 */

		schedule: {

			blocks: [

				RGB('projects.football.schedule') // распиание
			]
		},

		main: {

		    blocks: [

				RGB('projects.football.news'), // новости

				
				RGB('projects.football.scores'), // новости с турнирной таблицей

				RGB('projects.football.gmap'), // гуглокарта

				RGB('projects.football.media'),
				
				// RGB('projects.football.news:goalscorers'), // новости с таблицей бомбардиров

				RGB('projects.football.news:last'), // новости

			]

		},

		_meta: {
			uri: "football2016",
			type: "project-index"
		}
	}

};