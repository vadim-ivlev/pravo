
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/
 
/**
 * Подключения модуля
 */



$(function() {

    var $pageBlock = $('.is-page-reveal'),
        $tabBlock = $('.is-tab'),
        activeClass = 'b-rubricator-menu__item_active',
        elDataId = 'mod',
        $cardContentLink = $('.b-card__content .b-link'),
        $cardMediaLink = $('.b-card__media .b-link'),
        cardBlock = '.b-card';

    $tabBlock.on('click', function(){

        var tabData = $(this).data(elDataId);

        $tabBlock.removeClass(activeClass);
        $(this).addClass(activeClass);

        $pageBlock.each(function(){

            var pageData = $(this).data(elDataId);
                RG.logger.log(pageData);

            if (tabData === pageData ) {
                $pageBlock.hide();
                $(this).show()
            }

        });

        if(tabData == "is-page-region") {
            $(".js-contact").hide();
            $(".js-contact-region").show();
        } else {
            $(".js-contact").show();
            $(".js-contact-region").hide();
        }
    });

    function linkTrigger($link, $block){

        $link.on('click', function(){

            var itemIndex = $(this).parents($block).index() + 1;

            $tabBlock.eq(itemIndex).trigger('click');

            $(window).scrollTop(0);

        });
    }

    linkTrigger($cardContentLink, cardBlock);

    linkTrigger($cardMediaLink, cardBlock);

});