$(function() {

    var $mainPageSelect = $('.is-main-page .b-field__select'),
        $tableItem = $('.is-table-item'),
        $infoPageSelectTgb = $('.is-info-materials .is-item-tgb .b-field__select'),
        $priceWrapperTgb = $('.is-item-tgb .is-price-wrapper'),
        $infoPageSelectBanner = $('.is-info-materials .is-item-banner .b-field__select'),
        $priceWrapperBanner = $('.is-item-banner .is-price-wrapper'),
        $col = $('.b__col'),
        pageBlock = $('.is-page-reveal'),
        tabBlock = $('.is-tab'),
        activeClass = 'b-rubricator-menu__item_active',
        elDataId = 'mod',
        $interactiveItemWrapper = $('.is-mobileApp .is-interactive-item'),
        $interactiveItem = $('.is-interactive-item .b__item'),
        $interactiveRow = $('.is-mobileApp .b__row'),
        interactiveRowItem = '.is-table-num-',
        isActiveClass = 'is-active',
        isCheckMobileForm = $('.is-check-mobile .b-form');



    $mainPageSelect.change(function(){

        var dataValue = $(this).find('option:selected').val();

        $tableItem.each(function(){

            $(this).hide();

            if ($(this).data('value') == dataValue) {

                $(this).show();
            }

        });

    });

    $infoPageSelectTgb.change(function(){

        var dataValue = $(this).find('option:selected').index();

        console.log(dataValue);

        $priceWrapperTgb.each(function(){

            $(this).find($col).hide();

            $(this).find($col).eq(dataValue).show();

        });

    });

    $infoPageSelectBanner.change(function(){

        var dataValue = $(this).find('option:selected').index();

        $priceWrapperBanner.each(function(){

            $(this).find($col).hide();

            $(this).find($col).eq(dataValue).show();

        });

    });

    tabBlock.on('click', function(){

        var tabData = $(this).data(elDataId);

        tabBlock.removeClass(activeClass);

        $(this).addClass(activeClass);

        pageBlock.each(function(){

            var pageData = $(this).data(elDataId);

            if (tabData === pageData ) {

                pageBlock.hide();

                $(this).show()
            }

        });

    });

    $interactiveItem.on('click', function(){

        var index = $(this).index(),

            $selectIndex = $(this).index(),

            interactiveRowClass = interactiveRowItem + index;

        $interactiveItem.removeClass(isActiveClass);

        $(this).addClass(isActiveClass);

        $('.is-interactive-item').each(function(){
            $(this).find('.b__item').eq($selectIndex).addClass(isActiveClass)
        });

        $($interactiveRow).removeClass(isActiveClass);

        $(interactiveRowClass).addClass(isActiveClass);

    });

    isCheckMobileForm.change(function(){

        var indexRadioChecked = $(this).find('input:checked').parents('label').index();

        console.log(indexRadioChecked);

        $interactiveItemWrapper.each(function(){


            if($(this).index() === indexRadioChecked ) {

                $interactiveItemWrapper.hide();

                $(this).show();

                console.log($(this).index());
            }
        });
    });

});