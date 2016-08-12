/*
 * Блок с сюжетом статьи и популярным на сайте
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bMaterialReadSame",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							materialSujet : RGB('material-sujet', '#include_related_by_sujet__length'), // следить за сюжетом

							materialRubric : RGB('material-sujet:rubric', '^include_related_by_sujet__length #include_related_by_theme__length'), // следить за рубрикой

							topNews : RGB('top-news'), // Лучшие материалы
							
						}
						
					}
				}
			]
		}
	
	}

};