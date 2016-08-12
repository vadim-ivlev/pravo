/**
 * Created by esolovyev on 21.03.2016.
 */

$(function() {

    RG.parser.render('rg-mailing');

    if(RG.session.isAuthorized()) {

        RG.events.publish('subscribe.fresh.check');
    }

    RG.BlocksShifter.setCallback([

        // Обратный вызов в момент включения блока
        // Добавляем колонки
        {
            blockId: 'rgb_components_mailing_fresh',
            screenType: 'mobile tablet tabletLandscape',
            callback: ($target, $active) => {

                RG.parser.init();
                RG.parser.render('rg-mailing');

                if(RG.session.isAuthorized()) {

                    RG.events.publish('subscribe.fresh.check');
                }

            }
        }
    ]);
});