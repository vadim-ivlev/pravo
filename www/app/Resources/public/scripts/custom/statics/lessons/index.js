
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

 /**
 * Подключение модуля подгрузки
 */

RG.LoadChain = RG.LoadChain || require('../../../modules/LoadChain');


$(function() {

    // Инициализация блока с видео
    RG.parser.render('rg-video-inner');

    new RG.LoadChain();

    RG.parser.render('rg-follow-sujet');

    function initPopup (target, boxLink, source, item, selectBlock, selectOption, className){

        var $colorBoxLink = target.find(boxLink),

            $colorBoxSource = $(source);

        $colorBoxLink.colorbox({

            onComplete(colorbox) {

                var $colorBoxItem  = $(item),

                    $colorBoxSelect =  $(selectBlock),

                    $colorBoxSelectOptions = $(selectOption);

                RG.events.publish('colorbox.opened');

                var elData = colorbox.el.getAttribute('data-value');

                $colorBoxItem.each(function(){

                    if( $(this).data('value') != elData){

                        $(this).hide();

                    }

                });

                $colorBoxSelectOptions.each(function(){

                    if ($(this).val() == elData ) {

                        $(this).attr('selected', true);

                    }

                });

                $colorBoxSelect.change(function(){

                    var dataValue = $(this).find('option:selected').val();

                    $colorBoxItem.each(function(){

                        $(this).hide();

                        if ($(this).data('value') == dataValue) {

                            $(this).show();
                        }

                    });

                });
            },

            onCleanup() {
                RG.events.publish('colorbox.closed');
            },

            className: className,
            inline: true,
            href: $colorBoxSource.html(),

            width: '660px',
            height: '660px',
            scrolling: false
        });
    }


    RG.BlocksShifter.setCallback([
        {
            blockId: 'rgb_calendar-years',
            screenType: 'mobile tablet tabletLandscape',
            callback: ($target, $active) => {

                initPopup ( $target,
                    '.b__item',
                    '.b-popup_years',
                    '.b-popup__dest_years .b__item',
                    '.b-popup__dest_years .b-field__select',
                    '.b-popup__dest_years .b-field__select option',
                    'b-popup__dest_years');
            }
        },
        {
            blockId: 'rgb_feed_sidebar',
            screenType: 'mobile tablet tabletLandscape',
            callback: ($target, $active) => {

                initPopup ( $target,
                    '.b-feed__item',
                    '.b-popup_regulations',
                    '.b-popup__dest_regulations .b__item',
                    '.b-popup__dest_regulations .b-field__select',
                    '.b-popup__dest_regulations .b-field__select option',
                    'b-popup__dest_regulations');
            }
        },
        {
            blockId: 'rgb_calendar-years',
            screenType: 'desktop desktopFull',
            callback: ($target, $active) => {

                initPopup ( $target,
                    '.b__item',
                    '.b-popup_years',
                    '.b-popup__dest_years .b__item',
                    '.b-popup__dest_years .b-field__select',
                    '.b-popup__dest_years .b-field__select option',
                    'b-popup__dest_years');
            }
        },
        {
            blockId: 'rgb_feed_sidebar',
            screenType: 'desktop desktopFull',
            callback: ($target, $active) => {

                initPopup ( $target,
                    '.b-feed__item',
                    '.b-popup_regulations',
                    '.b-popup__dest_regulations .b__item',
                    '.b-popup__dest_regulations .b-field__select',
                    '.b-popup__dest_regulations .b-field__select option',
                    'b-popup__dest_regulations');
            }
        }
    ]);

});