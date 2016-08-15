/*module.exports = {
	protocol: "http",
	domain: "new-www.rg.ru",
	host: {
		img: "http://new-www.rg.ru"
	},
	path: {
		"public": {
			img: "/res/images",
			styles: "/res/styles",
			scripts: "/res/scripts",
			tmpl: "/res/templates"
		}
	}
};*/

module.exports = function(data){

	return {
	
		opt: {
		
			blocks: [
				{
					name: "crosspageMetaCharset",
					opt: {
						tag: "meta",
						attrs: {
							charset: "utf-8"
						}
					}
				},
				{
					name: "crosspageOgSiteName",
					opt: {
						tag: "meta",
						attrs: {
							property: "og:site_name",
							content: "Российская газета"
						}
					}
				},
				{
					name: "crosspageMetaViewport",
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
							href: "https://rg.ru/favicon.ico"
						}
					}
				},
				{
					name: "crosspageMetaFaviconAppleTouch",
					opt: {
						tag: "link",
						attrs: {
							rel: "apple-touch-icon",
							sizes: "76x76",
							href: "https://rg.ru/touch-icon-ipad.png"
						}
					}
				},
				{
					name: "crosspageMetaFaviconIphoneRetina",
					opt: {
						tag: "link",
						attrs: {
							rel: "apple-touch-icon",
							sizes: "120x120",
							href: "//rg.ru/touch-icon-iphone-retina.png"
						}
					}
				},
				{
					name: "crosspageMetaFaviconIpadRetina",
					opt: {
						tag: "link",
						attrs: {
							rel: "apple-touch-icon",
							sizes: "152x152",
							href: "//rg.ru/touch-icon-ipad-retina.png"
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
				}
			
			]
		}
	}
};