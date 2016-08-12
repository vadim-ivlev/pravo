$(function(){

'use strict;'

window.imageChecker = {

	elements_class: {
		main: 'big-hor',
		second: 'mid-hor',
		author: 'auth-col'
	},
	screen_size: { //все, что больше
		full_hd: 1200,
		desctop: 992,
		tablets: 768
	},
	current_width: {
		main: 1000,
		second: 600
	},
	type_width: {
		large: 1000,
		medium: 600,
		small: 300
	},
	_meta: {
		screen_width: null,
		screen_height: null,
		elements_y: null,
		iterator: 0
	}

};

/*
 * Compose object
 */

imageChecker.prepareChecking = function() {

	var main_elements = imageChecker.getElements('.' + imageChecker.elements_class.main),
		second_elements = imageChecker.getElements('.' + imageChecker.elements_class.second);

	this.getScreenHeight();
	this.getScreenWidth();
	
	//clean for scrollloading articles
	this._meta.elements_y = null;

	if (!!main_elements) {
	
		this._meta.elements_y = !!main_elements && this.getElementsPosition(main_elements);
	
	}
	
	if (!!second_elements) {
	
		this._meta.elements_y = !!second_elements && this.getElementsPosition(second_elements);
		
	}
	
	this.setCurrentWidth();

};

imageChecker.getElementsPosition = function($elements) {

	var element_y = null,
		elements_y = this._meta.elements_y || {},
		offset_list = this._meta.offset_list || [];

	$elements.each(function(index, element){

		element_y = Math.ceil($(element).offset().top);

		if (!elements_y[element_y]) {		

			elements_y[element_y] = [];

			elements_y[element_y].push(element);

			offset_list.push(element_y);
			
		} else {

			elements_y[element_y].push(element);

		}

	});

	this._meta.offset_list = offset_list.sort(function(a, b){ return (a - b); });

	return elements_y;

};

imageChecker.loadImage = function($elements) {

	var _imageChecker = this,
		width_main_img = _imageChecker.current_width.main,
		width_second_img = _imageChecker.current_width.second;

	$elements.each(function(index, element){

		var $element = $(element),
			$image = $element.find('.caption'),
			 image_src_root = '//cdnimg.rg.ru',
			 image_src_path = '//cdnimg.rg.ru/scale/img/center/width-',
			 image_src = '';

		if ($element.hasClass(_imageChecker.elements_class.main)) {
		
			if (width_main_img === 1000) {
			
				image_src = image_src_root + $image.attr('data-src');
			
			} else {

				image_src = image_src_path + width_main_img + $image.attr('data-src');
				
			}

		} else {
		
			if (width_second_img === 1000) {
			
				image_src = image_src_root + $image.attr('data-src');
			
			} else {

				image_src = image_src_path + width_second_img + $image.attr('data-src');
			
			}

		}

		$image.attr('src', image_src);
		$image.addClass('checked');

	});

};

imageChecker.checkImageOnLoad = function() {

	var elements_y = this._meta.elements_y;

	for(pos_y in elements_y) {

		//if (this._meta.screen_height > pos_y) {

			this.loadImage($(elements_y[pos_y]));

			this._meta.iterator += 1;

		//}

	}

};

imageChecker.checkImage = function() {

	var events = !!arguments[0] && arguments[0] || null,
		_imageChecker = !!events && events.data._imageChecker || this,

		scroll_offset_y = $(window).scrollTop(),
		screen_height = _imageChecker._meta.screen_height,
		elements_y = _imageChecker._meta.elements_y,
		offset_list = _imageChecker._meta.offset_list,
		iterator = _imageChecker._meta.iterator;

		// if ( (scroll_offset_y + screen_height + 200) > offset_list[iterator]) {

		// 	_imageChecker.loadImage($(elements_y[offset_list[iterator]]));

		// 	_imageChecker._meta.iterator += 1;

		// }

};

/*
 * Instruments
 */

imageChecker.getScreenHeight = function() { this._meta.screen_height = $(window).height(); };

imageChecker.getScreenWidth = function() { this._meta.screen_width = $('body').width(); };

imageChecker.getElements = function(elements_class) {

	var $elements = !!$(elements_class).length && $(elements_class) || null;

	return $elements;

};

imageChecker.setCurrentWidth = function() {

	var events = !!arguments[0] && arguments[0] || null,
		_imageChecker = !!events && events.data._imageChecker || this,
		current_width = null;

	_imageChecker.getScreenWidth();

	current_width = _imageChecker._meta.screen_width;

	/* --- Full HD --- */

	if(current_width > _imageChecker.screen_size.full_hd) {

		_imageChecker.current_width.main = _imageChecker.type_width.large;
		_imageChecker.current_width.second = _imageChecker.type_width.small;

	} else if(current_width > _imageChecker.screen_size.desctop) {

	/* --- Desctop --- */	

		_imageChecker.current_width.main = _imageChecker.type_width.medium;
		_imageChecker.current_width.second = _imageChecker.type_width.medium;

	} else if(current_width > _imageChecker.screen_size.tablets) {

	/* --- Tablets --- */

		_imageChecker.current_width.main = _imageChecker.type_width.large;
		_imageChecker.current_width.second = _imageChecker.type_width.medium;

	} else if(current_width < _imageChecker.screen_size.tablets) {

	/* --- Phones --- */

		_imageChecker.current_width.main = _imageChecker.type_width.large;
		_imageChecker.current_width.second = _imageChecker.type_width.large;

	}

};

/*
 * Init
 */

imageChecker.init = function() {

	this.prepareChecking();

	this.checkImageOnLoad();
	
	$(window).on('scroll', { _imageChecker: imageChecker }, this.checkImage); 
	$(window).on('resize', { _imageChecker: imageChecker }, this.setCurrentWidth); 

};

imageChecker.init();

/*
 * Analytics
 *
 */
 
var rubr_name_click = null,
	rubr_hovered = false,
	timeout = null;
 
var sendRubricsHoverGa = function(rubr_name) { 

	ga(project_id_str + '.send', 'event', 'Interface', 'Rubrics. Submenu. Open. ' + rubr_name);

};

var sendRubricsClickGa = function(rubr_name) {

	ga(project_id_str + '.send', 'event', 'Interface', 'Rubrics. Submenu. Click to link. ' + rubr_name);

};

/* $('#navigation .b-item__popup ul li a').on('click', function(e){

	//e.preventDefault();
 
	var rubr_name = rubr_name_click,
		href = $(this).attr('href');
	
	sendRubricsClickGa(rubr_name);
	
	/*setTimeout(function(){
	
		location.href = href;
	
	}, 1000);

});

$('#navigation ul > li a').on('mouseenter', function(e){

	var rubr_name = $(this).attr('data-rubric') || rubr_name_click;
	
	rubr_hovered = true;
	
	if($(this).attr('data-rubric')) {
	
		rubr_name_click = $(this).attr('data-rubric');
	
	}
	
	if (!!$(this).attr('data-rubric')) sendOnTimer(rubr_name);

});

var sendOnTimer = function(rubr_name) {

	if (rubr_hovered) {

		timeout = setTimeout(function() {
		
			sendRubricsHoverGa(rubr_name);
		
		}, 1000);
	
	}

};

$('#navigation ul > li a').on('mouseleave', function(e){

	rubr_hovered = false;
	
	clearTimeout(timeout); 

});

*/


/* init slide menu */
$('#mobile-menu-toggle').sidr({
	name: 'mobile-menu',
	source: '#navigation',
	side: 'right',
	displace : false,
	onOpen: function(){
		
		$('body').addClass('mobile-menu-open-custom');
		
		setTimeout(function(){
		
			$('body').addClass('mobile-menu-open-custom-hidden');
		
		}, 350);
	},
	onClose: function(){
	
		setTimeout(function(){
		
			$('body').removeClass('mobile-menu-open-custom-hidden');
	
			setTimeout(function(){
			
				$('body').removeClass('mobile-menu-open-custom');
				
			}, 120);
			
		}, 100);
	
	}
});

$(window).scroll(function(){
	if( $(window).scrollTop() > 1 ){
		$('.b-header').addClass('b-header-fixed');
		$('.container').addClass('b-main-fixed');
	} 

	if( $(window).scrollTop() < 1 ){
		$('.b-header').removeClass('b-header-fixed');
		$('.container').removeClass('b-main-fixed');
	}
});

/* Load more article */
var finished = false;
var loading = false;
var this_top = 0;
var offset = $('div.offset').text();

function d_load_more_news() {

		if (!!$("#load_mark").length) {

		this_top = $("#load_mark").offset().top - $(window).height() - 600;

		$(window).on('scroll', function() {
		
			if( $(this).scrollTop() > this_top ) {
			
				if (finished == true) return;
				
				if (loading == true) return;
				
				loading = true;
				
				$("#load_mark").addClass('loading');

				$.post('/?', {
					get_more_news_action: 1, 
					action: action, 
					offset: offset, 
					tag: tag, 
					id: author_id, 
					rubric: rubric
				}, function (data) {
				
					if (data == false) finished = true;

					if ($(data).find("div.offset").text() > 0) offset = $(data).find("div.offset").text();
					
					var news = $(data).find('div.content-in').html();

					$('div.content > .content-in').append(news);

					this_top = $("#load_mark").offset().top - $(window).height() - 600;
					
					$("#load_mark").removeClass('loading');

					loading = false;

					imageChecker.init();
					
				});
			}
		});
		
	}

}

if(!!$('#load_mark').length) d_load_more_news();

});