module.exports = {
	protocol: "http",
	domain: "new-www.rg.ru",
	host: {
		img: "http://new-www.rg.ru"
	},
	path: {
		"source": {
			src: "/www/app/site/src",
			dest: "/www/app/site/dest"
		},
		"public": {
			img: "/res/images",
			styles: "/res/styles",
			scripts: "/res/scripts"
		}
	}
};