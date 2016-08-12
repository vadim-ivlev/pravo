
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

/**
 * Подключение модуля перестановки блоков
 */

RG.LoadChain = RG.LoadChain || require('./modules/LoadChain');

$(function() {
    
    new RG.LoadChain();

    /*
     * Инициализируем
     * акценты под новостями
     *
     */

    $('.b-accents_showcase .b-accents__list').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1760,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    
});