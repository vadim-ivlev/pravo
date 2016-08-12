
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

$(function() {

    var $elSelectZone = $('#select-zone'),

        $elSelectPart = $('.select-part'),

        $table = $('.b-table__wrapper .b-table'),

        $tableItem = $('.b-table__item[id]'),

        hideClass = 'b-table_hide';



    $elSelectZone.change(function(){

        var dataValue = $(this).find('option:selected').val();

        console.log(dataValue);

        $table.each(function(){

            $(this).addClass(hideClass);

            if ($(this).data('value') == dataValue) {

                console.log($(this).data('value'));

                $(this).removeClass(hideClass);

            }

        });

    });

    $elSelectPart.change(function(){

        var dataValue = $(this).find('option:selected').val();

        var closestEl = $(this).closest($table);

        closestEl.find($tableItem).each(function(){
            $(this).hide();

            if ($(this).attr('id') == dataValue) {
                $(this).show();
            }
        });

    });


});