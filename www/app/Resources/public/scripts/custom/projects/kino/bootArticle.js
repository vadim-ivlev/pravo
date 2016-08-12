/*
 * Boot
 * Запуск модулей для всех мтаериалов
 *
 */

// Запуск, по DOM Ready
$(function() {
// Content here

    /*
     * VoterView Model
     * Хранилище голосовалок
     *
     */

    var VoterModel = {

        // Список всех голосовалок
        votes: {},

        /*
         * Методы отправки и обработки запросов
         *
         */

        // Отправка запроса
        sendRequest: function(requestParam) {

            var self = this,
                ajaxOptions = null;

            // Настройки запроса
            ajaxOptions = {
                method: 'GET',
                url: '//kino.rg.ru/api/rating/666/?rating=' + requestParam.param.rating + '&callback=?',
                dataType: 'json',
                beforeSend: function() {
                    self.requestStart();
                }
            };

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
            console.info('requestStart');

            // Публикуем событие того, что запрос отправили
            PubSub.publish('VoterModel:requestStart');

            return this;
        },

        // Пришел успешный ответ от сервера
        requestDone: function(res) {
            console.info('requestDone');

            // Публикуем событие о том, что данные изменились и передаем их
            PubSub.publish('VoterModel:setData', res);

            /*PubSub.publish('VoterModel:setData', {
                reviewId: '1',
                materialId: '0000001',
                status: 'Проголосовать',
                overall: '3.5',
                votes: '167'
            });*/

            // Публикуем событие успешного окончания запроса
            PubSub.publish('VoterModel:requestDone', res);

            // Публикуем событие окончания запроса
            PubSub.publish('VoterModel:requestFinish');

            return this;

        },

        // Пришла ошибка от сервера
        requestError: function(res) {
            console.info('requestError');

            //Публикуем событие о том, что пришла ошибка
            PubSub.publish('VoterModel:requestError');

            //Публикуем событие окончания запроса
            PubSub.publish('VoterModel:requestFinish');

            return this;

        },

        /*
         * Методы записи (обновления) данных
         *
         */

        setData: function(event, data) {

            var target = this.votes[data.materialId];

            if (!!target) {
                // Если элемент есть в хранилище
                this.votes[data.materialId] = $.extend(target, this.votes[data.materialId]);
            } else {
                // Если элемента еще не было
                this.votes[data.materialId] = data;                
            }

            return this;

        },

        // Обработка события, когда юзер проголосовал
        changeRating: function(event, data) {

            this.sendRequest({

                // Получаем ID материала
                materialId: this.getMaterialId(),

                // Параметры запроса
                param: {
                    // Выбор пользователя
                    rating: data.userVote
                }
            });

            return this;

        },

        // Получаем начальный рейтинг от автора рецензии
        getAuthorVote: function() {

            var vote = $('#ratingVal').text();

            // Публикуем событие о том, что данные изменились и передаем их
            //PubSub.publish('VoterModel:setData', res);
            PubSub.publish('VoterModel:setData', {
                materialId: this.getMaterialId(),
                status: 'Оценка',
                rating: vote,
                users: 0
            });

            return this;

        },

        /*
         * Helpers
         *
         */

        getMaterialId: function() {

            return $('meta[property="article:id"]').attr('content');

        },

        /*
         * Init
         * При первой загрузке - получаем исходные данные
         */

        // Инициализация подписчиков
        initSubscribes: function() {

            var self = this;

            // Подписка на измененение данных в хранилище
            PubSub.subscribe('VoterModel:setData', function(event, data){
                self.setData(event, data);
            });

            // Подписка на выбор рейтинга
            PubSub.subscribe('VoterView:changeRating', function(event, data){
                self.changeRating(event, data);
            });

            return this;

        },

        // Инициализация начальных данных
        initDefaultData: function() {

            /*this.sendRequest({
                param: {
                    // Получаем ID материала
                    materialId: this.getMaterialId()
                }
            });*/

            this.getAuthorVote();

            return this;

        },

        // Основной инит
        init: function() {

            this.initSubscribes()
                .initDefaultData();            

            return this;
        }

    };
    
    /*
     * VoterView View
     *
     */

    var VoterView = Ractive.extend({

        data: function() {

            return {
                // Устанавливаем количество баллов
                stars: [1, 2, 3, 4, 5],
                
                // Устанавливаем поведение ожидания
                starsProcessing: false,

                // Устанавливаем поведение деактивации
                starsDeactive: false,

                /*
                 * Изменяемые данные
                 *
                 */

                // Статус блока
                status: 'Оценка автора',

                // Общий рейтинг
                overall: '...',

                // Всего проголосовало
                votes: '...',

                // Рейтинг в процентах
                starsValue: 0
            }

        },

        onrender: function() {

            // Запускаем подписчиков
            this.initSubscribes();

            //this.on('changeRating', this.changeRating);

        },

        // Голосование
        changeRating: function(userVote) {

            /*if (!this.get('starsDeactive')) {

                // Публикуем событие голосования
                PubSub.publish('VoterView:changeRating', {
                    userVote: userVote
                });

                // Выбор юзера
                this.set('userVote', userVote);

                // Статус голосования
                this.set('status', 'Моя оценка: ' + userVote);

            }*/

        },

        /*
         * Subscriber List
         *
         */

        initSubscribes: function() {

            var self = this,
                materialId = self.get('materialId');

            PubSub.subscribe('VoterModel:requestStart', function(event, data){
                //if (!!data && data.materialId === materialId) {
                    self.requestStart(event, data);
                //}
            });

            PubSub.subscribe('VoterModel:requestFinish', function(event, data){
                //if (!!data && data.materialId === materialId) {
                    self.requestFinish(event, data);
                //}
            });

            PubSub.subscribe('VoterModel:requestDone', function(event, data){
                //if (!!data && data.materialId === materialId) {
                    self.requestDone(event, data);
                //}
            });

            PubSub.subscribe('VoterModel:requestError', function(event, data){
                //if (!!data && data.materialId === materialId) {
                    self.requestError(event, data);
                //}
            });

            PubSub.subscribe('VoterModel:setData', function(event, data){
                //if (!!data && data.materialId === materialId) {
                    self.setData(event, data);
                //}
            });

            return this;

        },

         // Request start
        requestStart: function(event, data) {

            this.set('starsProcessing', true);

            return this;
        },

        // Request finish
        requestFinish: function(event, data) {

            this.set('starsProcessing', false);

            return this;

        },

        // Processing done request
        requestDone: function(event, data) {

            console.log('VoterView.fn.requestDone');

            this.setData(event, data);

            return this;

        },

        // Processing done request
        requestError: function(event, data) {

            console.log('VoterView.fn.requestError');

            return this;

        },

        setData: function(event, data) {

            //console.log('VoterView', data);

            var status = data.status,
                userVote = data.userVote,
                overall = data.rating,
                votes = data.users,
                starsValue = data.rating_width || ((overall*20).toFixed(2));

            // Устанавливаем значения в представлении
            // Статус блока
            if (status) {
                this.set('status', status);
            }

            // Выбор юзера
            if (data.userVote) {
                this.set('userVote', userVote);
            }

            // Общий рейтинг
            this.set('overall', overall);

            // Всего проголосовало
            this.set('votes', votes);

            // Рейтинг в процентах
            this.set('starsValue', starsValue);

            // Деактивируем голосование
            if (votes) {
                this.set('starsDeactive', true);
            }

            return this;

        }

    });

    /*
     * VoterCollection
     * Модуль, для работы с коллекцией голосовалок
     * Singleton
     *
     */

    var VoterCollection = {

        // Хранилище объектов
        voters: {},

        // Настройки
        _meta: {
            //tmplLabel: '#userReviewTmpl'
        },

        initItem: function(itemsClass) {

            var self = this;

            $(itemsClass).each(function(index, el) {

                var $el = $(el),
                    item = null,
                    //tmplLabel = self._meta.tmplLabel,
                    tmplRequire = require('./userReview.ihtml'),
                    tmplTarget = $el[0];

                // Создаем обЪект голосования
                item = new VoterView({
                    el: tmplTarget,
                    template: tmplRequire,
                    // Записываем id статьи, для фильтра
                    data: function() {
                        return { materialId: self.getMaterialId() }
                    }
                });

                // Помещаем в хранилище
                if (!self.voters[item._guid]) { 
                    self.voters[item._guid] = item;
                    $el.attr('id', item._guid);

                    // Показываем, если есть рейтинг от автора
                    if (!!$('#ratingVal').length) $('.article-main__vote-soc').addClass('show-rating');

                } else {
                    console.error('такой объект уже есть');
                }

            });

            return this;

        },

        /*
         * Helpers
         *
         */

        getMaterialId: function() {

            return $('meta[property="article:id"]').attr('content');

        },

        // Метод инициализации компонента
        init: function() {

            this.initItem('.user-review-wrapper');

            return this;

        }

    };    

  // Запуск синглтонов
  // Voter - модуль голосовалки
  BootSingleton([
        VoterCollection, // инициализируем первым, чтобы сохранить порядок подписчиков
        VoterModel
    ]);


    /*
     * Section loader
     * Модуль для загрузки инфоблоков в статье
     *
     */

    var SectionLoader = function(options) {

        this.tmplTarget = options.tmplTarget;
        //this.tmplLabel = options.tmplLabel;
        this.tmplRequire = options.tmplRequire;
        this.viewModule = null;
        this.requestOptions = options.requestOptions;

        return this;

    };

    // Короткая запись прототипа
    SectionLoader.fn = SectionLoader.prototype;

    // Получаем данные для модуля
    SectionLoader.fn.getDataModule = function() {

        var self = this;

        $.getJSON(this.requestOptions.url)
            .done(function(data){
                self.setDataModule(data);
            })
            .fail(function(data){
                console.error(data);
            });

        return this;

    };

    /*
     * Views
     *
     */

    SectionLoader.fn.setDataModule = function(data) {

        this.viewModule.set(data);

        return this;     

    };

    /*
     * Методы автоинициализации
     *
     */

    // Инициализация модулей
    SectionLoader.fn.initModule = function() {

        var self = this;

        // Инициализация модуля отображения
        self.viewModule = new Ractive({
                el: self.tmplTarget,
                template: self.tmplRequire,
                data: function() {
                    return {};
                }
            });

        return this;

    };

    // Основной инит
    SectionLoader.fn.init = function() {

        this.initModule()
            .getDataModule();

        return this;

    };



    /*
     * Запускаем блоки
     *
     */

    // Запуск всех блоков автора
    (function initAllAuthorSectionBox(SL) {

        $('.article-author-box__authorId').each(function(index, el){

            var $el = $(el),
                $articleAuthorBox = null,
                 authorId = $(el).text();

            $articleAuthorBox = $('<div />', {
                    'id': 'articleAuthorBox_' + authorId,
                    'class': 'article-author-box'
                });

            $el.before($articleAuthorBox);

            // Инициализируем блок автора
            new SL({
                //tmplLabel: "#articleAuthorTmpl",
                tmplRequire: require('../../../../blocks/custom/projects/kino/sidebar/article-left-wrapper/articleAuthor/articleAuthor.ihtml'),
                tmplTarget: "#articleAuthorBox_" + authorId,
                requestOptions: {
                    url: "//kino.rg.ru/api/author/" + authorId + "/info/?callback=?"
                }
            }).init();

        });

    })(SectionLoader);

/*    // Автор
    var authorSectionLoader = new SectionLoader({
        //tmplLabel: "#articleAuthorTmpl",
        tmplRequire: "",
        tmplTarget: "#articleAuthorBox",
        requestOptions: {
            url: "//kino.rg.ru/api/author/" + $('#articleAuthorBox_authorId').text() + "/info/?callback=?"
        }
    }).init(); */

    // Популярное
    var popularSectionLoader = new SectionLoader({
        //tmplLabel: "#articlePopularTmpl",
        tmplRequire: require('../../../../blocks/custom/projects/kino/sidebar/article-left-wrapper/articlePopular/articlePopular.ihtml'),
        tmplTarget: "#articlePopularBox",
        requestOptions: {
            url: "//kino.rg.ru/api/popular/?callback=?"
        }
    }).init();
	
    // Другие материалы
    var otherSectionLoader = new SectionLoader({
        //tmplLabel: "#articleOtherMaterialsTmpl",
        tmplRequire: require('../../../../blocks/custom/projects/kino/main/articleOtherMaterials/articleOtherMaterials.ihtml'),
        tmplTarget: "#articleOtherMaterialsBox",
        requestOptions: {
            url: "//kino.rg.ru/api/other/" + $('meta[property="article:id"]').attr('content') + "/?callback=?"
        }
    }).init();




    // Прокрутка к комментарию, по клику на кнопку
    $('.button__item_add-to-comment').on('click', function(e){

        e.preventDefault();

        $('html, body').animate({scrollTop: $('#comBox').offset().top }, 1000);

    });

    //Появляющийся блок ответов в левой панели киноигры
    
    var $questList = $('#kinogame-side__questList'),
        $questListBtn = $('.kinogame-side__answer-reveal'),
        $answerRevealOn = 'answer-reveal-on';

        $questListBtn.on('click', function(){

            $questList.slideToggle();
            $questListBtn.toggleClass($answerRevealOn);

            console.log($(this).text());

            if( $(this).text() == "Посмотреть правильные ответы" ) {

                $(this).text("Скрыть правильные ответы")

            } else {

                $(this).text("Посмотреть правильные ответы")

            }




        });


});