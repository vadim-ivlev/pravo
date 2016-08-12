
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

/**
 * Подключение модуля скрытия повторяющихся блоков
 */

//RG.BlockHidde = RG.BlockHidde || require('./modules/BlockHidde');

/**
 * Подключение модуля перестановки блоков
 */

//RG.LoadChain = RG.LoadChain || require('./modules/LoadChain');

$(function() {

    // Скрытие повторяшек (статей, дублирующихся в ленте)
    /*RG.BlockHidde.init({
        srcLabel: '.b-news_spiegel-sujet',
        srcTargetLabel: '.b-news__list-item',
        destLabel: '.b-list-wrapper_sujets',
        destTargetLabel: '.b-news-inner__list-item'
    });*/

    // Загрузить еще
    //RG.LoadChain.initLoadChainCustom();
    //RG.LoadChain.initLoadChainCatalog();

    //new RG.LoadChain.LoadChain();

});