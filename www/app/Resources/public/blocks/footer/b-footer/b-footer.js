/*
 * Подвал сайта + RGB partners, footer-links, social
 * 
 */
 
module.exports = function(data){

	return {
		
		name: "bFooter",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							vendors: RGB('footer&vendors'), // наши издания + RGB partners
							
							toggle: RGB('footer&toggle'), // скрыть-показать рубрики
							
							links: RGB('footer&links'), // ссылки + RGB vendors footer-links
							
							bottom: RGB('footer&bottom'), // кнопки в подвале + RGB social
							
							//categories: RGB('footer&categories') // категории
						}
						
					}
				}
			]
		}
	
	}

};