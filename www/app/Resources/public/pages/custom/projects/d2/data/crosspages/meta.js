module.exports = {
	
	blocks: [
		{
			opt: {
				tag: "meta",
				attrs: {
					charset: "utf-8"
				}
			}
		},
		{
			opt: {
				tag: "meta",
				attrs: {
					property: "og:site_name",
					content: "Российская газета"
				}
			}
		},
		{
			opt: {
				tag: "meta",
				attrs: {
					name: "viewport",
					content: "width=device-width, initial-scale=1, maximum-scale=2.0"
				}
			}
		},
		{
			opt: {
				tag: "link",
				attrs: {
					rel: "shortcut icon",
					href: "//rg.ru/img/d/d2/favicon.ico"
				}
			}
		},
		{
			opt: {
				tag: "link",
				attrs: {
					rel: "icon",
					type: "image/x-icon",
					href: "//rg.ru/img/d/d2/favicon.ico"
				}
			}
		},
		{
			opt: {
				tag: "meta",
				attrs: {
					name: "rg-data",
					property: "env",
					content: "{{env}}"
				}
			}
		},
		{
			opt: {
				tag: "meta",
				attrs: {
					name: "rg-data",
					property: "ads:hide", // скрываем всю рекламу кроме adfox
					content: "true"
				}
			}
		},
		{
			opt: {
				tag: "meta",
				attrs: {
					name: "rg-data",
					property: "gaId", // скрываем всю рекламу кроме adfox
					content: "UA-7039329-17"
				}
			}
		},
		{
			opt: {
				tag: "meta",
				attrs: {
					name: "rg-data",
					property: "gaURI", // скрываем всю рекламу кроме adfox
					content: "{{uri}}"
				}
			}
		},
		{
			opt: {
				tag: "meta",
				attrs: {
					name: "rg-data",
					property: "yaMetrikaId", // скрываем всю рекламу кроме adfox
					content: "23797618"
				}
			}
		}
	]

};