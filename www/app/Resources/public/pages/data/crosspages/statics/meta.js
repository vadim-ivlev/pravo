module.exports = function(data){

	return {

		opt: {

			blocks: [
				/*
				 * Кастомная метаинформация
				 *
				 */
				{
					name: "staticPageTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "{{{link_title}}} &mdash; Российская газета"
							}
						]
					}
				},
				{
					name: "staticPageDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "{{link_title}} &mdash; Российская газета"
						}
					}
				},
				{
					name: "staticPageOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "{{link_title}}"
						}
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/static/{{alias}}/ind\">" } // Для подключения рекламы
						]
					}
				}
				// Кастомная метаинформация
			]
		}
	
	}
	
};