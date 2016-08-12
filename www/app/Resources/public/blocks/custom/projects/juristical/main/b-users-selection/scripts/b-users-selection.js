$(document).ready(function() {

    var site = window.location.href;
    var target = "rg.ru";
    var url = site.substring(site.indexOf(target) + target.length);

    $('.js-user-specialization').on('change', function() {
        window.location.href = this.value;
    });
    $('#user-specialization option').each(function() {
        window.location.href == this.value;
        if ($(this).val() == url) {
            $(this).prop('selected', true);
        }
    });

    $('#sortBy').on('change', function () {
        $('#sortBy option').each(function () {
            //console.log($(this).prop('selected', true));
            if ($(this).prop("selected")) {
                var name_get = 'order_by=';
                var flag = name_get + $(this).val();
                //window.location.href = window.location.pathname + location.search;
                if (location.search !== '' && (location.search).match(name_get)) {
                    //console.log('&');
                    if ((window.location.href).match(name_get)) {
                        var array_location_search = (location.search).split('&');
                        $.each(array_location_search
                            ,
                            function (key, val) {
                                if (val.match(name_get)) {
                                    delete array_location_search[key];
                                }
                            }
                        );
                        array_location_search = array_location_search.join('');
                        /*console.log(array_location_search);
                         console.log(flag);*/
                        window.location.href = window.location.pathname + array_location_search + '&' + flag;
                    } else {
                        window.location.href = window.location.pathname + location.search + '&' + flag;
                    }
                } else {
                    console.log('?');
                    window.location.href = window.location.pathname + '?' + flag;
                }
                // $.ajax({
                //     url: 'http://example.ru/form.php/',
                //     data: $(this).val(),
                //     type: "POST",
                //     success: function (data) {
                //         console.log(123);
                //         console.log(data);
                //     },
                //     error: function (data) {
                //         console.log(321);
                //         console.log(data);
                //     }
                // });
            }
        });
    });

});