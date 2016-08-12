module.exports = function(data){

	return {

		opt: {

			blocks: [
				/*
    			 * Кастомная метаинформация
    			 * 
    			 */
    			{
					name: "projectPageTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "{{{title}}}{{# subtitle}} &mdash; {{subtitle}}{{/ subtitle}}"
							}
						]
					}
				},
				{
					name: "projectPageDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "{{title}}{{# subtitle}} &mdash; {{subtitle}}{{/ subtitle}} &mdash; Российская газета"
						}
					}
				},
				{
					name: "projectPageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "{{title}}{{# subtitle}} &mdash; {{subtitle}}{{/ subtitle}}"
						}
					}
				},
				{
					name: "rgProjectUri",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"project:uri\" content=\"project-{{uri}}\">" } // Проекты dimension4
						]
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/spec/{{uri}}/ind\">" } // Для подключения рекламы
						]
					}
				}
			]
		}
	
	}
	
};