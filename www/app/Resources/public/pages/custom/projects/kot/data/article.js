module.exports = {

	toMerge: {

		meta: {

			blocks: [

				RGT('meta'), // метаинформация

				RGT('article.meta'), // метаинформация статьи

				RGT('article.ads') // метаинформация для рекламы

			]

		},

		head: {
			blocks: [

				RGB('builder:project'), // builder

				RGInclude('project', 'styles'), // стили

				RGInclude('material', 'styles'), // стили

				RGInclude('custom/projects/kot/index', 'styles'),

				RGInclude('material', 'scripts'),

				RGInclude('custom/projects/kot/index', 'scripts')

			]
		},

		sidebarLeft: RGT('sidebarLeft:article'), // левый сайдбар

		// sidebarLeft: {

		// 	blocks: [
		// 		RGB('projects.kot.sidebar-left')
		// 	]

		// },

		/*
		 * Основной блок контента
		 *
		 */

		main: {

			itemtype: "http://schema.org/NewsArticle",

			blocks: [

				//RGB('projects.zvezdy_pobedy.header:projects'), // шапка сайта, + элементы RGB info, menu, content

				//RGB('ads:central-header'), // баннер - перетяжка под шапкой

				//RGB('projects.zvezdy_pobedy.branding-head:projects'), // брендированный баннер

				//RGB('projects.zvezdy_pobedy.list-head:projects'), // заголовок страницы

				RGB('projects.kot.header:projects'), // шапка сайта, + элементы RGB info, menu, content

				RGB('projects.kot.branding-head:projects'), // брендированный баннер

				RGB('material-head:art'), // шапка


				/*
				 * Центральный блок
				 *
				 */

				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_article"
						},

						blocks: [

							// Быстрый доступ к функционалу новости
							{
								name: "bFastAccess",
								opt: {
									tag: "div",
									attrs: {
										"id": "fastAccess"
									}
								}
							},

							// Дествия с текстом статьи
							{
								name: "textActions",
								opt: {
									tag: "div",
									attrs: {
										"id": "textActions"
									}
								}
							},

							RGB('material-wrapper:art'), // тело новости, + RGB material-img:art

							//RGB('feed:main-today, mobile tablet tabletLandscape'), // главное сегодня

							//RGB('material-sujet, mobile tablet tabletLandscape'), // следить за сюжетом

							RGB('material-action:art'), // отслеживать сюжет, + RGB share:art

							RGB('projects.kot.ads:under-materials'), // баннер

							RGB('material-read-same'), // Блок с сюжетом статьи и популярным на сайте

							// RGB('material-sujet', '#include_related_by_sujet__length'),

							// RGB('material-top', '^include_related_by_sujet__length'),

							// Комментарии
							RGB('comment'),

							//RGB('feed:main-today, mobile tablet tabletLandscape'), // главное сегодня

							//RGB('ads&relap:under-materials'), // релап

							RGB('ads:tgb-under-materials'), // ТГБ

							RGB('ads:partners-horizontal-one'), // партнерки

							RGB('yadirect:under-materials'), // Яндекс-директ

							RGB('ads:partners-horizontal-two'), // партнерки

							// RGB('actual-news') // Блок с актуальными новостями
							RGB('relap:underMaterial') 

						]

					}
				}

			]

		},

		//sidebarRight: RGT('projects.sidebarRight:kot'), // правый сайдбар
		sidebarRight: {

			blocks: [
				RGB('projects.kot.sidebar-right:article')
			]

		},

		/*
		 * Метаинформация
		 *
		 */

		_meta: {
			uri: "kot_article",
			id: "kot",
			type: "project"
		}

	}

};