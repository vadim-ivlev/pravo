$(function() {
    function sendRequest() {
        var this_local = callback_data['this'];
        var select_id = '#' + $(this_local).attr('id');
        var data = {
            'current_url' : window.location.pathname,
            'current_search' : window.location.search,
        };

//[select#order_by.b-users-sorting__select, context: select#order_by.b-users-sorting__select]
//[select#order_by.b-users-sorting__select.has-loading, selector: "", context: select#order_by.b-users-sorting__select.has-loading]
//console.log('#' + $(this_local).attr('id') + ' option');
        $('#' + $(this_local).attr('id') + ' option').each(function () {
            if ($(this).prop("selected")) {
                data['order_by'] = {};
                data.order_by[this.parentNode.id] = $(this).val();
            }
        });

        $.ajax({
            url: '/sort/',
            data: data,
            type: "POST",
            async: true,
            success: function(data) {
                console.log(data);
            },
            error: function(data) {
                console.log('error');
                //
            },
            complete: function(data) {
                $(select_id)
                .prop('disabled', false)
                .removeClass('has-loading');
            }
        });
    }

    var callback_data = {
        'this' : ''
    };

    function callback () {
        callback_data['this'] = $(this);
        $(
            $('#' + $(this).attr('id'))
            .prop('disabled', 'disabled')
            .addClass('has-loading')
            ).ready(_.debounce(sendRequest, 1000));
    }

    $('#rubrics_conditions, #order_by').on('change', callback);
});