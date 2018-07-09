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

							logo: RGB('editions.amp.logo')

						},

						sortBlocks: {

							'default': "logo"
						}

					}
				}
			]
		}

	}

};