/*
 * Boot
 * Запуск модулей для статических страниц (кроме статьи)
 *
 */

var MaterialLoader = require('./MaterialLoader');

// Запуск, по DOM Ready
$(function() {
// Content here

    /*
     * Setup MaterialLoader
     * Инициализация модуля подгрузки материалов
     *
     */

    if (!!$('#materialsListTmpl').length) {

        var materialLoader = new MaterialLoader({
            // Запрос
            url: 'https://kino.rg.ru',

            // Элементы
            tmplLabel: '#materialsListTmpl',
            tmplTarget: '#materialsListBox',
            loaderEl: '#moreMaterialsBtn',

            materialItem: '[data-id]',

            // Порция загружаемых материалов
            countEl: 12

        }).init();

    }

// Content here





        $(window).on( "load", function(){

        var $firstAuthorMaterial = $(".materials .material").eq(0),

            $secondAuthorMaterial = $(".materials .material").eq(1),

            $authorDescrBlock = $(".author__description"),

            $authorHidePannel = $(".author__hide-pannel"),

            $authorHeading = $(".author__heading"),

            $hidePannelButton = $(".author__hide-pannel__button"),

            topArrowClass ="top-arrow",

            authorDescrHeightAuto = "author_descr_height_auto",

            revealPannelClass = "reveal-pannel",

            authorHeadingHeight = $authorHeading.height(),

            authorDescrBlockHeight = $authorDescrBlock.height(),

            firstAuthorMaterialHeight = $firstAuthorMaterial.height(),

            secondAuthorMaterialHeight = $secondAuthorMaterial.height();


        function authorHasDescrSetHeight (descrblock, descrblockheight, firstblockheight, secondblockheight){

            if ($(window).width() < 975) {
                console.log("true");
                return;

            }

            if ( $authorDescrBlock.height() < $firstAuthorMaterial.height() ) {

                $authorHidePannel.remove();
                
                return;
            }

        if ( firstblockheight > secondblockheight && descrblockheight > firstblockheight ) {


            descrblock.css("max-height", firstAuthorMaterialHeight - authorHeadingHeight );

            } else if ( descrblockheight > secondblockheight ) {

            descrblock.css("max-height", secondAuthorMaterialHeight - authorHeadingHeight );

            }

        };

        authorHasDescrSetHeight($authorDescrBlock, authorDescrBlockHeight, firstAuthorMaterialHeight, secondAuthorMaterialHeight);


        $authorHidePannel.on("click", function(){

            $authorDescrBlock.toggleClass(authorDescrHeightAuto);

            $authorHidePannel.toggleClass(revealPannelClass);

            $hidePannelButton.toggleClass(topArrowClass);

        });



        });







});



