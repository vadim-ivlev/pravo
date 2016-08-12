/*
 * Левый сайдбар
 *
 */

module.exports = function(data){

	return {

		name: "bSidebarLeft",
		opt: {
			contents: [
				{
					param: {

						blocks: {

							lastNews: RGB('feed:last-news, tablet tabletLandscape desktop desktopFull:active'), // последние новости

							categories: RGB('categories, tablet tabletLandscape desktop desktopFull:active'), // меню

							scroll: RGB('scroll-block:sidebar-left') // скролл, содержит RGB ads:sidebar-left

						}

					}
				}
			]
		}

	}

};