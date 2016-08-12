/*
* BlocksShifter
* Модуль перестановки блоков в зависимости от ширины экрана
*
* Ширина высчитывается, как в медиазапросах - min-width
* То есть блок показывается в контейнере начиная с полученной ширины и больше
*
* @BlocksShifter.run - запускаем смещение блоков
* 
*/

var
    // Подключаем модуль, проверки путей
    keypather = require('keypather')(),

    /*
     * Свойства
     * 
     */
    
    // Префикс модуля
    _modulePrefix = 'BlocksShifter',

    // Стандартный класс контейнеров
    _shiftContainerLabel = '.shiftContainer',

    // Модификатор активного контейнера
    _shiftContainerActiveClass = 'shiftContainer_active',

    // Аттрибут, с которого считываем id блока
    _shiftContainerId = 'data-blocksShifterId',

    // Аттрибут, с которого считываем данные о ширине экрана
    _shiftContainerWidthHash = 'data-blocksShifterWidthHash',

    // Хранилище методов,
    // соответствующих блоку
    _callbackList = {},

    /*
     * Методы
     * 
     */

    // Перемещаем блоки
    shiftBlocks = (topic, screenProp) => {

        // Находим контейнеры для модуля
        var $shiftContainer = $(_shiftContainerLabel);

        // Если элементы есть
        if (!!$shiftContainer.length) {

            // Анализируем элемент
            checkToShift($shiftContainer, screenProp);

        }

    },

    // Перемещаем один блок
    /*shiftBlock = (shiftContainerIdValue) => {

        var $containers = $(`[${_shiftContainerId}=${shiftContainerIdValue}]`);

    },*/

    // Анализируем элементы
    // и отбираем те, которые подходят
    // под тип экрана
    checkToShift = ($shiftContainer, screenProp) => {

        // Получаем параметры,
        // которые будут использоваться в сдвиге
        var screenType = screenProp.type; // тип экрана

        $shiftContainer.each((index, el) => {

            var $el = $(el),
                shiftContainerWidthHashValue = $el.attr(_shiftContainerWidthHash),
                shiftContainerIdValue = $el.attr(_shiftContainerId),
                $activeBlock = null;

            // В блоке разрешений может быть несколько
            // Поэтому преобразуем строку в массив
            // и проходим по нему
            shiftContainerWidthHashValue = shiftContainerWidthHashValue.split(' ');

            $.each(shiftContainerWidthHashValue, (index, el) => {

                // Если блок подходит под тип экрана
                if (el === screenType) {

                    // Находим активный блок
                    $activeBlock = $(`[${_shiftContainerId}=${shiftContainerIdValue}].${_shiftContainerActiveClass}`);

                    //RG.logger.log('Шифтану ка я блок - #' + $activeBlock.attr('id'));
                    
                    // Обрабатываем блок
                    processBlock($el, $activeBlock, shiftContainerIdValue, screenType, _shiftContainerActiveClass);

                }

            });

        });

    },

    /*
     * Инструменты
     * 
     */

    // Обрабатываем блок
    processBlock = ($el, $activeBlock, shiftContainerIdValue, screenType, activeClass) => {

        // Если контейнер пустой,
        // то заполняем его
        if (!$el.children().length) {

            // Заполняем контентом
            // RIP Устарело!!
            //$el.html(getBlockContent($activeBlock));

            // Заменяем содержимое элемента
            // контентом
            $activeBlock
                .children()
                .appendTo($el.empty());
        }

        // Если есть обратный вызов на этом блоке
        // вызываем его
        if (keypather.in(_callbackList, `${shiftContainerIdValue}.${screenType}.callback`)) {

            // Передаем туда элемент в который мы будем помещать контент
            // Передаем элемент, из которого контент вытягиваем
            // Передаем сам модуль
            _callbackList[shiftContainerIdValue][screenType].callback($el, $activeBlock);

        }

        // удаляем активный класс у бывшего :)
        $activeBlock.removeClass(activeClass);

        // добавляем активный класс
        $el.addClass(activeClass);

    },

    // Получаем каонтент блока, по его Id
    getBlockContent = ($activeBlock) => {

        var content = null;

        // если блок есть
        if (!!$activeBlock.length) {

            // и возвращаем контент
            content = $activeBlock.html();
        }

        return content;

    },
    
    // Привязываем к блоку действие (callback)
    // Получаем массив функций, и регистрируем каждую
    // @param - объект настроек, состоит из
    // @blockId - имя блока, в котором будет вызов
    // @screenType - тип экрана, в котором будет вызов
    // @callback - функция. которая вызовется
    setCallback = (callbackList) => {

        $.each(callbackList, (index, callbackParam) => {

            var blockId = callbackParam.blockId || null,
                screenType = callbackParam.screenType.split(' ') || null,
                callback = callbackParam.callback || null;

            try { 

                // Если есть все данные,
                // то назначаем обработчик
                if (!!(blockId && screenType && callback)) {

                    // добавляем Блок в список
                    if (!_callbackList[blockId]) {
                        _callbackList[blockId] = {};
                    }

                    // Проходим по всем типам экрана
                    $.each(screenType, (index, screenTypeItem) => {

                        // добавляем в блоке тип
                        if (!_callbackList[blockId][screenTypeItem]) {
                            _callbackList[blockId][screenTypeItem] = {};
                        }

                        // Назначаем обработчик
                        _callbackList[blockId][screenTypeItem].callback = callback;

                    });                    

                } else {
                    throw new Error('не указаны все данные для функции');
                }

            } catch (err) {
                RG.logger.error(`Модуль ${_modulePrefix}, функция setCallback.\nОшибка: ${err}`);
            }

        });

    },

    /*
     * Инициализация подписчиков модуля
     *
     */

    init = () => {
        RG.events.subscribe(`${_modulePrefix}.run`, shiftBlocks);
    };

// Экспортируем как модуль
// передаем метод установки собственных функций
// и метод инициализации
module.exports = {
    setCallback,
    //shiftBlock,
    _modulePrefix,
    init
};