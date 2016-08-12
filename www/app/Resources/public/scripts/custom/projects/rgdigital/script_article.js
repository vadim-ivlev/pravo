$(function(){

	window.photorepBuilder = {
	
		$figureBoxTop: $('#figureBoxTop'),
		$figureTop: $('#figureBoxTop').find('.figure-top'),
		$imagesArticle: null,
		$mainTextBox: $('#mainTextBox')
	
	};
	
	photorepBuilder.checkImages = function() {
	
		var $images = this.$mainTextBox.find('.photoItem');
		
		if ( !!$images.length ) {
		
			this.$imagesArticle = $images;
		
			return true;
		
		} else {
		
			return false;
		
		}
	
	}
	
	photorepBuilder.getDataPhotorepInImg = function() {
	
		var data = [];
	
		this.$imagesArticle.each(function(i, el){
		
			var image_data = {
				
				'src': $(el).attr('src'),
				'alt': $(el).attr('alt')
			
			}
			
			data.push(image_data);
		
		});
	
		return data;
	
	};
	
	photorepBuilder.buildPhotorep = function(data) {
	
		var $photoBox = $('<div class="slider-in-post"></div>'),
			$slidesBox = $('<ul class="slides"></ul>'),
			$slides = '';
		
		$.each(data, function(index, element){
		
			$slides += '<li><img src="' + element.src + '" alt="' + element.alt + '" /></li>';
		
		})
		
		$slidesBox.append($($slides));
		$photoBox.append($slidesBox);
		
		return $photoBox;
	
	};
	
	photorepBuilder.appendPhotorepInTop = function($photorep) {
	
		this.$figureBoxTop.append($photorep);
		this.$figureTop.hide();
	
	};
	
	photorepBuilder.init = function() {
	
		if (this.checkImages()) {
		
			this.appendPhotorepInTop( this.buildPhotorep( this.getDataPhotorepInImg() ) );
			
		}
	
	};
	
	//photorepBuilder.init();
	
/*
 * Build comments
 */
 
var init_comments = function () {

	$.getScript('/js/authorization/init_comments.js');

};

// Не вызываем комментарии
//init_comments();
	
/*
 * Ajax creator
 */
 
 window.ajaxCreator = {
	screen_width: $(window).width(),
	article_id: $('#comments_hidden').attr('oid') || 0
 };

 ajaxCreator.createTagsBox = function(data) {

 	var $tagsBox = $('#tagsBox');

 	$tagsBox.html(data);
 	$tagsBox.removeClass('not-content');

 };

 ajaxCreator.createSimilarArticleBox = function(data) {

 	var $similarArticleBox = null;
	
	if (this.screen_width > 975) {
		
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
	
	if (this.screen_width > 975) {
		
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
	
	if (this.screen_width > 975) {
		
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
		
		}
		
	}

 };

 ajaxCreator.initBlock = function() {

 	var tagsData = this.tagsData || null,
 		similarArticleData = this.similarArticleData || null,
 		rubricArticleData = this.rubricArticleData || null,
 		//authorsData = this.authorsData || null,
 		authorsTopData = this.authorsTopData || null,
		authorLastArticles = this.authorLastArticles || null;
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
 
	$.getJSON(project_url + '/?article_id=' + this.article_id + '&get_article_blocks_action=1&callback=?', function(data){
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
	
		$.get('/ssi/blocks/custom/projects/rgdigital/crosslayouts/b-top/b-top_chartbeat.ssi', function(data){


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
 
var fansyPhotorepInit = function() {

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

$(window).load(fansyPhotorepInit);

/* hash generator */
window.hashGen = {
	$root: $('#mainTextBox'),
	find_map: 'u',
	find_result: null,
	tmpl: {
		container: '<a></a>',
		container_class: 'tags_in_text',
		url_path: project_url + '/hash/'
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
		
		console.log(data_materials);
		console.log(this);
	
	$root.append(data_materials);

	this.offset_article = this.offset_article + this.num_article;

	if(data_materials.match(/d_large_cycle/g).length < this.num_article) $moreBtn.remove();

	$moreBtn.removeClass(this.more_btn_loading_class);

};

moreNews.init = function() {

	this.$moreBtn.on('click', { _this: this }, this.loadMaterials);

};

moreNews.init();



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

/*
 * Stick banner DEMO
 */
 
var Sticker = function (options) {

	// target element
	this.$el = options.$el;

	// bounce element
	this.$bounce = options.$bounce;
	
	// wrapper element
	this.$wrapper = options.$wrapper;

	// window element
	this.$w = $(window);

	this.classes = {
		sticked: 'sticked'
	};

	this.meta = {
		stickOff: false,
		startScrollPoint: null,
		endScrollPoint: null,
		timeout: null,
		delta: options.delta || 0 // отклонение, с какого начинать прилипание
	};

	return this;

};

// Scroll
Sticker.prototype.onScroll = function() {

	var self = this,
		timeout = self.meta.timeout;
		
	// Check on request animation frame
	var requestAnimationFrame = (function() {
		
		return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.msRequestAnimationFrame || null

	}());

	if (requestAnimationFrame) {
	
		requestAnimationFrame(function(){
			self.checkStick.call(self);
		});

	} else {

		if (timeout) { 
			clearTimeout(self.meta.timeout);
			self.meta.timeout = null;
		}

		self.meta.timeout = setTimeout(function(){
		
			self.checkStick.call(self);
			
		}, 100);
	
	}

};

Sticker.prototype.checkStick = function() {

	var	$w = this.$w,
		 scrollTop = $w.scrollTop(),
		 startScrollPoint = this.meta.startScrollPoint,
		 endScrollPoint = this.meta.endScrollPoint,
		 stickOff = this.meta.stickOff;
		 
	if (!stickOff) {

		if (scrollTop > startScrollPoint && scrollTop < endScrollPoint) {

			this.stickEl();
			
			// experiment
			this.meta.hasBottomStick = false;// флан отстыковки от нижней границы

		} else {
		
			if (scrollTop < startScrollPoint) {// если скролл выше таргета

				this.unstickEl();
				
			} else {
			
				if (!this.meta.hasBottomStick) {// если мы еще НЕ пристыковывались
			
					this.meta.hasBottomStick = true;// флаг что мы пристыковались к нижней границе
				
					this.$el.css({
						'position': 'absolute',
						'top': this.$bounce.offset().top - this.$el.height() - this.$wrapper.offset().top - 10
					});
				
				}
			
			}

		}
	
	} else {
	
		this.unstickEl();
	
	}

};

// Stick/unstick
Sticker.prototype.stickEl = function() {
	
	var $el = this.$el,
		elStyle = null;
	
	$el.css('width', this.meta.elWidth);
	 elStyle = $el.attr('style');
	
	if (!/width:[0-9\w\s]+!important/.test(elStyle) && !!elStyle) {
	
		importantStyle = elStyle.replace(/(width:[0-9\w\s]+)/g, "$1!important");
		$el.attr('style', importantStyle);
	
	}

	$el.css({
			'position': 'fixed',
			'top': this.meta.delta
		})
		.addClass(this.classes.sticked);

	return this;

};

Sticker.prototype.unstickEl = function() {
			
	this.$el.attr('style', '')
			.removeClass(this.classes.sticked);

	return this;

};

Sticker.prototype.stickOn = function() {

	this.meta.stickOff = false;
	
	return this;

};

Sticker.prototype.stickOff = function() {

	this.meta.stickOff = true;
	
	return this;

};

// Point
Sticker.prototype.setStartPoint = function() {

	var elOffsetTop = this.$el.offset().top - this.meta.delta;

	this.meta.startScrollPoint = elOffsetTop;

	return this;

};

Sticker.prototype.setEndPoint = function() {

	this.meta.endScrollPoint = this.$bounce.offset().top;

	return this;

};


// Init
Sticker.prototype.prepareEl = function() {

	// Set default width
	this.meta.elWidth = this.$el.outerWidth(true);

	return this;

};

Sticker.prototype.initPoint = function() {

	this.setStartPoint()
		.setEndPoint();

	return this;

};


Sticker.prototype.initEvent = function() {

	var self = this;

	$(window).on('scroll', function(){ self.onScroll(); });

};

Sticker.prototype.init = function() {

	this.prepareEl()
		.initPoint()
		.initEvent();

};

// Init Sticker if DESCTOP
(function(){

	var $w = $(window),
		 verticalDirectSticker = null;
	
	function checkInit() {

		if (!!$('#yandex_ad_vert').length) {

			var $container = $('#yandex_ad_vert');

			if ($w.width() > 975) {
			
				if ($container.find('yatag').length) {
				
					if (verticalDirectSticker) {
					
						verticalDirectSticker.stickOn();
					
					} else {
				
						verticalDirectSticker = new Sticker({
							$el: $container,
							$bounce: $('footer'),
							$wrapper: $container.closest('.mid-vert'),
							 delta: 86
						});

						verticalDirectSticker.stickOn().init();
						
					}			
						
				} else {

					var stickerInitInterval = setInterval(function() {

						verticalDirectSticker = new Sticker({
							$el: $container,
							$bounce: $('footer'),
							$wrapper: $container.closest('.mid-vert'),
							 delta: 86
						});

						verticalDirectSticker.stickOn().init();
						
						clearInterval(stickerInitInterval);
						stickerInitInterval = null;	

					}, 500);
				
				}

			} else {
				verticalDirectSticker.stickOff();
			}

		}
	
	};
	
	//$w.on('resize', checkInit);
	//checkInit();

})();


});