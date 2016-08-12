/**************************************************************************************
 КОМПОНЕНТЫ
 *************************************************************************************/

Ractive.components = {
    /**
     * Компонент вывода ошибки в полях формы
     */
    'input-notification': require('../../blocks/forms/b-input-notification/scripts/InputNotification'),

    /**
     * Табы
     */
    'tabs': require('../../blocks/crosslayouts/b-tabs/scripts/Tabs'),

    /**
     * Поле ввода для поиска (Search bar)
     */

    'search-bar': require('../../blocks/crosslayouts/b-search-bar/scripts/SearchBar'),

    /**
     * Информация по поиску
     */

    'rg-search-info': require('../../blocks/crosslayouts/b-search-info/scripts/SearchInfo'),

    /**
     * Информация по поиску
     */

    'rg-search-filters': require('../../blocks/crosslayouts/b-search-filters/scripts/SearchFilters'),

    /**
     * Подпискаться на сюжет
     */
    'rg-follow-sujet': require('../../blocks/crosslayouts/b-follow/scripts/Follow'),

    /**
     * Подпискаться на комментарии
     */
    'subscribe-comments': require('../../blocks/crosslayouts/b-subscribe-comments/scripts/SubscribeComments'),

    /**
     * Социальный шаринг
     */
    'share': require('../../blocks/crosslayouts/b-share/scripts/share'),

    /**
     * Лоадер
     */
    'spinner': require('../../blocks/crosslayouts/b-spinner/scripts/Spinner'),

    /**
     * Пустотел
     */
    'dummy-empty': require('../../blocks/crosslayouts/b-dummy/scripts/Empty'),

    /**
     * Пустотел
     */
    'rg-input': require('../../blocks/forms/b-input/scripts/Input'),

    /**
     * Поле почты
     */
    'rg-email': require('../../blocks/forms/b-email/scripts/Email'),

    /**
     * Поля имени
     */
    'rg-name': require('../../blocks/forms/b-name/scripts/Name'),

    /**
     * Галочка
     */
    'rg-checkbox': require('../../blocks/forms/b-checkbox/scripts/Checkbox'),

    /**
     * Выпадающий список
     */
    'rg-select': require('../../blocks/forms/b-select/scripts/Select'),

    /**
     * Текстовое поле
     */
    'rg-textarea': require('../../blocks/forms/b-textarea/scripts/Textarea'),

    /**
     * Кнопка
     */
    'rg-button': require('../../blocks/forms/b-button/scripts/Button'),

    /**
     * Ссылка
     */
    'rg-url': require('../../blocks/forms/b-url/sctipts/Url'),

    /**
     * Текстовое сообщение
     */
    'rg-form-message': require('../../blocks/forms/b-form-message/scripts/FormMessage'),

    /**
     * Кнопка отправки
     */
    'rg-submit': require('../../blocks/forms/b-submit/scripts/Submit'),

    /**
     * Форма
     */
    'rg-form': require('../../blocks/forms/b-form/scripts/Form'),


    /**
     * Подписка
     */
    'rg-mailing': require('../../blocks/crosslayouts/b-mailing/scripts/Mailing'),

    /**
     * Yandex Direct
     */
    'rg-yadirect': require('../../blocks/crosslayouts/b-yadirect/scripts/Yadirect'),

    /*
     * Видео
     */

    'rg-video': require('../../blocks/main/b-video/scripts/Video'),

    /*
     * Adfox баннеры
     */

    'rg-adfox': require('../../blocks/crosslayouts/b-adfox/scripts/Adfox'),

    /*
     * Relap
     */

    'rg-relap': require('../../blocks/crosslayouts/b-relap/scripts/Relap'),

    /*
     * Видео внутри превью материала
     *
     */
    'rg-video-inner': require('../../blocks/crosslayouts/b-video-inner/scripts/VideoInner'),

    /*
     * Инструменты для разработки фронта
     *
     */
    'rg-ftools': require('../../blocks/overlays/b-rgftools/scripts/Rgftools')
};