module.exports = {
	
	news: {
		opt: {
			tag: "div",
			attrs: {
				"class": "b-news-inner__list"
			},
			blocks: [
				{
					opt: {
						mustache: [
							"#block__spiegel" 
						],
						contents: [
							{
								path: pathMap.src.pages + "/includes/b-news-inner.swig",
								param: {
									object: "block__spiegel__",
									showBlocks: {
										theme: true,
										fascicles: true
									}
								}
							}
						]
					}
				}
			]
		}
	}
};