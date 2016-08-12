module.exports = {

	toMerge: {

		meta: {

			blocks: [
			
				RGT('meta'),
				
				RGT('projects.meta'),
				
				{
					opt: {
						tag: "meta",
						attrs: {
							name: "rg-data",
							property: "ads:hide", // скрываем всю рекламу кроме adfox
							content: "true"
						}
					}
				}
				
			]

		},

		main: {

			blocks: [
			
				RGB('projects.lada.header'),

				{
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_index"
						},

						blocks: [
							RGB('projects.lada.gallery:jumbotron'),

							RGB('projects.lada.news'),

							RGB('projects.lada.rgtube:main')
						]
					}
				}
				
			]

		},
				
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "lada_index",
			id: "lada",
			type: "project"
		}
	}

};