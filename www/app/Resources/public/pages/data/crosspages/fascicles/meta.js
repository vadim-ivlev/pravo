/*
 * Кастомная метаинформация
 * 
 */
module.exports = function(data){

	return {

		opt: {

			blocks: [
				/*
    			 * Кастомная метаинформация
    			 * 
    			 */
    			{
					name: "gazetaTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "Свежий номер {{# fascicles}}{{# fascicles__FIRST__}}{{fascicle__title}}{{# fascicle__subtitle}}: {{fascicle__subtitle}}{{/ fascicle__subtitle}} {{{fascicle__readable_date}}} № {{fascicle__number}}{{/ fascicles__FIRST__}}{{/ fascicles}}"
							}
						]
					}
				},
				{
					name: "gazetaDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "Свежий номер Российской газеты"
						}
					}
				},
    			{
					name: "gazetaOgUrl",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:url",
							content: "{{arhiv_svezh_uri}}"
						}
					}
				},
				{
					name: "gazetaOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "Свежий номер Российской газеты"
						}
					}
				},
				{
					name: "rgFascicle",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"fascicle:uri\" content=\"{{uri}}\">" } // Выпуски dimension5
						]
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"{{# title_id}}/gazeta/{{title_id}}/ind/{{/ title_id}}{{^ title_id}}/gazeta/svezh/ind/{{/ title_id}}\">" } // Для подключения рекламы
						]
					}
				},
			]
		}
	
	}
	
};