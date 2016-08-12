
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

/**
 * Подключение модуля конвертации списка в выпадающее меню
 */
RG.ListHeadToSelect = RG.ListHeadToSelect || require('./modules/ListHeadToSelect');

/**
 * Подключения модуля
 */
RG.Account = RG.Account || require('../blocks/main/b-account/scripts/main');

var tabs = null;

function showTabs(topic, tab) {

    if (tabs instanceof Ractive.components.tabs) {

        tabs = tabs;

    } else {

        tabs = new Ractive.components.tabs({
            el: 'tabs',
            data() {
                return {
                    selected: tab,
                    items: [
                        {
                            title: 'Профиль',
                            topic: 'account.profile.show'
                        },
                        {
                            title: 'Сервисы',
                            topic: 'account.services.show'
                        }
                    ]
                }
            }
        });

    }

    /*tabs = tabs instanceof Ractive.components.tabs ?
    tabs :
    new Ractive.components.tabs({
        el: 'tabs',
        data() {
            return {
                selected: tab,
                items: [
                    {
                        title: 'Профиль',
                        topic: 'account.profile.show'
                    },
                    {
                        title: 'Сервисы',
                        topic: 'account.services.show'
                    }
                ]
            }
        }
    });*/
}

$(function() {

    RG.Account.init();
    RG.Account.run();

    RG.events.registerList({
        'account.tabs.show': showTabs
    });
});