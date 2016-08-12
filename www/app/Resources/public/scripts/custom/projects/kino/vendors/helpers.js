/************
 * Helpers *
 ***********/



var BootSingleton = function (bootList) {

    // Запуск всех блоков
    // Блоки передаем в массиве
    var bootListLen = bootList.length,
        i = 0;

    for (; i < bootListLen; i++) {
        bootList[i]['init'](); // Вызываем функцию запуска
    }

    return this;
};

/*
 * PubSub service
 * Сервис для подписки и издания событий
 *
 */

var PubSub = {

    // Контейнер данных
    _PubSubList: {
        pub: {},
        sub: {}
    },

    // Добавляем публикацию в список
    _addPubToList: function($handler, name) {
        this._PubSubList.pub[name] = $handler;

        return this;
    },

    // Добавляем подписку в список
    _addSubToList: function($handler, name) {
        this._PubSubList.sub[name] = $handler;

        return this;
    },

    // Удаляем публикацию в список
    _removePubToList: function(name) {
        this._PubSubList.pub[name] = undefined;

        return this;
    },

    // Удаляем подписку в список
    _removeSubToList: function(name) {
        this._PubSubList.sub[name] = undefined;

        return this;
    },

    // Декоратор подписки
    subscribe: function(name, callback) {

        var $handler = $(document).on(name, callback);

        this._addSubToList($handler, name);

        return this;
    },

    // Декоратор публикации
    publish: function(name, data) {

        var $handler = null;

        if (!data) {
            $handler = $(document).trigger(name);
        } else {
            $handler = $(document).trigger(name, data);
        }

        this._addPubToList($handler, name);

        return this;
    },

    // Декоратор отписки
    unsubscribe: function(name) {

        $(document).off(name);

        return this;
    }

};


/*
 * LoaderModule
 * Модуль для обмена данными с сервером
 * Singleton
 */

var LoaderModule = {

    // Методы настройки параметров
    setLoaderModuleSettings: function(name, value) {
        return this.settings[name] = value;
    },

    getLoaderModuleSettings: function(name) {
        return this.settings[name];
    },

    // Настройки модуля
    settings: {
        method: 'POST',
        url: null,
        dataType: null
    },

    // Отправка запроса
    sendRequest: function(requestParam) {

        var self = this,
            ajaxOptions = null;

        // Настройки запроса
        ajaxOptions = {
            method: self.settings.method,
            url: self.settings.url,
            beforeSend: function() {
                self.requestStart();
            }
        };

        // Добавляем тип данных, если есть такая настройка
        if (self.settings.dataType) ajaxOptions.dataType = self.settings.dataType;

        // Настройки
        if (requestParam) {

            // Добавляем передаваемые данные
            if (requestParam.param) ajaxOptions.data = requestParam.param;
            
        }

        // Send request
        $.ajax(ajaxOptions)
            .done(function(res) {
                self.requestDone(res);
                
            })
            .fail(function(res) {
                self.requestError(res);
            });

        return this;
    },

    // Запрос стартовал
    requestStart: function() {

        // Публикуем событие начала отправки запроса
        PubSub.publish('MaterialLoader:requestStart');

        return this;
    },

    // Пришел успешный ответ от сервера
    requestDone: function(res) {

        // Публикуем событие успешного окончания запроса
        PubSub.publish('MaterialLoader:requestDone', res);

        return this;
    },

    // Пришла ошибка от сервера
    requestError: function(res) {

        // Публикуем событие ошибки ответа сервера
        PubSub.publish('MaterialLoader:requestError', res);

        return this;
    }

};