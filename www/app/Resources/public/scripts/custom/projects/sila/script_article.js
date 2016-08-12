/**
 * Подключение модуля материлов сюжета
 */
RG.SujetMaterials = RG.SujetMaterials || require('../../../../blocks/overlays/b-sujet-materials/scripts/main');

/**
 * Подключение модуля видео
 */
RG.Video = RG.Video || require('../../../modules/Video');

/**
 * Подключение модуля галереи
 */
RG.Gall = RG.Gall || require('../../../modules/Gall');

/**
 * Подключение модуля нормализации ширины и высоты блоков
 */
RG.MediaNormalize = RG.MediaNormalize || require('../../../modules/MediaNormalize');

/**
 * Подключение модуля нормализации картинки, вставленной через редактуру
 */
RG.ImageNormalize = RG.ImageNormalize || require('../../../modules/ImageNormalize');

/**
 * Фотогаллереи
 */
Ractive.components['rg-gall'] = require('../../../../blocks/main/b-gallery/scripts/Gallery');

// Инициализация видео
RG.Video.init();

// Инициализация галереи
RG.Gall.init();

// Инициализация нормализации
RG.MediaNormalize.init({
    mediaWrapper: '.b-article-page-wrapper'
});

/*
 * Инициализация галереи в фоторепе (нового типа)
 *
 */

function rgG(optionId, galleryId){

    var

        // Определяем контейнер со скриптом
        $scriptRoot = $(`#rgG${optionId}`),

        // Определяем контейнер,
        // куда будем инициализировать галерею
        $root = $('<div/>', {
            id: `gallery_${galleryId}_${optionId}`
        });

    // Настраиваем контейнер, внутри которого скрипт
    $scriptRoot
        .parent()
        .addClass('gall-root');

    // Добавляем контейнер, в который будем помещать галерею
    $scriptRoot.before($root);

    // Инициализируем галерею
    RG.Gall.gallCreate({
        optionId: optionId,
        galleryId: galleryId,
        el: $root[0]
    });

}

window.rgG = rgG;

$(function(){

	// Запуск видео анализатора
	RG.events.publish(`${RG.Video._modulePrefix}.run`);

	// Запуск парсера компонента галереи
	RG.parser.render('rg-gall');

	/*
     * Инициализация видео через компонент
     *
     */

    RG.parser.render('rg-video');

/*
 * Ajax creator
 */

 window.ajaxCreator = {
	screen_width: $(window).width(),
	article_id: $('meta[property="article:id"]').attr('content') || 0

 };

 ajaxCreator.createTagsBox = function(data) {

 	var $tagsBox = $('#tagsBox');

 	$tagsBox.html(data);
 	$tagsBox.removeClass('not-content');

 };


 ajaxCreator.createSimilarArticleBox = function(data) {

 	var $similarArticleBox = null;

	if (this.screen_width > 943) {

		$similarArticleBox = $('#similarArticle');

		$('#similarArticleSmallW').addClass('not-content');

	} else {

		$similarArticleBox = $('#similarArticleSmallW');

		$('#similarArticle').addClass('not-content');

	}

 	$similarArticleBox.find('div').html(data);
 	$similarArticleBox.removeClass('not-content');

 };


 ajaxCreator.createRubricArticleBox = function(data) {

 	var $similarArticleBox = null;

	if (this.screen_width > 943) {

		$similarArticleBox = $('#rubricArticle');

		$('#rubricArticleSmallW').addClass('not-content');

	} else {

		$similarArticleBox = $('#rubricArticleSmallW');

		$('#rubricArticle').addClass('not-content');

	}

 	$similarArticleBox.find('div').html(data);
 	$similarArticleBox.removeClass('not-content');

 };

 ajaxCreator.createAuthorLastArticles  = function(data) {

 	var $authorLastArticlesBox = null;

	if (this.screen_width > 943) {

		$authorLastArticlesBox = $('#authorLastArticlesBox');

		$('#authorLastArticlesBoxSmallW').addClass('not-content');

	} else {

		$authorLastArticlesBox = $('#authorLastArticlesBoxSmallW');

		$('#authorLastArticlesBox').addClass('not-content');

	}

 	$authorLastArticlesBox.find('div').html(data);
 	$authorLastArticlesBox.removeClass('not-content');

 };

 ajaxCreator.createAuthorsBox = function(data) {

 	var $authorsBox = $('#authorsBottomBox');

 	if (!!data) {

	 	$authorsBox.html(data);
	 	$authorsBox.removeClass('not-content');
	}

 };

  ajaxCreator.createAuthorsTopBox = function(data) {

 	var $authorsBox = $('#authorsTopBox');

 	if (!!data) {

	 	$authorsBox.html(data);
	 	$authorsBox.removeClass('not-content');
	}

 };


 ajaxCreator.createTagsList = function(data) {

 	var $tagsListBox = $('#tagsListBox');

 	if (!!data) {

	 	$tagsListBox.find('#tagsListContent').html(data);
	 	//$tagsListBox.removeClass('not-content');

		if (!!$tagsListBox.find('#tagsListContent').length) {

			$tagsListBox.removeClass('not-content');
			$('#tagsBox').addClass('not-content');

			if ( !$tagsListBox.find('#tagsListContent .b-item__tags__unit').length ){
				$(".b-others-tags").hide();
			}

		}

	}

 };

 ajaxCreator.initBlock = function() {

 	var tagsData = this.tagsData || null,
 		similarArticleData = this.similarArticleData || null,
 		rubricArticleData = this.rubricArticleData || null,
 		//authorsData = this.authorsData || null,
 		authorsTopData = this.authorsTopData || null,
		authorLastArticles = this.authorLastArticles || null,
		tagsList = this.tagsList || null;

 	(!!tagsData) && this.createTagsBox(tagsData);
 	(!!similarArticleData) && this.createSimilarArticleBox(similarArticleData);
 	(!!rubricArticleData) && this.createRubricArticleBox(rubricArticleData);
 	(!!authorsTopData) && this.createAuthorsTopBox(authorsTopData);
 	//(!!authorsData) && this.createAuthorsBox(authorsData);
 	(!!authorLastArticles) && this.createAuthorLastArticles(authorLastArticles);
 	(!!tagsList) && this.createTagsList(tagsList);

 };

  ajaxCreator.getData = function() {

 	var _ajaxCreator = this;

	$.getJSON('//sila.rg.ru' + '/?article_id=' + this.article_id + '&get_article_blocks_action=1&callback=?', function(data){
	//$.getJSON(project_url + '/?article_id=1009770&get_article_blocks_action=1&callback=?', function(data){

		_ajaxCreator.tagsData = data.tags;
		_ajaxCreator.similarArticleData = data.similar_articles;
		_ajaxCreator.rubricArticleData = data.rubric_articles;
		_ajaxCreator.authorsTopData = data.authors_top;
		_ajaxCreator.authorLastArticles = data.author_last_articles;
		_ajaxCreator.tagsList = data.tags_top;

		_ajaxCreator.initBlock();

	});

 };

 /* Chartbeat article */
 var getArticle = function() {

	var $popsArticleBox = null;

	if ($(window).width() > 975) {

		$popsArticleBox = $('#popsArticle');

		$('#popsArticleSmallW').addClass('not-content');

	} else {

		$popsArticleBox = $('#popsArticleSmallW');

		$('#popsArticle').addClass('not-content');

	}

	if (!ajaxCreator.popsArticle) {

		$.get('/ssi/chartbeat/top_' + 'digital' + '.ssi', function(data){

			ajaxCreator.popsArticle = data;



			$popsArticleBox.find('div').html(data);
			$popsArticleBox.removeClass('not-content');

		});

	} else {

		$popsArticleBox.find('div').html(ajaxCreator.popsArticle);
		$popsArticleBox.removeClass('not-content');

	}

 };

$(window).on('resize', function(){

	ajaxCreator.screen_width = $(window).width();

	ajaxCreator.initBlock();

	getArticle();

});

ajaxCreator.getData();
getArticle();

/*var fansyPhotorepInit = function() {

	$('.main-text .tile').addClass('photorepReady');

	$('.img_small_r_item a, .img_big_l a').fancybox({
		'width'				: 600,
		'height'			: 642,
		'autoScale'     	: true,
		'autoDimensions'	: false,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'type'				: 'iframe',
		'scrolling'			: 'no',
		'overlayColor'		: '#222',
		'showCloseButton'	: false,
		'padding'			: '0',
		'margin'			: '0'
	});

};

$(window).load(fansyPhotorepInit);*/

/* hash generator */
window.hashGen = {
	$root: $('#mainTextBox'),
	find_map: 'u',
	find_result: null,
	tmpl: {
		container: '<a></a>',
		container_class: 'tags_in_text',
		url_path: '//sila.rg.ru' + '/hash/'
	}
};

hashGen.replaceElements = function() {

	var $elements = this.find_result,
		 tmpl = this.tmpl,
		 tag = tmpl.container,
		 tag_class = tmpl.container_class,
		 url_path = tmpl.url_path;

	$elements.each(function(index, elements){

		var $el = $(elements),
			 hash = $el.text(),
			 res_url = url_path + hash,
			$tag = $(tag, {
				'class': tag_class,
				'href': res_url
			});

		$tag.text(hash);

		$el.after($tag);

		$el.remove();

	});

};

hashGen.findElements = function() {

	var $el = this.$root.find(this.find_map);

	if (!!$el) this.find_result = $el;

	return !!$el;

};

hashGen.init = function() {

	if (this.findElements()) this.replaceElements();

};

hashGen.init();



/* load more article */

window.moreNews = {

	$root: $('#popularMaterialsBox'),
	$moreBtn: $('#loadDataBtn'),
	 more_btn_loading_class: 'more_btn_loading',
	 offset_article: 9,
	 num_article: 9,
	 request_tmpl: '/include/has-300x200-image/tmpl-d-large-events-th/sujet-5327/'

};

moreNews.loadMaterials = function(e) {

	if(e) e.preventDefault();

	var _this = e.data._this || this;

	_this.$moreBtn.addClass(_this.more_btn_loading_class);

	$.post(_this.request_tmpl + 'offset-' + _this.offset_article + '/num-' + _this.num_article + '/', function(data) { _this.appendMaterials(data) });

};

moreNews.appendMaterials = function(data_materials) {

	var $root = this.$root,
		$moreBtn = this.$moreBtn;


	$root.append(data_materials);

	this.offset_article = this.offset_article + this.num_article;

	if(data_materials.match(/d_large_cycle/g).length < this.num_article) $moreBtn.remove();

	$moreBtn.removeClass(this.more_btn_loading_class);

};

moreNews.init = function() {

	this.$moreBtn.on('click', { _this: this }, this.loadMaterials);

};

moreNews.init();



/*
 * Add by Alex 01.07.2015
 * Скрипт ловит вставленные через FCK картинки и стилизует их (аналогично, как на боевом)
 */

/* --- Add info in image incut on artice --- */

var image_info = {

	setInfo: function() {

		var $images = $('.b-article-main-block img[data-title]');

		if (!!$images.length) {

			$images.each(function(index, image){

				var $image_wrapper = $('<div />').addClass('article-img'),
					$image = $(image),
					$image_box = $('<div />'),
					$info_box = $('<div />'),
					 title = $image.attr('data-title') || '',
					 source = null,
					 align = $image.attr('align'),
					 image_width = $image.width();

				source = ($image.attr('data-source')) ? '<b> Фото: ' + $image.attr('data-source') + '</b>' : '';

				// append image wrapper before image
				$image.before($image_wrapper);

				// set image wrapper type width and float
				$image_wrapper.addClass('article-img_' + image_width);

				if (!!align) $image_wrapper.addClass('article-img_f_' + align);

				// set image data
				$image_box.addClass('article-img__pic');
				$image_box.append($image);

				// set info data
				$info_box.addClass('article-img__info');

				$info_box.html(
					'<div class="article-img__info__text">' +
						title + source +
					'</div>'
				);

				// append to image_wrapper

				$image_wrapper
					.append($image_box)
					.append($info_box);

			});

		}

		return this;

	},

	init: function() {

		this.setInfo();

	}

};

image_info.init();


/*
 * Random Modules init
 * Загрузка в случайном порядке модулей
 *
 */

window.RandomModuleLoader = {

	// Коллекция модулей
	modules: [],

	/*
	 * Methods
	 *
	 */

	// Добавить модуль в коллекцию инициализации
	// В данном случае модуль это функция
	pushModuleCallback: function(moduleInit) {
		this.modules.push(moduleInit);

		return this;
	},

	// Получить случайное целое число в пределе от min до max
	getRandom: function(min, max) {
	    return Math.floor(Math.random()*(max-min+1)+min);
	},

	// Инициализация загрузчика
	init: function(options) {

		var modules = this.modules,
			min = options.threshold || 0,
			modulesLength = (modules.length - 1),
			modulesIndex = null;

		// Если в коллекции есть хотя бы один модуль
		if (!!modulesLength) {

			// Определяем случайный номер в коллекции, который надо вызвать
			modulesIndex = this.getRandom(min, modulesLength);

			// Запускаем функцию модуля, который мы поместили в коллекцию
			if (modulesIndex) {
				if (typeof(modules[modulesIndex]) === 'function') {
					modules[modulesIndex](modulesIndex, this);
				} else {
					console.info('невозможно вызвать функцию модуля, получили: ', modules[modulesIndex]);
				}
			} else {
				console.info('индекс не определен');
			}

		}

		return this;
	}

};

/*RandomModuleLoader
	.pushModuleCallback(function(index, _thisLoader){
		console.log(index, _thisLoader);
	})
	.pushModuleCallback(function(index, _thisLoader){
		console.log(index, _thisLoader);
	})
	.init({ threshold: 0 });*/


/*
 * GA checker module
 * Модуль отправки событий GA
 *
 */

var GA = function(options) {

	this.moduleId = options.moduleId || null;
	this.events = options.events || [];

	return this;

};

GA.fn = GA.prototype;

// Methods
GA.fn.sendEvent = function(param) {

	var moduleId = (this.moduleId) ? (this.moduleId + '.send') : 'send';

	ga(moduleId, 'event', param.category, param.doEvent);

	console.info('ga(' + moduleId+ ', "event", ' + param.category + ', ' + param.doEvent + ')');

	return this;

};

GA.fn.init = function() {

	var self = this,
		events = this.events;

	// Пробегаемся по всем событиям, которые мы привязали к модулю
	$.each(events, function(index, eventItem){

		// Устанавливаем обработчик событий, если есть элемент
		// иначе устанавливаем подписчика на событие
		if (!!eventItem.elementLabel) {

			$(document).on(eventItem.eventType, eventItem.elementLabel, function(event) {
				self.sendEvent(eventItem.param);
			});

		} else {

			$(document).on(eventItem.eventType, function(event, param) {
				self.sendEvent(eventItem.param);
			});

		}

	});

	return this;

};

// Init Relap GA module
var gaReadMore = new GA({
	moduleId: project_id_str,
	events: [
		{
			eventType: 'Relap:init',
			param: {
				// Не забывай менять имя проекта!!!
				category: 'Relap.Sila',
				doEvent: 'relap init'
			}
		},
		{
			elementLabel: '.js-relap__item-link',
			eventType: 'click',
			param: {
				// Не забывай менять имя проекта!!!
				category: 'Relap.Sila',
				doEvent: 'relap click'
			}
		},
		{
			eventType: 'Nextclick:init',
			param: {
				// Не забывай менять имя проекта!!!
				category: 'Nextclick.Sila',
				doEvent: 'nextclick init'
			}
		},
		{
			elementLabel: '.ncwArticle',
			eventType: 'mousedown',
			param: {
				// Не забывай менять имя проекта!!!
				category: 'Nextclick.Sila',
				doEvent: 'nextclick click'
			}
		}
	]
}).init();

/*
 * Relap init checker
 * Проверка, когда загрузился релап
 *
 */

(function(w) {

	var relapInitChecker = {

			// Property
			relapLabel: '.js-relap__items-container',
			trigger: 'Relap:init',
			intervalTime: 3000,

			// Methods
			relapInitWatch: function() {

				var self = this,
					intervalId = null;

				intervalId = setInterval(function(){

					if (!!$(self.relapLabel).length) {

						$(document).trigger(self.trigger);

						clearInterval(intervalId);

					}

				}, self.intervalTime);

			}
		};

	relapInitChecker.relapInitWatch();

})();

/*
 * NextClick init checker
 * Проверка, когда загрузился NextClick
 *
 */

(function(w) {

	var nextClickInitChecker = {

			// Property
			relapLabel: '.Nextclick_Widget_Container',
			trigger: 'Nextclick:init',
			intervalTime: 3000,

			// Methods
			nextClickInitWatch: function() {

				var self = this,
					intervalId = null;

				intervalId = setInterval(function(){

					if (!!$(self.relapLabel).length) {

						$(document).trigger(self.trigger);

						clearInterval(intervalId);

					}

				}, self.intervalTime);

			}
		};

	nextClickInitChecker.nextClickInitWatch();

})();



/*=
var offsetArt = 23,
      numArt = 12;
$('#openmorenews').click(function(e){

	e.preventDefault();

	$(this).addClass('more_loading');

		$.post("/include/tmpl-d-large/sujet-5054/has-large-image/add-subtitle/offset-" + offsetArt + "/num-" + numArt + "/",
		function(data){
		 $('.inc').append(data);
		 $('.inc img').load(function(){ columner.prepareElementsArray().transitionElements().resizeRootElements();delRegions(); });

		 offsetArt = numArt + offsetArt;

		 if(data.match(/include_item/g).length < numArt) { $('#openmorenews').remove(); }

		 $('#openmorenews').removeClass('more_loading');

		});//$.POST

	});//Event:click

});*/

/* Подключаем комментарии по-новому */
RG.Ads.init();

// Инициализируем баннер Adfox
RG.events.publish(`${RG.Ads.Adfox_modulePrefix}.run`);

// Инициализируем баннер Adfox
RG.events.publish(`${RG.Ads.YaDirect_modulePrefix}.init`);



});