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
			
				RGB('projects.zilart.header'),

				{
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_index"
						},

						blocks: [
							RGB('projects.zilart.gallery:jumbotron'),

							RGB('projects.zilart.interview'),

							RGB('projects.zilart.news'),

							RGB('projects.zilart.gallery'),

							RGB('projects.zilart.ads:sidebar-right')
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
			uri: "zilart_index",
			id: "zilart",
			type: "project"
		}
	}

};