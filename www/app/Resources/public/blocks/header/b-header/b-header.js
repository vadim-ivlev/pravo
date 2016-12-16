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
							
							title: RGB('header&title'), // заголовок на страницах

							adBanner: RGB('ads:top'), // верхий баннер-растяжка

							menu: RGB('menu'), // низ шапки

							menuMobile: RGB('menu-mobile') // всплывающее меню на мобильных устройствах
							
						},

						sortBlocks: {

							'default': "logo title menu menuMobile",

							rubric_questions: "logo title adBanner menu",

							tag_questions: "logo title adBanner menu",

							error404: "logo"
						}
						
					}
				}
			]
		}
	
	}

};