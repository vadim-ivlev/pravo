module.exports = function(data){

	return {
		
		name: "bSidebarRight",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							feed: RGB('projects.zvezdy_pobedy.feed, desktop:active'), // Лента вспомогательных статей

							vidget: RGB('projects.zvezdy_pobedy.vidget, desktop:active'), // виджет

							partners: RGB('projects.zvezdy_pobedy.contacts, desktopFull:active') // Партнеры

						}

					}
				}
			]
		}
	
	}

};