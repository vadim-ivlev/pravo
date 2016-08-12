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
								data: "Чемпионат мира по хоккею 2016 &mdash; Расписание/Результаты &mdash; Российская газета"
							}
						]
					}
				},
				{
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Чемпионат мира по хоккею 2016 &mdash; Расписание/Результаты &mdash; Российская газета"
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
				RGB('projects.hockey.schedule:full')
			]

		},
		
		
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "hockey2016",
			type: "schedule"
		}
	}

};