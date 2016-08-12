module.exports = {

	toMerge: {

		meta: {
			
			blocks: [
			
				RGT('meta'),
				
				RGT('article.meta'),

				RGT('article.ads:/spec/zilart/'), // метаинформация для рекламы
				
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

				RGB('projects.zilart.header'),

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

							RGB('projects.zilart.ads:under-materials')

						]
					}
				},

			]

		},

		sidebarRight: RGT('projects.sidebarRight:zilart'),
				
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "zilart_article",
			id: "zilart",
			type: "project"
		}
	}

};