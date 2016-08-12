module.exports = {

	toMerge: {

		meta: {
			blocks: [
				RGT('article.meta'), // метаинформация статьи

				RGT('article.ads') // метаинформация для рекламы
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

				{
					opt: {
						tag: "div",
						attrs: {
							"class": "section-article"
						},

						blocks: [

							RGB('projects.d2.material-head:art'),

							RGB('projects.d2.material-wrapper:art'),

						]
					}
				},

			]

		},

		sidebar: RGT('projects.sidebarRight:d2'),
				
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			uri: "d2",
			id: "d2",
			type: "project"
		}
	}

};