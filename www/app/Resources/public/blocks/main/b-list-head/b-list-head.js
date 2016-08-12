/*
 * Шапка шаблона списков
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							tabsRubricator: RGB('tabs:rubricator'), // меню rubricator
							tabsReklama: RGB('tabs:reklama'), // меню static.reklama
							tabsSubscription: RGB('tabs:subscription'), // меню static.subscription

							searchInfo: RGB('search-info'), // Доп информация поиска
							searchFiltersDocStatic: RGB('search-filters:doc'), // Фильтры поиска статические
							searchFiltersStatic: RGB('search-filters'), // Фильтры поиска статические
							searchFiltersDoc: RGB('search-filters:doc, mobile tablet tabletLandscape'), // Фильтры поиска
							
						}
						
					}
				}
			]
		}
	
	}

};