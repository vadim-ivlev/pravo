module.exports = {

    blocks: [
	
        RGB('projects.juristical.footer'), // подвал сайта, + RGB partners, footer-links > counter, social
		
		RGB('ads:fullscreen'), // реклама fullscreen
		
		{
			name: "crosspageYandexShare2",
			opt: {
				contents: [
					{ data: "<script src=\"https://yastatic.net/share2/share.js\"></script>" }
				]
			}
		},

		
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
