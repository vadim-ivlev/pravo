/*
 * Helpers
 *
 */

// Установка списка блоков
/*var setBlocks = function(listPath) {
	
    blocks = [];

    listPath.forEach(function(opt, i){
		
		if (opt.param) {
			blocks.push(require(opt.path)(opt.param)); // если есть дополнительные параметры
		} else {
			blocks.push(require(opt.path));
		}
		
    });
	
	//console.log(blocks);
	
    return blocks;

};*/

module.exports = {
    //setBlocks: setBlocks
};