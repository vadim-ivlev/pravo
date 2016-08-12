module.exports = {

	"sujets-custom": {
		limit: 25,
		type: "articles",
		"var": "catalog.articles",
		"class": "default",
		view: "b-news-inner",
		includes: [
			{
				path: "/include_xml/tmpl-b-news/show-x-large_image/main-only/sujet-5689/index.xml",
				"var": "spiegel_one",
				limit: 1,
				"class": "spiegel"
			},
			{
				path: "/include_xml/tmpl-b-news/show-large_image/main-only/sujet-5689/index.xml",
				"var": "spiegel_six",
				limit: 6,
				"class": "spiegel"
			}
		]
	}
};