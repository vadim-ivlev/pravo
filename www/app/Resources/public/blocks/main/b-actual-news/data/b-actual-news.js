module.exports = {
	leftSide: { 
		title: "Последние новости",
		link: "/news.html",
		includes: [
			{
				path: "/include_xml/tmpl-b-feed/is-announce-only/index.xml",
				xml_var: "sujet_article_objects",
				num: 3
			},
			{
				path: "/include_xml/tmpl-b-feed/is-announce-only/has-large-image/is-spiegel/show-large_image/index.xml",
				xml_var: "sujet_article_objects",
				num: 1
			},
			{
				path: "/include_xml/tmpl-b-feed/is-announce-only/index.xml",
				xml_var: "sujet_article_objects",
				num: 13
			},
		],
		delay: 0
	},
	rightSide: { 
		link: "/news.html",
		includes: [
			"/include/tmpl-b-feed-tags/is-article-only/show-small_image/num-5/",
			"/include/tmpl-b-feed-tags/is-article-only/show-small_image/offset-5/num-3/"
		],
		delay: 0
	}
};