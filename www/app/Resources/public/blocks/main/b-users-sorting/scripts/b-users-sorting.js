$(function() {
    function sendRequest() {
        var this_local = callback_data['this'];
        var select_id = '#' + $(this_local).attr('id');
        var data = {
            'current_url' : window.location.pathname,
            'current_search' : window.location.search,
        };

        $('#' + $(this_local).attr('id') + ' option').each(function () {
            if ($(this_local).prop("selected")) {
                data['order_by'] = {};
                data.order_by[this_local.parentNode.id] = $(this_local).val();
            }
        });

        $.ajax({
            url: '/sort/',
            data: data,
            type: "POST",
            async: true,
            success: function(data) {
                console.log(data);
                console.log(select_id);
                $(select_id).prop('disabled', false);
            },
            error: function(data) {
                console.log('error');
                $(select_id).prop('disabled', false);
            }
        });
    }

    var callback_data = {
        'this' : ''
    };

    function callback () {
        callback_data['this'] = $(this);
        $($('#' + $(this).attr('id')).prop('disabled', 'disabled')).ready(_.debounce(sendRequest, 1000));
    }

    $('#user-specialization, #sortBy').on('change', callback);
});