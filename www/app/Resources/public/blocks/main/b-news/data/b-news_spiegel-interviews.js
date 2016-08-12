module.exports = {
			
	newsSpiegel: {
		opt: {
			
			blocks: [
				{
					opt: {
						contents: 
						[
							{
								path: pathMap.src.pages + "/includes/b-news.swig",
								param: {
									object: 'latest_interviews__',
									mod: "spiegel",
									showBlocks: {
										persons: true
									}
								}
							}
						]
						
					}	
				}
			]
			
		}
	},
	
	news: {
		opt: {
			
			blocks: [
				{
					opt: {
						contents: 
						[
							{
								path: pathMap.src.pages + "/includes/b-news.swig",
								param: {
									object: 'latest_interviews__',
									showBlocks: {
										persons: true
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