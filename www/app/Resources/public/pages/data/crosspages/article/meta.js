/*
 * Метаинформация для всех шаблонов типа article
 *
 */

module.exports = function(data){

	return {

		opt: {

			blocks: [

				RGB('builder:article'), // builder

				/*
				 * Кастомная метаинформация
				 *
				 */
				{
					name: "articleTitle",
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
					name: "articleDescription",
					opt: {
						tag: "meta",
						attrs: {
							name: "description",
							content: "{{meta_description}}"
						}
					}
				},
				{
					name: "articleAuthors",
					opt: {
						tag: "meta",
						attrs: {
							name: "authors",
							content: "{{#authors_by_kind__length}}{{#authors_by_kind}}{{#authors_by_kind__authors}}{{name}}{{^authors_by_kind__authors__LAST__}},  {{/authors_by_kind__authors__LAST__}}{{/authors_by_kind__authors}}{{/authors_by_kind}}{{/authors_by_kind__length}}"
						}
					}
				},
				{
					name: "articleOgUrl",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:url",
							content: "{{frontend_uri}}"
						}
					}
				},
				{
					name: "articleOgImage",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:image",
							content: "{{#images_xlarge}}{{#images_xlarge__FIRST__}}{{uri}}{{/images_xlarge__FIRST__}}{{/images_xlarge}}{{^images_xlarge}}{{#images_large}}{{#images_large__FIRST__}}{{uri}}{{/images_large__FIRST__}}{{/images_large}}{{^images_large}}https://rg.ru/res/images/logo/rg-600x600.jpg{{/images_large}}{{/images_xlarge}}"
						}
					}
				},
				{
					name: "articleOgType",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:type",
							content: "article"
						}
					}
				},
				{
					name: "articleOgTitle",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:title",
							content: "{{link_title}}"
						}
					}
				},
				{
					name: "articleRelapRg",
					opt: {
						tag: "meta",
						attrs: {
							property: "relap-rg",
							content: "{{^ preview}}{{#images_xlarge__length}}recommendation{{/images_xlarge__length}}{{/ preview}}"
						}
					}
				},

				{
					name: "articleRelapRgSegment",
					opt: {
						tag: "meta",
						attrs: {
							property: "relap-rg-segment",
							content: "{{^ preview}}{{#images_xlarge__length}}rgru{{/images_xlarge__length}}{{/ preview}}"
						}
					}
				},
				{
					name: "articlePublishedTime",
					opt: {
						tag: "meta",
						attrs: {
							name: "rg-data",
							property: "article:published_time",
							content: "{{datetime__iso8601__ext}}"
						}
					}
				},
				{
					name: "articleImageSrc",
					opt: {
						tag: "link",
						attrs: {
							rel: "image_src",
							href: "{{#images_xlarge}}{{#images_xlarge__FIRST__}}{{uri}}{{/images_xlarge__FIRST__}}{{/images_xlarge}}{{^images_xlarge}}{{#images_large}}{{#images_large__FIRST__}}{{uri}}{{/images_large__FIRST__}}{{/images_large}}{{^images_large}}/res/images/logo/rg-600x600.jpg{{/images_large}}{{/images_xlarge}}"
						}
					}
				},
				{
					name: "rgArticleId",
					opt: {
						tag: "meta",
						attrs: {
							name: "rg-data",
							property: "article:id",
							content: "{{art_id}}"
						}
					}
				},
				{
					name: "rgRegUri",
					opt: {
						contents: [
							{ data: "{{# include_related_by_region__length}}<meta name=\"rg-data\" property=\"reg:uri\" content=\"{{# include_related_by_region}}{{uri_for_include}}{{^ include_related_by_region__LAST__}}, {{/ include_related_by_region__LAST__}}{{/ include_related_by_region}}\">{{/ include_related_by_region__length}}" } // Регионы dimension1
						]
					}
				},
				{
					name: "rgThemeUri",
					opt: {
						contents: [
							{ data: "{{# include_related_by_theme__length}}<meta name=\"rg-data\" property=\"theme:uri\" content=\"{{# include_related_by_theme}}{{uri_for_include}}{{^ include_related_by_theme__LAST__}}, {{/ include_related_by_theme__LAST__}}{{/ include_related_by_theme}}\">{{/ include_related_by_theme__length}}" } // Темы dimension2
						]
					}
				},
				{
					name: "rgOrgUri",
					opt: {
						contents: [
							{ data: "{{# include_related_by_org_filials_only__length}}<meta name=\"rg-data\" property=\"org:uri\" content=\"{{# include_related_by_org_filials_only}}{{uri_for_include}}{{^ include_related_by_org_filials_only__LAST__}}, {{/ include_related_by_org_filials_only__LAST__}}{{/ include_related_by_org_filials_only}}\">{{/ include_related_by_org_filials_only__length}}" } // Организации dimension3
						]
					}
				},
				{
					name: "rgProjectUri",
					opt: {
						contents: [
							{ data: "{{# main_project__uri}}<meta name=\"rg-data\" property=\"project:uri\" content=\"project-{{main_project__uri}}\">{{/ main_project__uri}}" } // Проекты dimension4
						]
					}
				},
				{
					name: "rgFascicle",
					opt: {
						contents: [
							{ data: "{{# fascicle_uri}}<meta name=\"rg-data\" property=\"fascicle:uri\" content=\"{{fascicle_uri}}\">{{/ fascicle_uri}}" } // Выпуски dimension5
						]
					}
				},
				{
					name: "rgArticleAuthorUri",
					opt: {
						contents: [
							{ data: "{{# authors__length}}<meta name=\"rg-data\" property=\"author:uri\" content=\"{{# authors}}{{uri}}{{^ authors__LAST__}}, {{/ authors__LAST__}}{{/ authors}}\">{{/ authors__length}}" } // Авторы dimension6
						]
					}
				},
				{
					name: "rgArticleAuthorName",
					opt: {
						contents: [
							{ data: "{{# authors__length}}<meta name=\"rg-data\" property=\"author:name\" content=\"{{# authors}}{{name}}{{^ authors__LAST__}}, {{/ authors__LAST__}}{{/ authors}}\">{{/ authors__length}}" } // Авторы имена chartbeat
						]
					}
				},
				{
					name: "rgArticleTextLength",
					opt: {
						tag: "meta",
						attrs: {
							name: "rg-data",
							property: "article:length",
							content: "{{text_wo_tags_length}}"
						} // Длинна текста (статьи) dimension9
					}
				},
				{
					name: "rgSujetUri",
					opt: {
						contents: [
							{ data: "{{# include_related_by_sujet__length}}<meta name=\"rg-data\" property=\"sujet:uri\" content=\"{{# include_related_by_sujet}}{{uri_for_include}}{{^ include_related_by_sujet__LAST__}}, {{/ include_related_by_sujet__LAST__}}{{/ include_related_by_sujet}}\">{{/ include_related_by_sujet__length}}" } // Сюжеты dimension7
						]
					}
				},
				{
					name: "rgSujetIdFirst",
					opt: {
						contents: [
							{ data: "{{# include_related_by_sujet__length}}<meta name=\"rg-data\" property=\"sujet:id:first\" content=\"{{# include_related_by_sujet}}{{# include_related_by_sujet__FIRST__}}{{obj_id}}{{/ include_related_by_sujet__FIRST__}}{{/ include_related_by_sujet}}\">{{/ include_related_by_sujet__length}}" } // ID первого/главного сюжета
						]
					}
				},
				{
					name: "rgSujetTitleFirst",
					opt: {
						contents: [
							{ data: "{{# include_related_by_sujet__length}}<meta name=\"rg-data\" property=\"sujet:title:first\" content=\"{{# include_related_by_sujet}}{{# include_related_by_sujet__FIRST__}}{{title}}{{/ include_related_by_sujet__FIRST__}}{{/ include_related_by_sujet}}\">{{/ include_related_by_sujet__length}}" } // Заголовок первого/главного сюжета
						]
					}
				},
				{
					name: "rgSectionName",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"section:name\" content=\"{{# main_tema}}{{main_tema__title}}, {{/ main_tema}}{{# main_project}}{{main_project__title}}, {{/ main_project}}{{# site_only_publication}}Сайт{{/ site_only_publication}}{{^ site_only_publication}}Газета{{/ site_only_publication}}\">" } // Разделы сайта Рубрики, Проекты, Сайт/Газета
						]
					}
				},
				{
					name: "rgLiveinternetCustom",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"customLiveinternet\" content=\"{{# is_theme_digital}}RGINTERNET {{/ is_theme_digital}}{{# is_theme_ekonomika}}RGRU {{/ is_theme_ekonomika}}{{# is_theme_sport}}RGSPORT {{/ is_theme_sport}}{{# is_theme_rodina}}Rodina {{/ is_theme_rodina}}\">" } // Дополнительные счетчики Liveinternet (с обязательным пробелом на конце, для скрипта)
						]
					}
				},
				{
					name: "rgPreview",
					opt: {
						contents: [
							{ data: "<meta name=\"rg-data\" property=\"preview\" content=\"{{preview}}\">" } // Если предпросмотр
						]
					}
				}

			]
		}

	}

};