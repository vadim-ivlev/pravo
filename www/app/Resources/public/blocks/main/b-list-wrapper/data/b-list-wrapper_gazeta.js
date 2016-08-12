module.exports = {
		
	newsInnerDoc: {
		opt: {
			contents: 
			[
				{
					path: pathMap.src.pages + "/includes/b-news-inner.swig",
					param: {
						object: "fascicles__broadsides__sections__latest_objects__",
						hideDate: true,
						showBlocks: {
							stories: true
						},
						mod: "doc"
					}
				}
			]
			
		}
	},
	
	newsSpiegel: {
		opt: {
			contents: 
			[
				{
					path: pathMap.src.pages + "/includes/b-news.swig",
					param: {
						object: "fascicles__broadsides__sections__latest_objects__",
						hideDate: true,
						mod: "spiegel",
					}
				}
			]
			
		}
	},
	
	newsInner: {
		opt: {
			contents:
			[
				{
					path: pathMap.src.pages + "/includes/b-news-inner.swig",
					param: {
						object: "fascicles__broadsides__sections__latest_objects__",
						hideDate: true,
						showBlocks: {
							stories: true
						}
					}
				}
			]
			
		}
	}
	
};