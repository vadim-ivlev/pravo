
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

/**
 * Подключение модуля перестановки блоков
 */

RG.LoadChain = RG.LoadChain || require('./modules/LoadChain');

$(function() {

    new RG.LoadChain();
});