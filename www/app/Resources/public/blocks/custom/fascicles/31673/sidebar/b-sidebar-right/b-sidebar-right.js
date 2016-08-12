module.exports = function(data){

	return {
		
		name: "bSidebarRight",
		opt: {
			contents: [
				{
					param: {
						
						blocks: {

							issuePicture: RGB('issue-picture, mobile tablet tabletLandscape desktop'), // обложка выпуска

							contacts: RGB('fascicles.31673.contacts'), // контакты для спецвыпусков

							accentsProjects: RGB('accents:projects, desktop desktopFull:active'), // акценты "Спецпроекты"

							adsSidebarRight: RGB('ads:sidebar-right'), // баннер - правый сайдбар

							feedGazetaToday: RGB('feed:gazeta-today'), // другие свежие выпуски РГ на эту дату

							calendarStatic: RGB('calendar:static') // архив выпусков

						}

					}
				}
			]
		}
	
	}

};