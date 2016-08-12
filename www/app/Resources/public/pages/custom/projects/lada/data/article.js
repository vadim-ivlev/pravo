module.exports = {

	toMerge: {

		meta: {
			
			blocks: [
			
				RGT('meta'),
				
				RGT('article.meta'),

				RGT('article.ads:/spec/lada/'), // метаинформация для рекламы
				
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

		head: {
		
			blocks: [				
				RGInclude('material', 'scripts')
			]
			
    	},

		main: {

			itemtype: "http://schema.org/NewsArticle",

			blocks: [

				RGB('projects.lada.header'),

				{
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_article"
						},

						blocks: [

							RGB('material-head:art'),

							RGB('material-wrapper:art'),

							RGB('material-action:art'),

							RGB('projects.lada.ads:under-materials'),

							// Комментарии
							RGB('comment'),

							RGB('projects.lada.read-above')

						]
					}
				},

			]

		},

		sidebarRight: RGT('projects.sidebarRight:lada'),
				
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "lada_article",
			id: "lada",
			type: "project"
		}
	}

};