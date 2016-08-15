function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (getCookie('selection') == undefined) {
    var flag = {};
    flag.key = 'rubrics_conditions';
    flag.value = 'order_by';
}

$(function() {

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



/*
1. Есть ли кука? Если нет - записываем куку, если есть - собираем и обновляем страницу с данными из куки.
2. Если нет - дожидаемся, когда появится первый get-запрос и записываем результат в куку и обновляем её experience.
3. Берём location.search и удаляем все знаки "?". Далее - собираем новый объект для куки с помощью разбиения (location.search).split('&').
 (location.search).split('&') - наш массив, мы по нему проходимся через each(). На каждом each() разбиваем value() по знаку "=" (опять split).
 Пишем в конец нашего объекта ключ массива 0 (order_by) и значение 1.
4.Если кука не пустая, то переходим к п. 1, затем к п 3.
*/