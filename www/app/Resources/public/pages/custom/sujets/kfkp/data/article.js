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

				RGInclude('material', 'styles'), // стили

				RGInclude('custom/sujets/kfkp/index', 'styles'),

				RGInclude('material', 'scripts')

			]
		},

		sidebarLeft: RGT('sidebarLeft:article'), // левый сайдбар

		/*
		 * Основной блок контента
		 *
		 */

		main: {

			itemtype: "http://schema.org/NewsArticle",

			blocks: [

				RGB('ads:top'), // баннер - верхняя перетяжка

				RGB('sujets.kfkp.header:sujets'),

				RGB('sujets.kfkp.branding-head:sujets'), // брендированный баннер

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

							RGB('feed:art-binding', '#parents__maindocs__length'), // связанные документы с материалом

							//RGB('feed:main-today, mobile tablet tabletLandscape'), // главное сегодня

							//RGB('material-sujet, mobile tablet tabletLandscape'), // следить за сюжетом

							RGB('material-action:art'), // отслеживать сюжет, + RGB share:art

							RGB('ads:under-materials'), // баннер

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

		sidebarRight: RGT('sidebarRight:article'), // правый сайдбар

		footer: {

			blocks: [

				{
					opt: {
						contents: [
							{ data: "<script async src=\"https://relap.io/api/v6/head.js?token=G2Mb6m7qfYB93XRx\"></script>" }
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
			uri: "kfkp_article",
			id: "article",
			type: "sujet"
		}

	}

};