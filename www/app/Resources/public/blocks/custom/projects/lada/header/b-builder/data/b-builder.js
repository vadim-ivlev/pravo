module.exports = {

	"project": {
		limit: 4,
		type: "articles",
		"var": "catalog.articles",
		"class": "default",
		view: "project-lada",
		includes: [
			{
				path: "/include_xml/tmpl-b-news/show-x-large_image/project-lada/index.xml",
				"var": "spiegel_top",
				limit: 2,
				"class": "spiegel"
			}
		]
	}
};