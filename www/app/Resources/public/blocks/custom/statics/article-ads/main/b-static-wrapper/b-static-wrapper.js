/*
 * Тело страницы
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							materialWrapper: RGB('material-wrapper:art'), // тело новости, + RGB material-img:art
							
							adsUnderMaterials: RGB('ads:under-materials'), // баннер

							materialAction: RGB('material-action:art'),
														
							tgbUnderMaterials: RGB('ads:tgb-under-materials'), // ТГБ
							
							partnersHorizontalOne: RGB('ads:partners-horizontal-one'), // партнерки
														
							yadirectUnderMaterials: RGB('yadirect:under-materials'), // Яндекс-директ
							
							partnersHorizontalTwo: RGB('ads:partners-horizontal-two'), // партнерки

							actualNews: RGB('actual-news') // Блок с актуальными новостями
							
						}
						
					}
				}
			]
		}
	
	}

};