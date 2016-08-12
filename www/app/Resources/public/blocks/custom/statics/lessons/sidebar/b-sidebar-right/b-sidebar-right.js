module.exports = function(data){

	return {

		name: "bSidebarRight",
		opt: {
			contents: [
				{
					param: {

						blocks: {

							partners: RGB('statics.lessons.feed:sidebar, desktop desktopFull:active'), // Лента регламент конкурса

							vidget: RGB('statics.lessons.vidget, desktop desktopFull:active'), // виджет

							videoInner: RGB('statics.lessons.video-inner, desktop desktopFull:active'), // Видеопоток

							topNews: RGB('statics.lessons.top-news:sujet, desktopFull:active'), // блок top news

							calendar: RGB('statics.lessons.calendar-years, desktop desktopFull:active') // медиа кастомное (фото/видео)

						}

					}
				}
			]
		}

	}

};