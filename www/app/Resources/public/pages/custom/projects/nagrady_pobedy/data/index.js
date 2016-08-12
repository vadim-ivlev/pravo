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

				RGB('projects.nagrady_pobedy.static-wrapper')

			]

		},
				
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "nagrady_pobedy_index",
			id: "nagrady_pobedy",
			type: "project"
		}
	}

};