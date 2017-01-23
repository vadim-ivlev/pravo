/*
 * Шапка
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bHeader",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							logo: RGB('logo'), // логотип

							adBanner: RGB('ads:top'), // верхий баннер-растяжка

							menu: RGB('menu'), // низ шапки

							menuMobile: RGB('menu-mobile') // всплывающее меню на мобильных устройствах
							
						},

						sortBlocks: {

							'default': "logo menu menuMobile",

							rubric_questions: "logo adBanner menu",

							tag_questions: "logo adBanner menu",

							error404: "logo"
						}
						
					}
				}
			]
		}
	
	}

};