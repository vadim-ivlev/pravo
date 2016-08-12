
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

$(function() {

    'use strict';

    $('#openKartaProezda').colorbox({
    	title: "Редакция &laquo;Российской газеты&raquo;, ул.Правды, д.24, корпус 4",
    	className: "karta-proezda-ctx"
    });

    // Раскрывашка
    $('.b-content-toggler').each(function(index, el){
        // if($(this).find('.moscow').length) {
        //     new RG.ContentToggler(el, { opened: true });
        // } else {
            new RG.ContentToggler(el, { opened: false });
        // }
        // new RG.ContentToggler(el, { with_js: true }).hide();
    });

    // Переключалка региональных табов
    $('.b-rubricator-wrapper').each(function(index, el){
        new RG.ContentHandler(el, {
            labelList: '.b-rubricator-menu__item'
        });
    });
 //    new RG.ContentHandler('.b-rubricator-wrapper', {
	// 	labelList: '.b-rubricator-menu__item'
	// });

});