module.exports = {
	
	superspToday: {
		opt: {
			tag: "div",
			attrs: {
				"id": "superspToday",
				"class": "b-news__list"
			},
			blocks: [
				{
					opt: {
						mustache: [
							"#block__supersp" 
						],
						contents: [
							{
								path: pathMap.src.pages + "/includes/b-news.swig",
								param: {
									object: "block__supersp__",
									showArm: true
								}
							}
						]
					}
				}
			]
		}
	}
};