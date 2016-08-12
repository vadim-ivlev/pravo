module.exports = {
	'editor': {
		liveReload: false,
		ssi: true,
		placeId: 208,
		trans: false // обьединять акцент с трансляцией
	},
	'header': {
		liveReload: false,
		ssi: true,
		placeId: 168,
		placeDevId: 232,
		trans: true
	},
	'person': {
		liveReload: false,
		ssi: true,
		placeId: 205,
		trans: false
	},
	'projects': {
		liveReload: false,
		ssi: true,
		placeId: '{{# main_tema}}{{ main_tema__id }}{{/ main_tema}}{{^ main_tema}}206{{/ main_tema}}',
		trans: false
	},
	'showcase': {
		liveReload: false,
		ssi: true,
		placeId: 209,
		trans: false
	},
	'showcase-catalog': {
		liveReload: false,
		ssi: true,
		placeId: '{{# proj_id }}{{proj_id}}{{/ proj_id }}{{# catalog }}{{sect_id}}{{/ catalog }}',
		trans: false,
		includeSe: true
	},
	'views': {
		liveReload: false,
		ssi: true,
		placeId: 207,
		trans: false
	}
};