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
			name: "crosspageMetaFavicon",
			opt: {
				tag: "link",
				attrs: {
					rel: "shortcut icon",
					href: "/favicon.ico"
				}
			}
		},
		{
			opt: {
				tag: "link",
				attrs: {
					rel: "apple-touch-icon",
					sizes: "76x76",
					href: "/touch-icon-ipad.png"
				}
			}
		},
		{
			opt: {
				tag: "link",
				attrs: {
					rel: "apple-touch-icon",
					sizes: "120x120",
					href: "/touch-icon-iphone-retina.png"
				}
			}
		},
		{
			opt: {
				tag: "link",
				attrs: {
					rel: "apple-touch-icon",
					sizes: "152x152",
					href: "/touch-icon-ipad-retina.png"
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
					property: "gaURI",
					content: "{{uri}}"
				}
			}
		}
	]

};