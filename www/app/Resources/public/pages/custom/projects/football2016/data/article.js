module.exports = {

	toMerge: {

		meta: {
			blocks: [
				RGT('article.meta'), // метаинформация статьи

				RGT('article.ads:/spec/football2016/') // метаинформация для рекламы
			]
		},

		head: {
			blocks: [

				RGB('builder:project'),

				RGInclude('material', 'scripts'),
				
				RGInclude('custom/projects/football/global', 'styles'), // стили
				
				//RGInclude('custom/projects/football/global', 'scripts') // скрипты
				
			]
    	},

		main: {

			itemtype: "http://schema.org/NewsArticle",

			blocks: [

				RGB('projects.football.schedule'),

				{
					opt: {
						tag: "div",
						attrs: {
							"class": "page-wrapper"
						},

						blocks: [

							{
								opt: {
									tag: "div",
									attrs: {
										"class": "page page_project-article group"
									},

									blocks: [

										{
											opt: {
												tag: "div",
												attrs: {
													"class": "section-article"
												},

												blocks: [

													RGB('projects.football.material-head'),

													RGB('projects.football.material-wrapper'),

													RGB('projects.football.share, mobile'), // шаринг

													RGB('ads:under-materials'),

													// Комментарии
													{
														name: "bComment",
														opt: {
															tag: "div",
															attrs: {
																"id": "comments"
															}
														}
													},

													RGB('yadirect:under-materials'),

													//RGB('projects.football.feed, mobile'),

													RGB('projects.football.scores:aside, mobile tablet tabletLandscape'),

													RGB('projects.football.ads:aside, mobile'),

													//RGB('projects.football.scores, mobile'),

													//RGB('projects.football.news:under-materials'),

												]
											}
										},

										// Сайтбар
										RGB('projects.football.sidebar-right'),

										RGB('projects.football.news:last'), // новости

									]

								}
							}

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
			id: "football",
			uri: "football2016",
			type: "project-article"
		}
	}

};