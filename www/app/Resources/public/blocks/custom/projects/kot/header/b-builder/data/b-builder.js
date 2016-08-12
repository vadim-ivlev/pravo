module.exports = {
	"project": {
		limit: 10,
		type: "articles",
		"var": "catalog.articles",
		"class": "default",
		view: "b-news-inner",
		includes: [
			{
				path: "/include_xml/tmpl-b-news/project-kot/index.xml",
				"var": "spiegel_six",
				limit: 6,
				"class": "spiegel"
			}
		]
	}
};