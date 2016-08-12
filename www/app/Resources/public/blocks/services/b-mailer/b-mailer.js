/*
 * Шаблоны писем для рассылок
 * 
 */
 
module.exports = function(data){

	return {
		
		opt: {
			contents: [
				{
					param: {
						
						blocks: {
							
							header: RGB('mailer&header'),

							header_side: RGB('mailer&header_side'),

							header_center: RGB('mailer&header_center'),
							
							footer: RGB('mailer&footer')
							
						}
						
					}
				}
			]
		}
	}
};