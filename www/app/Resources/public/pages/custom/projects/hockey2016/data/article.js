module.exports = {

	toMerge: {

		meta: {
			blocks: [
				RGT('article.meta'), // метаинформация статьи

				RGT('article.ads:/spec/hockey/') // метаинформация для рекламы
			]
		},

		head: {
			blocks: [

				RGB('builder:project'),

				RGInclude('material', 'scripts'),
				
				RGInclude('custom/projects/hockey/global', 'styles'), // стили
				
				//RGInclude('custom/projects/hockey/global', 'scripts') // скрипты
				
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

							RGB('projects.hockey.material-head'),

							RGB('projects.hockey.material-wrapper'),

							RGB('projects.hockey.share, mobile'), // шаринг

							RGB('ads:under-materials'),

							RGB('yadirect:under-materials'),

							// Комментарии
							RGB('comment'),

							RGB('projects.hockey.feed, mobile'),

							RGB('projects.hockey.ads:sidebar-right, mobile'),

							RGB('projects.hockey.scores, mobile'),

							RGB('projects.hockey.news:under-materials'),

						]
					}
				},

				// Сайтбар
				RGB('projects.hockey.sidebar-right')

			]

		},
				
		/*
		 * Метаинформация
		 * 
		 */

		_meta: {
			id: "hockey",
			type: "project-article"
		}
	}

};