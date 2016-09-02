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
							
							footer: RGB('mailer&footer')
							
						}
						
					}
				}
			]
		}
	}
};