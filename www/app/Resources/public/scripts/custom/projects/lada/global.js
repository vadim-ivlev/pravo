
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

Ractive.components['rg-tube'] = require('../../../../blocks/main/b-rgtube/scripts/Rgtube');

//RG.LoadChain = RG.LoadChain || require('../../../modules/LoadChain');


$(function() {

    /*
     * Инициализируем прилипалу баннера
     *
     */

    // Инициализируем стикер баннера в левом сайтбаре
    $("#ads64").stick_in_parent({
        parent: '.l-page__body'
    });

    /*
     * Инициализация галереи через компонент
     *
     */

    RG.parser.render('rg-tube');
    //RG.LoadChain.initLoadChainCustomInBlock();

    new RG.LoadChain({
        tmplName: 'project-lada',
        elMap: {
            root: '#bNewsChain',
            list: '.b-news__list'
        }
    });

    //$('.b-news__action .b-link-btn').trigger('click');


    // $('.b-gallery__fotorama').on('click', function(event){
    //     if ($('.fotorama__loaded--img:nth-child(2)').hasClass('fotorama__active') && !$('.fotorama__grab').hasClass('.fotorama__grabbing')) { 
    //         window.open(
    //             '//www.lada.ru/cars/vesta-xray/actions/9042303.html?utm_source=rg&utm_medium=banner&utm_campaign=Vesta_XRAY_trade_in', 
    //             '_blank'
    //         ); 
    //     }
    // });

    var oldX, newX;
    $('.fotorama__stage__frame:first-child')   
        .mouseup(function(e){ 
            newX = e.pageX;
            if (newX == oldX) { 
                window.open(
                    'http://www.lada.ru/cars/vesta/sedan/about.html', 
                    '_blank'
                );
            }
        })
        .mousedown(function(e){
            oldX = e.pageX;
        });

    // $('.fotorama__stage__frame:nth-child(3)')   
    //     .mouseup(function(e){ 
    //         newX = e.pageX;
    //         if (newX == oldX) { 
    //             window.open(
    //                 'http://www.lada.ru/cars/vesta/sedan/about.html', 
    //                 '_blank'
    //             );
    //         }
    //     })
    //     .mousedown(function(e){
    //         oldX = e.pageX;
    //     });

    $('.fotorama__stage__frame:nth-child(2)')   
        .mouseup(function(e){ 
            newX = e.pageX;
            if (newX == oldX) { 
                window.open(
                    'http://www.lada.ru/cars/xray/hatchback/about.html', 
                    '_blank'
                );
            }
        })
        .mousedown(function(e){
            oldX = e.pageX;
        });

});