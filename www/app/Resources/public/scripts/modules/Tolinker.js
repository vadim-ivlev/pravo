/*
 * Tolinker
 * Модуль определяет элемент, по клику на который,
 * осуществляется переход по ссылке
 * 
 */

var Module = class {

    // Конструктор объекта
    constructor(paramUser) {

        var 

            // Стандартные параметры для модуля
            _param = {
                targetEvent: 'body',
                targetEls: ['body'],
                eventsList: 'click',

                // Ссылка перехода
                link: null,

                // Как открывать (в новом табе или нет, по-умолчанию в новом)
                target: '_blank'
            };

        // параметры
        this.param = $.extend(_param, paramUser);

        // Инициализируем модуль
        // Если передали ссылку
        if (!!this.param.link) {

            this.initEvents();

        } else {

            throw new Error('не передали ссылку в модуль');

        }

    }

    /*
     * Методы
     *
     */

    // Инициализируем событие модуля
    initEvents() {

        var

            // Линкуем указатель на объект
            self = this;

        // Подписываемся на событие
        $(self.param.targetEvent).on(self.param.eventsList, function(e) {
            
            // Вызываем метод по событию
            // Передаем объект события и функцию обратного вызова (не обязательно)
            self.processEvent(e);

        });

    }

    // Обработка события
    // Проверяем, объект по которому кликнули,
    // тот, с которого нужен переход?
    processEvent(e) {

        var

            // Ссылка на объект
            self = this,

            // Получаем объект по которому кликнули
            $ctx = $(e.target);

        // Проходим по элементам, с которых мы регистируем переход
        $.each(self.param.targetEls, function(index, el) {

            // Если клик произошел по элементу, который мы указали,
            // то переходим
            if ($ctx.is(el)) {

                // Переход по ссылке
                self.goToLink();

                // Выходим из цикла
                return false;

            }

        });

    }

    // Переход по ссылке
    goToLink(param) {

        var _w = window,
            link = this.param.link,
            target = this.param.target;

        // Открываем ссылку в новом окне
        if (target === '_blank') {

            _w.open(link);

        } else {

            _w.location.href = link;

        }

    }

}

// Экспортируем модуль
module.exports = Module;