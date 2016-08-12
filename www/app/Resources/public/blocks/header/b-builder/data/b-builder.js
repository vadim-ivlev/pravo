module.exports = {
	"author": {
		limit: 25,
		type: "articles",
		"var": "catalog.articles",
		"class": "default",
		view: "b-news-inner"
	},
	"catalog": {
		limit: 25,
		type: "articles",
		"var": "catalog.articles",
		"class": "default",
		view: "b-news-inner",
		includes: [
			{
				path: "/include_xml/tmpl-b-news/show-x-large_image/{{# theme_catalog}}is-spiegel/tema{{/ theme_catalog}}{{# region_catalog}}sujet-3177/reg{{/ region_catalog}}{{# org_catalog}}is-spiegel/org{{/ org_catalog}}-{{this_section__sect_id}}/index.xml",
				"var": "spiegel_one",
				limit: 1,
				"class": "spiegel"
			},
			{
				path: "/include_xml/tmpl-b-news/show-large_image/{{# theme_catalog}}is-spiegel/tema{{/ theme_catalog}}{{# region_catalog}}sujet-3177/reg{{/ region_catalog}}{{# org_catalog}}is-spiegel/org{{/ org_catalog}}-{{this_section__sect_id}}/index.xml",
				"var": "spiegel_six",
				limit: 6,
				"class": "spiegel"
			}
		]
	},
	"project": {
		limit: 25,
		type: "articles",
		"var": "catalog.articles",
		"class": "default",
		view: "b-news-inner",
		includes: [
			{
				path: "/include_xml/tmpl-b-news/show-large_image/is-spiegel/project-{{uri}}/index.xml",
				"var": "spiegel_six",
				limit: 6,
				"class": "spiegel"
			}
		]
	},
	"sujets": {
		limit: 25,
		type: "articles",
		"var": "catalog.articles",
		"class": "default",
		view: "b-news-inner",
		includes: [
			{
				path: "/include_xml/tmpl-b-news/show-large_image/is-spiegel/sujet-{{coll_id}}/index.xml",
				"var": "spiegel_six",
				limit: 6,
				"class": "spiegel"
			}
		]
	},
	"sujets-custom": {
		limit: 25,
		type: "articles",
		"var": "catalog.articles",
		"class": "default",
		view: "b-news-inner",
		includes: [
			{
				path: "/include_xml/tmpl-b-news/show-large_image/main-only/sujet-{{coll_id}}/index.xml",
				"var": "spiegel_six",
				limit: 6,
				"class": "spiegel"
			}
		]
	}
};