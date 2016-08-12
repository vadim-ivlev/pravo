/*
 * Метаинформация подключения рекламы для всех шаблонов типа article
 * 
 */
 
module.exports = function(data){

	return {
	
		opt: {

			blocks: [
			
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: (data.mod) ? "<meta name=\"rg-data\" property=\"ads:uri\" content=\"" + data.mod + "\">" : "<meta name=\"rg-data\" property=\"ads:uri\" content=\"{{ads_uri}}\">" } // Для подключения рекламы
						]
					}
				}
			]
		}
	
	}
	
};