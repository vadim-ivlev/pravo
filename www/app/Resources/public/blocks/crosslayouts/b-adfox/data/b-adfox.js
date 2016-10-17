/*
 * p2 тип баннера: "fkqy" - ТГБ (rg.ru), "fjgg" - Медийный (rg.ru) https://yadi.sk/i/i2AjLBPmtwP27
 * pp расположение: https://yadi.sk/i/yLAohJzutuX9J
 * uri - полный путь до кода вставки, начинается на //ads.adfox.ru
 * appear - доскролл (true)
 * screenType - показывать только на определенных разрешениях, если не указано, то показывать везде
 */

module.exports = {
	'media-1': { // Медийный #1 (Центральная перетяжка)
		pp: 'ibg'
	},
	'media-2': { // Медийный #2 (Левая колонка)
		pp: 'iix',
		screenType: 'tablet tabletLandscape desktop desktopFull'
	},
	'media-3': { // Медийный #3 (Левая колонка)
		pp: 'iom',
		screenType: 'tablet tabletLandscape desktop desktopFull'
	},
	/*'media-4': { // Медийный #4 (Правая колонка)
		pp: 'ijm',
		screenType: 'desktop desktopFull'
	},
	'media-5': { // Медийный #5 (Правая колонка)
		pp: 'ijn',
		screenType: 'desktop desktopFull'
	},
	'media-6': { // Медийный #6 (Правая колонка)
		pp: 'ijo',
		screenType: 'desktop desktopFull',
		appear: true
	},
	'media-7': { // Медийный #7 (Под материалом)
		pp: 'ijk'
	},
	'media-8': { // Правая колонка. Медийный #8 (RTB)
		pp: 'ikm',
		screenType: 'desktop desktopFull'
	},
	'media-9': { // Медийный #9 (FullScreen в footer)
		pp: 'ikr',
	},
	'media-10': { // Медийный #10 (верхняя перетяжка)
		pp: 'iks',
	},
	'media-11': { // Медийный #11 (рядом с верхним меню)
		pp: 'iku',
	},*/
	'media-12': { // Медийный #12 (в блоке "Юридическая консультация" на главной)
		pp: 'ikz',
		screenType: 'desktopFull'
	}/*,
	'tgb-1': { // ТГБ #1 (Правая колонка. ТГБ)
		pp: 'ijp',
		p2: 'fkqy',
		screenType: 'desktop desktopFull'
	},
	'tgb-2': { // ТГБ #2 (Правая колонка. ТГБ)
		pp: 'ijq',
		p2: 'fkqy',
		screenType: 'desktop desktopFull'
	},
	'tgb-3': { // ТГБ #3 (Правая колонка. ТГБ)
		pp: 'ijr',
		p2: 'fkqy',
		screenType: 'desktop desktopFull'
	},
	'tgb-4': { // ТГБ #4 (Правая колонка. ТГБ)
		pp: 'ijz',
		p2: 'fkqy',
		screenType: 'desktop desktopFull'
	},
	'tgb-5': { // ТГБ #5 (Правая колонка. ТГБ)
		pp: 'ika',
		p2: 'fkqy',
		screenType: 'desktop desktopFull'
	},
	'tgb-6': { // ТГБ #6 (Под материалом - mobile only)
		pp: 'ijl',
		p2: 'fkqy',
		screenType: 'mobile tablet'
	}*//*,
	'pravo-sidebar': { // правый сайдбар
		pp: 'iix',
		screenType: 'tablet tabletLandscape desktop desktopFull'
	}*/
};