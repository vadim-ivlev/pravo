
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

/**
 * Подключение модуля перестановки блоков
 */

//RG.LoadChain = RG.LoadChain || require('../../../modules/LoadChain');

RG.BlockHidde = RG.BlockHidde || require('../../../modules/BlockHidde');

$(function() {

    // Инициализируем подгрузку
    //RG.LoadChain.initLoadChainCustom();

    RG.BlockHidde.init({
        srcLabel: '.b-news_spiegel-project',
        srcTargetLabel: '.b-news__list-item',
        destLabel: '.b-list-wrapper_project',
        destTargetLabel: '.b-news-inner__list-item'
    });

    /*
     * Инициализируем
     * акценты под новостями
     *
     */

    $('.b-accents_showcase .b-accents__list').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 1760,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });

    new RG.ListHeadToSelect('.b-list-head__name_related', '.b-list-head__row', '.b-list-head__related');
});