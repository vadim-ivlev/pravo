module.exports = {

    blocks: [
	
        RGB('footer'), // подвал сайта, + RGB partners, footer-links > counter, social
		
		RGB('ads:fullscreen'), // реклама fullscreen
		
		/*{
			name: "crosspagejQuery-1.11.3.minJS",
			opt: {
				contents: [
					{ data: "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js\"></script>" }
				]
			}
		},*/
		/*{
			name: "crosspagejQueryUi-1.11.4.minJS",
			opt: {
				contents: [
					{ data: "<script src=\"https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js\"></script>" }
				]
			}
		},*/
		{
			name: "crosspageYandexShare2",
			opt: {
				contents: [
					{ data: "<script src=\"https://yastatic.net/share2/share.js\"></script>" }
				]
			}
		},
		/*{
			name: "crosspageLibJs",
			opt: {
				contents: [
					{ data: "<script src=\"/res/scripts/lib.js\"></script>" }
				]
			}
		},
		{
			name: "crosspageRgGlobalJS",
			opt: {
				contents: [
					{ data: "<script src=\"/res/scripts/global.js\"></script>" }
				]
			}
		},*/
		
		/*
		 * Условные комментарии для IE
		 * 
		 */
		
		{
			name: "crosspageRgGlobalJS",
			opt: {
				contents: [
					{ data: "<!--[if lt IE 9]><script src=\"/vendor/conditional/html5.js\"></script><script src=\"/vendor/conditional/css3-mediaqueries.js\"></script><![endif]-->" }
				]
			}
		}
    ]
};
