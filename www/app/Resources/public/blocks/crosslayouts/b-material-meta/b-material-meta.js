/*
 * Метаинформация
 * 
 */
 
module.exports = function(data){

	return {
	
		name: "bMaterialMeta",
		opt: {
			tag: "div",
			shift: data.shift,
			contents: [
				{
					path: pathMap.src.blocks + "/crosslayouts/b-material-meta/swig/b-material-meta_"+ data.mod +".swig",
					param: {
						data: {
							meta: require(pathMap.src.blocks + '/crosslayouts/b-material-meta/data/b-material-meta_'+ data.mod),
							mod: data.mod,
						}
					}
				}
			]
		}
	
	}
	
};