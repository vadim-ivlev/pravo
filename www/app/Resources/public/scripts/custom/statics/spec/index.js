
$(function() {

    var $tab = $(".b-rubricator-menu__item"),
        $item = $(".b__row"),
        tabActive = "b-rubricator-menu__item_active";


    $tab.on('click', function(){
        var tabIndex = $(this).index();
        $tab.removeClass(tabActive);
        $(this).addClass(tabActive);
        $item.hide();
        $item.eq(tabIndex).show();
    });

    new RG.ListHeadToSelect('.b-rubricator-menu__item', '.b-rubricator-menu', '.b-rubricator-menu__list');

    var $tabSel = $(".b-rubricator-menu").find(".b-field__select");

    $tabSel.on('change', function(){
        var tabIndex = $(this).prop("selectedIndex");
        $item.hide();
        $item.eq(tabIndex).show();
    });

});