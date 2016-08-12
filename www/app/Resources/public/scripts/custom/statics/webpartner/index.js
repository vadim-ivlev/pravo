
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

$(function() {

    'use strict';


    $('.b-content-toggler').each(function(index, el){

    	//new RG.ContentToggler(el, { with_js: true }).hide();

    	new RG.ContentToggler(el, { opened: false });

    });

});