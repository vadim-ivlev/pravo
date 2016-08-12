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
    },
    'select-text-to-clipboard': node => {

        var $el = $(node),
            process = false;

        $el.on('mouseup', function(e){

            if (!process) {

                var selection = null,
                    selectedText = '',
                    timeoutId = null,
                    $notify = null;

                if (!!window.getSelection) {
                    selection = window.getSelection();
                    selectedText = selection.toString();
                }

                if (!!selectedText) {
                    try{
                        process = true;

                        document.execCommand("copy");

                        $notify = $('<div/>', {'class': 'b-rgftools__notify animated fadeOut'})
                        .text('скопировано')
                        .css({
                            'top': e.clientY,
                            'left': e.clientX,
                        });

                        $el.append($notify);

                        timeoutId = setTimeout(function(){
                            $notify.remove();
                            clearTimeout(timeoutId);
                            process = false;
                        }, 1500);

                    } catch(e){
                        RG.logger.info('не могу скопировать текст. Декоратор select-text-to-clipboard');
                    }
                }

            }

        });

        return {
            teardown() {
                $el.remove();
            }
        };

    }
};