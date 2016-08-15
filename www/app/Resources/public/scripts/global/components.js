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
     * Социальный шаринг
     */
    'share': require('../../blocks/crosslayouts/b-share/scripts/share'),

    /**
     * Поле ввода
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
     * Кнопка отправки
     */
    'rg-submit': require('../../blocks/forms/b-submit/scripts/Submit'),

    /**
     * Форма
     */
    'rg-form': require('../../blocks/forms/b-form/scripts/Form'),

    /**
     * Yandex Direct
     */
    'rg-yadirect': require('../../blocks/crosslayouts/b-yadirect/scripts/Yadirect'),

    /**
     * Текстовое сообщение
     */
    'rg-form-message': require('../../blocks/forms/b-form-message/scripts/FormMessage')
};