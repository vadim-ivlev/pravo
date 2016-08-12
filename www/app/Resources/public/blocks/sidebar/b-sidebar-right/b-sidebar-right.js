/*
 * Правый сайдбар
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bSidebarRight",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							pressReleaseDesktop: RGB('top-news:press, desktop', '#region_catalog'), // блок пресс релизов
							
							exchange: RGB('exchange, desktop desktopFull:active'), // курсы валют

							mainToday: RGB('feed:main-today, desktop desktopFull:active'), // главное сегодня
							
							adsSidebarRight: RGB('ads:sidebar-right'), // баннер - правый сайдбар
							
							adsSidebarRightTop: RGB('ads:sidebar-right-top'), // баннер - правый сайдбар
							
							adsSidebarRightIndexBottom: RGB('ads:index-rigth-bottom'), // баннер - правый сайдбар - главная - низ
							
							adsSidebarRightCatalog: RGB('ads:sidebar-right-catalog'), // баннер - правый сайдбар в каталоге
							
							media: RGB('media, desktop desktopFull:active'), // медиа (фото/видео)
																				
							accentsProjects: RGB('accents:projects, desktop desktopFull:active'), // акценты "Спецпроекты"
							
							//accentsProjectsRegion: RGB('accents:projects, desktop desktopFull:active', '#region_catalog #path__sections__second'), // акценты "Спецпроекты" - в регионах все кроме первых уровней

							advert: RGB('advert:index'), // внутренние анонсы материалов

							accentsViews: RGB('accents:views, desktop desktopFull:active'), // акценты "Мнения"

							accentsEditor: RGB('accents:editor, desktop desktopFull:active'), // акценты "Выбор редакции"

							docs: RGB('docs, desktop desktopFull:active'), // свежие документы

							accentsPerson: RGB('accents:person, desktop desktopFull:active'), // акценты "Персоны RG.RU"

							themetopicCatalog: RGB('themetopic:catalog, desktop:active', '#block__themetopic__length'), // основные темы catalog

							feedVideoDoc: RGB('feed:video-doc'), // видео законы

							feedCommentDoc: RGB('feed:comment-doc'), // комментарии к документам

							metaDoc: RGB('material-meta:doc, desktop'), // метаинформаця document

							relatedDoc: RGB('material-related:doc, desktop'), // привязки document

							feedDocBinding: RGB('feed:doc-binding, desktop'), // связанные с документами материалы document

							issuePicture: RGB('issue-picture, mobile tablet tabletLandscape desktop'), // обложка выпуска
							
							feedGazetaToday: RGB('feed:gazeta-today'), // другие свежие выпуски РГ на эту дату
							
							calendarStatic: RGB('calendar:static'), // архив выпусков
							
							partners: RGB('ads:partners-sidebar-right'), // партнерки
							
							yandexDirect: RGB('yadirect:sidebar-right'), // Яндекс-директ
							
							tgbAnonse: RGB('ads:tgb-anonse-sidebar-right'), // ТГБ анонсирующие
							
							tgbSmall: RGB('ads:tgb-small-sidebar-right'), // ТГБ с большой картинкой
							
							tgb: RGB('ads:tgb-sidebar-right'), // ТГБ
							
							//turboroller: RGB('ads:turboroller-sidebar-right'), // turboroller

							mailingDoc: RGB('components:mailing_doc, desktop desktopFull:active'), // Компонент подписаться
							
							mailingFresh: RGB('components:mailing_fresh, desktop desktopFull:active'), // Компонент подписаться

							videoLaws: RGB('video-laws'), // Блок видеозакон

							relap: RGB('relap:rightSideBar'),  // Блок relap

							docFilters: RGB('search-filters:doc, desktop desktopFull:active') // Фильтры по документам
							
						},
						
						sortBlocks: {
							
							'default': "adsSidebarRightTop mainToday tgbAnonse tgb turboroller accentsProjects tgbSmall adsSidebarRight yandexDirect",
							
							index: "exchange mainToday media tgbAnonse tgb accentsProjects tgbSmall accentsViews accentsPerson adsSidebarRight docs videoLaws adsSidebarRightIndexBottom",
							
							article: "adsSidebarRightTop mainToday tgbAnonse tgb turboroller accentsProjects tgbSmall partners adsSidebarRight yandexDirect relap",
							
							document: "metaDoc relatedDoc mainToday mailingDoc tgbAnonse tgb turboroller accentsProjects tgbSmall adsSidebarRight feedDocBinding turboroller yandexDirect",
							
							catalog: "adsSidebarRightTop pressReleaseDesktop themetopicCatalog mainToday adsSidebarRightCatalog tgbAnonse tgb turboroller accentsProjects tgbSmall adsSidebarRight yandexDirect",
							
							doc: "feedCommentDoc tgbAnonse mailingDoc feedVideoDoc tgb tgbSmall adsSidebarRight turboroller yandexDirect",

							'doc_search': "docFilters",
							
							'gazeta-issues': "issuePicture mainToday mailingFresh accentsProjects adsSidebarRight feedGazetaToday calendarStatic yandexDirect",
							
							laws: "mainToday accentsProjects adsSidebarRight calendarStatic yandexDirect"
							
						}
						
					}
				}
			]
		}
	
	}

};