$(document).ready(function() {
    $(".b-pagination").each(function() {

        if ($('.js-to-page').length < 2) {
            $(this).css('display', 'none');
        } else {
            var arrowPrevDisabled = $('.js-arrow-prev-disabled');
            var arrowNextDisabled = $('.js-arrow-next-disabled');

            if( $('.js-arrow-prev').length == 0 ) {
                arrowPrevDisabled.css('display', 'inline-block');
            } else {
                arrowPrevDisabled.hide();
            }

            if( $('.js-arrow-next').length == 0 ) {
                arrowNextDisabled.css('display', 'inline-block');
            } else {
                arrowNextDisabled.hide();
            }
        }

    });
    $.getJSON((window.location.href).replace('/html/', '/json/'),
        function(data){
            function hellipPosition (a, b = false) {
                var hellip = $('<div style="display: inline-block">...</div>');
                return (b) ? hellip.insertBefore($(a)[$(a).length-1]) : hellip.insertAfter($(a)[0]);
            }

            if (data.pagination && (data.pagination.all__pages).length >= 5 ) {
                $.each(data.pagination.all__pages, function (key, value) {

                    if (value.number_page <= 3 && value.current) {
                        hellipPosition(('.js-to-page'), true);
                    } else if (value.number_page >= data.pagination.total__pages-2 && value.current) {
                        hellipPosition(('.js-to-page'));
                    } else if (
                        (
                            value.number_page > 3 ||
                            value.number_page > data.pagination.total__pages-3
                        )
                        && value.current
                    ) {
                        hellipPosition(('.js-to-page'), true);
                        hellipPosition(('.js-to-page'));
                    }
                });
            }
        }

    );

});