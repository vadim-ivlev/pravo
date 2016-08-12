
RG.LoadChain = RG.LoadChain || require('../../../modules/LoadChain');

$(function() {

    var $pageBlock = $('.is-page-reveal'),
        $tabBlock = $('.is-tab'),
        $formContainer = $('.is-form-container'),
        $FormActiveWrapper = $('.is-form-active .b__wrapper'),
        activeClass = 'b-rubricator-menu__item_active',
        elDataId = 'mod';

    $tabBlock.on('click', function(){

        var formHtml = $FormActiveWrapper.detach();

        var tabData = $(this).data(elDataId);

        $tabBlock.removeClass(activeClass);
        $(this).addClass(activeClass);

        $pageBlock.each(function(){

            var pageData = $(this).data(elDataId);

            if (tabData === pageData ) {
                $pageBlock.hide();
                $(this).show();

                $(this).find($formContainer).append(formHtml);
            }

        });
    });

    $('.is-main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.is-side-slider'
    });
    $('.is-side-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.is-main-slider',
        arrows: true,
        centerMode: false,
        adaptiveHeight: true,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 1,


                }
            },
            {
                breakpoint: 990,
                settings: {
                    vertical: false,
                    verticalSwiping: false,
                    slidesToShow: 3

                }
            },
        ]
    });

    new RG.LoadChain({
        elMap: {
            root: '#bNewsInnerChainAnn'
        }
    });

    new RG.LoadChain({
        elMap: {
            root: '#bNewsInnerChainRep'
        }
    });

    // Инициализируем скрипты меню
    //RG.bMenu.init();



});