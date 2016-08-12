/*
 * Materials loader
 *
 */

var MaterialLoader = function(options) {

    // В класс будут включены модули
    // Загрузки (LoaderModule: Helpers.js) и Отображения (ViewModule: Ractive)

    // Найденные элементы (блок Elements)
    this.elements = {};

    // Рабочая информация
    this._meta = {
        // Запрос
        url: options.url,

        // Элементы
        tmplLabel: options.tmplLabel,
        tmplTarget: options.tmplTarget,
        loaderEl: options.loaderEl,

        // Контейнер материалов
        materialItem: options.materialItem,

        // Порция загружаемых материалов
        countEl: options.countEl || 12,

        // Контейнер с id последних материалов
        materialsIdList: [],

        // Итератор последнего материала
        lastEl: 0
    };

    return this;

};

// for shorted write
MaterialLoader.fn = MaterialLoader.prototype;

/*
 * Elements
 *
 */

// Получаем элемент кнопки, по клику на которую грузим материал
MaterialLoader.fn.getLoaderEl = function() {

    var $loaderEl = $(this._meta.loaderEl);

    this.elements.$loaderEl = $loaderEl

    this._meta.url = this._meta.url + $loaderEl.attr('href');

    return this;

};

// Получаем все id материалов, которые уже загружены
MaterialLoader.fn.checkMaterialsId = function() {

    var self = this,
        materialsIdList = [];

    $(self._meta.materialItem).each(function(index, el){

        materialsIdList.push($(el).attr('data-id'));

    });

    self._meta.materialsIdList = self._meta.materialsIdList.concat(materialsIdList);

    return this;

};

/*
 * Init Modules
 *
 */

MaterialLoader.fn.initModules = function() {

    // Расширяем класс модулем AJAX
    $.extend(MaterialLoader.fn, LoaderModule);

    // Настраиваем модуль
    // Обязательно указываем адрес запроса
    this.setLoaderModuleSettings('url', this._meta.url);

    // Указываем тип данных как JSON
    this.setLoaderModuleSettings('dataType', 'json');

    // Настраиваем модуль view
    this.viewModule = new Ractive({
            el: this._meta.tmplTarget,
            template: this._meta.tmplLabel
        });

    return this;

};

/*
 * Views
 *
 */

// Вставляем материалы
MaterialLoader.fn.setMaterial = function(data) {

    var viewModule = this.viewModule,
        materials = null;

        materials = viewModule.get('materials');

    if (materials) {
        viewModule.set('materials', materials.concat(data.materials));
    } else {
        viewModule.set('materials', data.materials);
    }

    return this;     

};

// Ожидание загрузки
// Status: true - включаем, false - выключаем
MaterialLoader.fn.processingToggle = function(status) {

    var $loaderEl = this.elements.$loaderEl;

    if (!!status) {
        $loaderEl.addClass('hasProcessing');
    } else {
        $loaderEl.removeClass('hasProcessing');
    }

    return this; 

};

// Проверяем сможем ли мы подгрузить еще материалы
// если нет - скрываем кнопку
MaterialLoader.fn.checkMoreMaterials = function(data) {

    // На главной это не работает
    if (!$('.page_main').length) {

        var $loaderEl = this.elements.$loaderEl,
             countEl = this._meta.countEl,
             countMaterials = data.materials.length;

        if (countMaterials < countEl) {
            $loaderEl.closest('.more-button').hide();
        }

    }

    return this; 

};

/*
 * Init
 *
 */

// Elements
MaterialLoader.fn.initElements = function() {

    this.getLoaderEl();

    return this;

};

// Publications
MaterialLoader.fn.initPublications = function() {

    var self = this,
        $loaderEl = this.elements.$loaderEl;

    // Подгрузка материала по клику
    $loaderEl.on('click', function(event){

        event.preventDefault();

        // Check loaded materials
        self.checkMaterialsId();

        PubSub.publish('MaterialLoader:getMore');

    });        

    return this;

};

// Subscribers
MaterialLoader.fn.initSubscriptions = function() {

    var self = this;

    // Подписываемся на публикацию события подгрузки материала
    // Подписан блок отправки запроса на сервер
    PubSub.subscribe('MaterialLoader:getMore', function(event, data){
        self.sendRequest({
            param: {
                countEl: self._meta.countEl,
                materials : self._meta.materialsIdList
            }
        });
    });

    // Подписываемся на начало посыла запроса
    PubSub.subscribe('MaterialLoader:requestStart', function(event, data){
        // Показываем спиннер
        self.processingToggle(true);
    });

    // Подписываемся на публикацию успешной загрузки порции материалов
    PubSub.subscribe('MaterialLoader:requestDone', function(event, data){
            
        self.setMaterial(data) // Добавляем данные
            .processingToggle() // Выключаем спиннер
            .checkMoreMaterials(data); // Проверяем, сможем ли мы еще подгрузить материалы

    });

    // Подписываемся на публикацию ошибки запроса
    PubSub.subscribe('MaterialLoader:requestError', function(event, data){
        // Выключаем спиннер
        self.processingToggle();
    });

    return this;

};

// Main init
MaterialLoader.fn.init = function() {

    this.initElements()
        .initModules()
        .initPublications()
        .initSubscriptions();

    return this;

};

module.exports = MaterialLoader;