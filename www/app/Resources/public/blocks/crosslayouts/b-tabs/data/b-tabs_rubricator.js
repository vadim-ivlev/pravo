module.exports = {
	tabs: [
		{
			name: "Рубрики",
			uri: "/rubricator/",
			mustache: "{{# rubricator_theme}}is-active{{/rubricator_theme}}"
		},
		{
			name: "Города",
			uri: "/rubricator/region.html",
			mustache: "{{# rubricator_region}}is-active{{/rubricator_region}}"
		},
		{
			name: "Организации",
			uri: "/rubricator/org.html",
			mustache: "{{# rubricator_org}}is-active{{/rubricator_org}}"
		}
	]
}