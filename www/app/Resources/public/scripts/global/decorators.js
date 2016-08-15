/**
 * Декораторы
 */
Ractive.decorators = {

    'date-picker': function(node) {

        var ractive = this

        $(node).datepicker({
            onSelect: function(dateValue) {

                ractive.updateModel();

                RG.events.publish('date.picked', ractive);
            },
            dateFormat: 'dd.mm.yy',
            constrainInput: true,
            showOn: 'button',
            buttonText: 'Select...',
            showButtonPanel: true,
            maxDate: '0'
        });

        return {
            teardown: function() {
                $(node).datepicker("destroy");
            }
        };
    },
    'scroll-bar': node => {

        $(node).mCustomScrollbar({
            autoHideScrollbar: true
        });

        return {
            teardown() {
                $(node).mCustomScrollbar('destroy');
            }
        };
    }
};