/*
 * ID Проекта (10-99) ID места (10-99) ID Эксперимента (1-9) Разрешение экрана (1-5)
 * ID проекта: 10 - основной сайт
 * 			   20 - юридическая консультация
 * Например: 10 15 1 5
 *
 */

module.exports = {
	"sidebar-right": {
		project: 10, // ID проекта
		id: 10, // Место: правая колонки
		
		items: [
			{
				resolution: {
					desktop: true,
					desktopFull: true
				},
				blocks: [
					{
						id: 1,
						rate: 100,
						yaDirect: {
							ad_format: "direct",
							font_size: "1",
							type: "vertical",
							border_type: "collapse",
							limit: 3,
							title_font_size: 1,
							links_underline: false,
							site_bg_color: "FFFFFF",
							border_color: "EEEEEE",
							title_color: "1F77BB",
							url_color: "9A9A9A",
							text_color: "000000",
							hover_color: "1F77BB",
							sitelinks_color: "1F77BB",
							favicon: true,
							no_sitelinks: true
						}
					}
				]
			}
		]
	},
	
	"actual-news": {
		project: 10, // ID проекта
		id: 11, // Место: в блоке "последние новости"
		
		items: [
			{
				resolution: {
					mobile: true,
					tablet: true,
					tabletLandscape: true,
					desktop: true,
					desktopFull: true
				},
				blocks: [
					{
						id: 1,
						rate: 100,
						yaDirect: {
							ad_format: "direct",
							font_size: "1",
							type: "horizontal",
							limit: 1,
							title_font_size: 1,
							links_underline: false,
							site_bg_color: "FFFFFF",
							title_color: "1F77BB",
							url_color: "9A9A9A",
							text_color: "000000",
							hover_color: "1F77BB",
							sitelinks_color: "1F77BB",
							favicon: true,
							no_sitelinks: true
						}
					}
				]
			}
		]
	},
	
	"under-materials": {
		project: 10, // ID проекта
		id: 12, // Место: под материалом
		
		items: [
			{
				resolution: {
					tabletLandscape: true,
					desktop: true,
					desktopFull: true
				},
				blocks: [
					{
						id: 1,
						rate: 100,
						yaDirect: {
							ad_format: "direct",
							font_size: "1",
							type: "grid",
							border_type: "collapse",
							limit: 4,
							title_font_size: 1,
							links_underline: false,
							site_bg_color: "FFFFFF",
							border_color: "EEEEEE",
							title_color: "1F77BB",
							url_color: "9A9A9A",
							text_color: "000000",
							hover_color: "1F77BB",
							sitelinks_color: "1F77BB",
							favicon: true,
							no_sitelinks: true
						}
					}
				]
			},
			{
				resolution: {
					mobile: true,
					tablet: true,
				},
				blocks: [
					{
						id: 1,
						rate: 100,
						yaDirect: {
							ad_format: "direct",
							font_size: "1",
							type: "vertical",
							border_type: "collapse",
							limit: 3,
							title_font_size: 1,
							links_underline: false,
							site_bg_color: "FFFFFF",
							border_color: "EEEEEE",
							title_color: "1F77BB",
							url_color: "9A9A9A",
							text_color: "000000",
							hover_color: "1F77BB",
							sitelinks_color: "1F77BB",
							favicon: true,
							no_sitelinks: true
						}
					}
				]
			}
		]
	},
	
	"footer-page": {
		project: 10, // ID проекта
		id: 13, // Место: над футером
		
		items: [
			{
				resolution: {
					tabletLandscape: true,
					desktop: true,
					desktopFull: true
				},
				blocks: [
					{
						id: 1,
						rate: 100,
						yaDirect: {
							ad_format: "direct",
							font_size: "1",
							type: "horizontal",
							border_type: "collapse",
							limit: 3,
							title_font_size: 1,
							links_underline: false,
							site_bg_color: "FFFFFF",
							border_color: "EEEEEE",
							title_color: "1F77BB",
							url_color: "9A9A9A",
							text_color: "000000",
							hover_color: "1F77BB",
							sitelinks_color: "1F77BB",
							favicon: true,
							no_sitelinks: true
						}
					}
				]
			},
			{
				resolution: {
					mobile: true,
					tablet: true,
				},
				blocks: [
					{
						id: 1,
						rate: 100,
						yaDirect: {
							ad_format: "direct",
							font_size: "1",
							type: "vertical",
							border_type: "collapse",
							limit: 3,
							title_font_size: 1,
							links_underline: false,
							site_bg_color: "FFFFFF",
							border_color: "EEEEEE",
							title_color: "1F77BB",
							url_color: "9A9A9A",
							text_color: "000000",
							hover_color: "1F77BB",
							sitelinks_color: "1F77BB",
							favicon: true,
							no_sitelinks: true
						}
					}
				]
			}
		]
	},
	
};