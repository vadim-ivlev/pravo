/*
 * Кастомная метаинформация
 * 
 */
module.exports = function(data){

	return {

		opt: {

			blocks: [
				{
					name: "sujetTitle",
					opt: {
						tag: "title",
						contents: [
							{
								data: "{{title}} &mdash; Российская газета"
							}
						]
					}
				},
				/*{
					name: "sujetDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "{{# comment}}{{comment}}{{/ comment}}{{^ comment}}{{title}}{{/ comment}}"
						}
					}
				},*/
				{
					name: "sujetOgUrl",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:url",
							content: "/sujet/{{coll_id}}/"
						}
					}
				},
				{
					name: "sujetOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "{{title}}"
						}
					}
				},
				{
					name: "rgAds",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"ads:uri\" content=\"/static/sujet-{{coll_id}}/\">" } // Для подключения рекламы
						]
					}
				},
				{
					name: "rgSujetId",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"sujet:id:first\" content=\"{{obj_id}}\" />" } // ID первого/главного сюжета
						]
					}
				},
			]
		}
	
	}
	
};