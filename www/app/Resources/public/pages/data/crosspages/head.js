module.exports = {
	
	blocks: [
	
		RGInclude('modules/Fonts', 'scripts inline'), // подключение шрифтов
		
		{
			name: "crosspagejQueryUi-1.11.4.Style",
			opt: {
				tag: "link",
				attrs: {
					rel: "stylesheet",
					href: "https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.min.css"
				}
			}
		},
		{
			name: "crosspageLibStyle",
			opt: {
				tag: "link",
				attrs: {
					rel: "stylesheet",
					href: "https://rg.ru/res/styles/lib.css"
				}
			}
		},
		/*{
			name: "crosspageRgGlobalStyle",
			opt: {
				tag: "link",
				attrs: {
					rel: "stylesheet",
					href: "//rg.ru/res/styles/global.css"
				}
			}
		},*/
		{
			name: "crosspageRgGlobalProjectStyle",
			opt: {
				tag: "link",
				attrs: {
					rel: "stylesheet",
					href: "https://jurist.dev.rg.ru/res/styles/custom/projects/juristical/global.css"
				}
			}
		},
		{
			name: "crosspagejQuery-1.11.3.minJS",
			opt: {
				contents: [
					{ data: "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>" }
				]
			}
		},
		{
			name: "crosspagejQueryUi-1.11.4.minJS",
			opt: {
				contents: [
					{ data: "<script src=\"https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js\"></script>" }
				]
			}
		},
		{
			name: "crosspageLibJs",
			opt: {
				contents: [
					{ data: "<script src=\"https://rg.ru/res/scripts/lib.js\"></script>" }
				]
			}
		},
		// {
		// 	name: "crosspageRgGlobalJS",
		// 	opt: {
		// 		contents: [
		// 			{ data: "<script src=\"https://new-www.rg.ru/res/scripts/global.js\"></script>" }
		// 		]
		// 	}
		// },
		{
			name: "crosspageRgGlobalProjectJS",
			opt: {
				contents: [
					{ data: "<script src=\"https://rg.ru/res/scripts/custom/projects/juristical/global.js\"></script>" }
				]
			}
		},

		/* 
		 * Блок GTM для Агимы
		 *
		 */
		{
			opt: {
				contents: [
					{ data: "<noscript><iframe src=\"//www.googletagmanager.com/ns.html?id=GTM-5QP5L8\" height=\"0\" width=\"0\" styles=\"display:none;visibility:hidden\"></iframe></noscript>" }
				]
			}
		}

		//RGInclude('modules/GTM', 'scripts inline') // подключение GTM Agima
	]

};