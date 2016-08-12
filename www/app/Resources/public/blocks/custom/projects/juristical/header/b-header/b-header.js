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
							
							logo: RGB('projects.juristical.logo'), // логотип
							
							title: RGB('projects.juristical.header&title'), // заголовок на страницах

							adBanner: RGB('projects.juristical.ads:top'), // верхий баннер-растяжка

							menu: RGB('projects.juristical.menu') // низ шапки
							
						},

						sortBlocks: {

							'default': "logo title menu",

							rubric_questions: "logo title adBanner menu",

							tag_questions: "logo title adBanner menu"
						}
						
					}
				}
			]
		}
	
	}

};