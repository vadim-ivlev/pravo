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
					href: "/res/styles/lib.css"
				}
			}
		},
		{
			name: "crosspageRgGlobalStyle",
			opt: {
				tag: "link",
				attrs: {
					rel: "stylesheet",
					href: "/res/styles/global.css"
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
					{ data: "{{^ preview }}<script src=\"/res/scripts/lib.js\"></script>{{/ preview }}" }
				]
			}
		},
		{
			name: "crosspageRgGlobalJS",
			opt: {
				contents: [
					{ data: "{{^ preview }}<script src=\"/res/scripts/global.js\"></script>{{/ preview }}" }
				]
			}
		},
		
		//RGInclude('modules/GTM', 'scripts inline') // подключение GTM Agima
	]

};