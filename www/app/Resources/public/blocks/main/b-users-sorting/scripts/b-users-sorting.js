$(function() {
    function sendRequest() {

        $(this).prop('disabled', 'disabled');

        var data = {
            'current_url' : window.location.pathname,
            'current_search' : window.location.search,
        };

        $('#' + $(this).attr('id') + ' option').each(function () {
            if ($(this).prop("selected")) {
                data['order_by'] = {};
                data.order_by[this.parentNode.id] = $(this).val();
            }
        });

        $.ajax({
            url: '/sort/',
            data: data,
            type: "POST",
            success: function(data) {
                console.log(data);
                $(this).prop('disabled', false);
            },
            error: function(data) {
                console.log('error');
                $(this).prop('disabled', false);
            }
        });
    }

    $('#user-specialization, #sortBy').on('change', _.debounce(sendRequest, 1000));
});