/*
 * Структура файла конфигурации,
 * для сборки шаблонов страниц
 *
 * Это всегда JSON файл, но
 * в него можно добавлять комментарии,
 * которые вырежутся при компиляции
 *
 * Содержит свойства:
 *
 * 	@toMerge
 *
 */

module.exports = {
	/*
	 * В свойство @toMerge
	 * передаем структуру страницы,
	 * которую объединяем с шаблонным JSON (crosspages/page.js)
	 *
	 * Шаблонный JSON включает в себя:
	 *
	 * @head - с базовыми стилями, метаинформацией и скриптами
	 * @footer - подвал сайта
	 * @sidebarLeft - левый сайтбар страницы
	 * @meta - метаинформация о шаблоне.
	 *
	 */

	toMerge: {

		meta: {

			blocks: [

				RGT('meta'), // метаинформация

				/*
    			 * Кастомная метаинформация
    			 *
    			 */
    			{
					name: "indexTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Российская газета"
							}
						]
					}
				},
				{
					name: "indexDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Российская газета - издание Правительства Российской Федерации, официальный публикатор документов"
						}
					}
				},
				{
					name: "indexYandexVerification",
					opt: {
						tag: "meta",
						attrs: {
							name: "yandex-verification",
							content: "58d136a02371d7f6"
						}
					}
				},
				{
					name: "indexGoogleVerification",
					opt: {
						tag: "meta",
						attrs: {
							name: "google-site-verification",
							content: "ugPuY0OOWfC1Uu1hIYjlkh3aFPNiaXYANXylo8GZ7nU"
						}
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/static/main/ind\">" } // Для подключения рекламы
						]
					}
				}

			]

		},

		/*
		 * Шапка
		 *
		 */

		head: {

    		blocks: [

				RGInclude('index', 'styles'), // стили

				RGInclude('index', 'scripts') // скрипты

			]
		},

		sidebarLeft: RGT('sidebarLeft:index'), // левый сайдбар

		/*
		 * Основной блок контента
		 *
		 */

		main: {

		    blocks: [

		    	RGB('ads:top'), // баннер - верхняя перетяжка

		        RGB('header:index'), // шапка сайта, + элементы RGB info, menu, content

		        RGB('ads:central-header'), // баннер - перетяжка под шапкой

				RGB('date-panel'), // панель информации + RGB date-panel-fresh

				RGB('ads:central-stick'), // Реклама подписки

		        /*
				 * Основной контент
				 *
				 */

				{
					name: "mainContentItemMain",
					opt: {
						tag: "div",
						attrs: {
							"class": "b-content b-content_index"
						},

						blocks: [

							// Интерактивные шпигели
							{
								opt: {
									tag: "div",
									attrs: {
										"id": "supersp",
										"class": "b-news"
									}
								}
							},

							RGB('news:spiegel-index'), // супершпигели

							RGB('exchange, mobile tablet tabletLandscape'), // курсы валют

							RGB('feed:main-today, mobile tablet tabletLandscape'), // главное сегодня

							RGB('media, mobile tablet tabletLandscape'), // медиа (фото/видео)

							RGB('feed:last-news, mobile'), // последние новости

							RGB('news-inner:index'), // основные новости

							RGB('accents:showcase'), // акценты "Ветрина проектов"

							RGB('accents:projects, mobile tablet tabletLandscape'), // акценты "Спецпроекты"

							//RGB('press-release'), // ресс-релизы

							RGB('news-rubric:rgdigital'), // рубрика rgdigital

							RGB('news-rubric:auto'), // рубрика auto

							RGB('news-rubric:sila'), // рубрика sila

							RGB('news-rubric:guidepark'), // рубрика guidepark

							RGB('accents:views, mobile tablet tabletLandscape'), // акценты "Мнения"

							RGB('accents:person, mobile tablet tabletLandscape'), // акценты "Персоны RG.RU"

							RGB('docs, mobile tablet tabletLandscape'), // свежие документы

							//RGB('accents:editor, mobile tablet tabletLandscape'), // акценты "Выбор редакции"


						]

					}
				}

		    ]

		},

		sidebarRight: RGT('sidebarRight:index'), // правый сайдбар

		/*footer: {

			blocks: [

				RGInclude('index', 'scripts'), // скрипты

			]

    	},*/

		/*
		 * Метаинформация
		 *
		 */

		_meta: {
			uri: "index"
		}
	}

};