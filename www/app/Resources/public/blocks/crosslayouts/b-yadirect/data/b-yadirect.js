/*
 * ID Проекта (10-99) ID места (10-99) ID Эксперимента (1-9) Разрешение экрана (1-5)
 *
 * Например: 10 15 1 5
 *
 */

module.exports = {
	"sidebar-right": {
		project: 20, // ID проекта
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
	
	"sidebar-left": {
		project: 20, // ID проекта
		id: 11, // Место: левая колонка

		items: [
			{
				resolution: {
					tablet: true,
					tabletLandscape: true
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

	"main-mobile": {
		project: 20, // ID проекта
		id: 12, // Место: основной контент

		items: [
			{
				resolution: {
					mobile: true
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
	}
	
};