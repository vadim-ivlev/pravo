module.exports = {

	"sujets-custom": {
		limit: 10,
		type: "articles",
		"var": "catalog.articles",
		"class": "default",
		view: "b-news-inner",
		includes: [
			{
				path: "/include_xml/tmpl-b-news/show-x-large_image/sujet-5677/obj-article/main-only/index.xml",
				"var": "spiegel_one",
				limit: 1,
				"class": "spiegel"
			},
			{
				path: "/include_xml/tmpl-b-news/show-large_image/sujet-5677/obj-article/main-only/index.xml",
				"var": "spiegel_six",
				limit: 6,
				"class": "spiegel"
			}
		]
	}
};