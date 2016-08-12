module.exports = {
	
	toMerge: {
		
		meta: {
			
			blocks: [
				RGT('meta'),

				{
					opt: {
						tag: "title",
						contents: [
							{
								data: "Чемпионат Европы по футболу 2016 &mdash; Расписание/Результаты &mdash; Российская газета"
							}
						]
					}
				},
				{
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Чемпионат Европы по футболу 2016 &mdash; Расписание/Результаты &mdash; Российская газета"
						}
					}
				},
			]
			
		},
		
		/*
		 * Шапка
		 * 
		 */
		
		head: {

    		blocks: [
				
				RGInclude('/custom/projects/football/global', 'styles'), // стили
				
				RGInclude('/custom/projects/football/global', 'scripts') // скрипты
				
			]
		},
				
		
		/*
		 * Основной блок контента
		 * 
		 */

		main: {

		    blocks: [
		    	RGB('projects.football.ads:central-header'),
		    	
				RGB('projects.football.schedule:full')
			]

		},
		
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "football2016",
			type: "schedule"
		}
	}

};