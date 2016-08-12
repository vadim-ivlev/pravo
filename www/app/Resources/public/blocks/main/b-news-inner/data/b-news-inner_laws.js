module.exports = {
		
	news: {
		opt: {
			mustache: [
				"#documents" 
			],
			contents: 
			[
				{
					path: pathMap.src.pages + "/includes/b-news-inner.swig",
					param: {
						mod: "doc"
					}
				}
			]
			
		}
	}
	
};