'use strict;'

/***************
 * COUNSRUCTOR *
 ***************/

var Gall = function(ID_GALL, ROOT_BUILDER) {

	//Builder pointer
	this.ROOT_BUILDER = (ROOT_BUILDER) ? ROOT_BUILDER : {};

	//config idx elements
	this._id_elements = {
		root_element: '#gallBox_' + this.ROOT_BUILDER._meta.option_id + '_' + ID_GALL,
		close_btn: '#gallBoxClose'
	};

	//config classes elements
	this._classes_elements = {

		list_wrapper: '.rg-gall-b__main__pic-wrapper__list',
		list_box_element: '.rg-gall-b__main__pic-wrapper__list__unit',
		list_wrapper_arrow_element: '.rg-gall-b__main__pic-wrapper__arrow__unit',
		list_wrapper_pic_source: '.rg-gall-b__main__pic-wrapper__list__unit__pic__source',

		thumb_wrapper: '.rg-gall-b__main__pic-thumb__wrapper',
		thumb_list: '.rg-gall-b__main__pic-thumb__wrapper__list',
		thumb_item: '.rg-gall-b__main__pic-thumb__wrapper__list__unit',
		thumbs_arrow_element: '.rg-gall-b__main__pic-thumb__arrow__unit',

		repeat_box: '.rg-gall-b__top-box__unit_repeat',
		top_box_btn: '.rg-gall-b__top-box__unit__pic__link_load_gall'

	};

	//config classes behavoir
	this._classes_behavoir = {

		active_item: 'rg-gall-b__main__pic-wrapper__list__unit_active',
		active_thumb_item: 'rg-gall-b__main__pic-thumb__wrapper__list__unit_active',
		animate: 'rg-gall-b__main__pic-wrapper__list_animate',
		hide_gall: 'rg-gall-wrapper-b_hide'

		//active_menu: 'gall-b__nav__item_active',

	};

	//config elements
	this._elements = {};

	//conf meta
	this._meta = {

		item_index: 0,
		thumb_item_index: 0,

		width_item: null,
		list_length: null,

		thumbs_width_item: null,
		thumbs_list_length: null,

		drag_start: false,
		touching: false,
		touch_pos_x: null,
		touch_pos_x_new: null,
		
		animating: false,
		autoscroll: false,

		hasTransition: null,
		hasTranslate3d: null,
		hasTouch: null
	
	};

	return this;

};

Gall.prototype.init = function () {

	this.checkProp()
		.checkTouch()
		.setElements()
		.initEvents();

	return this;

};

/************
 * ELEMENTS *
 ************/

/* --- root --- */

Gall.prototype.setRoot = function() {

	var $root = $(this._id_elements.root_element);

	this._elements.$root = $root;

	return this;
};

/* --- list wrapper --- */

Gall.prototype.setListWrapper = function() {

	var $listWrapper = this._elements.$root.find(this._classes_elements.list_wrapper);

	this._elements.$listWrapper = $listWrapper;

	return this;

};

Gall.prototype.setListWrapperPicSource = function() {

	var $listWrapper = this._elements.$listWrapper,
		$listWrapperPicSource = $listWrapper.find(this._classes_elements.list_wrapper_pic_source);

	this._elements.$listWrapperPicSource = $listWrapperPicSource;

	return this;

};

Gall.prototype.setListWrapperWidth = function() {

	var $listWrapper = this._elements.$listWrapper,
		 wrapper_width = this._meta.list_length*this._meta.width_item;

	$listWrapper.css('width', wrapper_width + 'px');

	return this;

};

/* --- list box --- */

Gall.prototype.setListBox = function() {

	var $listBox = this._elements.$root.find(this._classes_elements.list_box_element);

	this._elements.$listBox = $listBox;

	return this;

};

Gall.prototype.setListBoxInfo = function() {

	var $listBox = this._elements.$listBox;

	this._meta.width_item = $listBox.width();
	this._meta.list_length = $listBox.length;

	return this;

};

/* --- thumbs box --- */

Gall.prototype.setThumbsWrapperBox = function() {

	var $thumbsWrapperBox = this._elements.$root.find(this._classes_elements.thumb_wrapper);

	this._elements.$thumbsWrapperBox = $thumbsWrapperBox;

	return this;

};

Gall.prototype.setThumbsListBox = function() {

	var $thumbsListBox = this._elements.$root.find(this._classes_elements.thumb_list);

	this._elements.$thumbsListBox = $thumbsListBox;

	return this;

};

Gall.prototype.setThumbsListBoxWidth = function() {

	var $thumbsListBox = this._elements.$thumbsListBox,
		 thumbs_list_width = this._meta.thumbs_list_length*this._meta.thumbs_width_item;

	$thumbsListBox.css('width', thumbs_list_width + 'px');

	return this;

};

Gall.prototype.setThumbsItem = function() {

	var $thumbsItem = this._elements.$root.find(this._classes_elements.thumb_item);

	this._elements.$thumbsItem = $thumbsItem;

	return this;

};

Gall.prototype.setThumbsItemInfo = function() {

	var $thumbsItem = this._elements.$thumbsItem;

	this._meta.thumbs_width_item = $thumbsItem.outerWidth(true);
	this._meta.thumbs_list_length = $thumbsItem.length;

	return this;

};

/* --- arrow --- */

Gall.prototype.setArrowElements = function() {

	var $arrow = this._elements.$root.find(this._classes_elements.list_wrapper_arrow_element);

	this._elements.$arrow = $arrow;

	return this;

};

Gall.prototype.setArrowThumbsElements = function() {

	var $arrowThumbs = this._elements.$root.find(this._classes_elements.thumbs_arrow_element);

	this._elements.$arrowThumbs = $arrowThumbs;

	return this;

};

/* --- repeat box --- */

Gall.prototype.setRepeatBox = function () {

	var $repeatBox = this._elements.$root.find(this._classes_elements.repeat_box);

	this._elements.$repeatBox = $repeatBox;

	return this;

}

/* --- top box btn --- */

Gall.prototype.setTopBoxBtn = function () {

	var $topBoxBtn = this._elements.$root.find(this._classes_elements.top_box_btn);

	this._elements.$topBoxBtn = $topBoxBtn;

	return this;

}

/* --- close btn --- */

Gall.prototype.setCloseBtn = function() {

	var $closeBtn = this._elements.$root.find(this._id_elements.close_btn);

	this._elements.$closeBtn = $closeBtn;

	return this;

};

/*************
 * TRANSLATE *
 *************/

/* --- instruments --- */

Gall.prototype.checkTransition = function() {

	var transition = false,
		style = document.createElement('p').style,
		property = 'transition';

	if (style[property] === '') transition = true;

	this._meta.hasTransition = transition;

	return this;

};

Gall.prototype.checkTranslate3d = function() {

	var hasTranslate3d = false,
		body = document.body,
		p_el = document.createElement('p'),
		has3d,
		transforms = {
            'transform':'transform'
        };

    body.insertBefore(p_el, null);

    for (var t in transforms) {

    	if (p_el.style[t] !== undefined) {

    		p_el.style[t] = 'translate3d(1px, 1px, 1px)';

    		if ('getComputedStyle' in window) {

	    		has3d = window.getComputedStyle(p_el).getPropertyValue(transforms[t]);

	    		hasTranslate3d = (has3d !== undefined && has3d.length > 0 && has3d !== "none");

    		}

    	}

    }

    body.removeChild(p_el);

	this._meta.hasTranslate3d = hasTranslate3d;

	return this;

};

Gall.prototype.checkDirection = function($target) {

	var direction_class = ($target.hasClass('next')) ? 'next' : 'prev';

	return direction_class;

};

Gall.prototype.checkTouch = function() {
		
	var touch = ('ontouchstart' in window) ? true : false;

	this._meta.hasTouch = touch;

	return this;

};

Gall.prototype.userTransitionEnd = function(e) {

	e.preventDefault();
	e.stopPropagation();

	var $element = $(e.currentTarget),
		_this = e.data._this,
		animating = false;
	
	_this._meta.animating = animating;
	
	_this.clearAnimate();

};

Gall.prototype.getOffsetThumb = function() {

	return parseInt(this._elements.$thumbsItem.css('marginRight'), 10);

};

Gall.prototype.clearAnimate = function() {

	var $root = this._elements.$root,
		 animate = this._classes_behavoir.animate;

	//clear animate class
	$root.find('.' + animate).removeClass(animate);

};

/* --- translate --- */

Gall.prototype.setPosition = function(index) {

	var width_item = this._meta.width_item,
		pos_start = null,
		offset = width_item*-1;

	//set offset
	if (typeof(index) !== 'undefined') {

		pos_start = index;

		offset = offset*index;

	} else {

		pos_start = this._meta.item_index;

		offset = offset*pos_start;

	}

	return { offset: offset, pos_start: pos_start };

};

Gall.prototype.setPositionThumb = function(index) {

	var offsetThumb = this.getOffsetThumb(),
		thumbs_width_item = this._meta.thumbs_width_item - offsetThumb,
		pos_start = null,
		offset = thumbs_width_item*-1;

	//set offset
	if (typeof(index) !== 'undefined') {

		pos_start = index;

		offset = offset*index;

	} else {

		pos_start = this._meta.thumb_item_index;

		offset = offset*pos_start;

	}

	return { offset: offset, pos_start: pos_start };

};

Gall.prototype.setPosListWrapper = function(index) {

	var $listWrapper = this._elements.$listWrapper,

		 animate = this._classes_behavoir.animate,

		 position_info = this.setPosition(index),

		 pos_start = position_info.pos_start,
		 offset = position_info.offset;

	//add animate
	if (typeof(index) !== 'undefined') $listWrapper.addClass(animate);

	//move to position
	this.moveElement($listWrapper, offset);

	//set global pos center
	this._meta.item_index = pos_start;
	
	//ROUTE
	this.setHash(index);
};

Gall.prototype.setPosThumbsWrapper = function(index) {

	var size_on_page = 5;

	this.selectThumbsItem(index);

	//fix count thumb < width thumbsBox
	if (this._meta.thumbs_list_length > size_on_page) {

		if (index > 1 && index < (this._meta.thumbs_list_length - 2)) this.setPosThumbsList(index - 2);

		if (index === 0) this.setPosThumbsList(index);

		if (index === 1) this.setPosThumbsList(index - 1);

		if (index === (this._meta.thumbs_list_length - 2)) this.setPosThumbsList(index - 3);

		if (index === (this._meta.thumbs_list_length - 1)) this.setPosThumbsList(index - 4);

	}

};

Gall.prototype.selectThumbsItem = function(index) {

	var $thumbsListBox = this._elements.$thumbsListBox,
		$thumbsItem = this._elements.$thumbsItem,
		 active_class = this._classes_behavoir.active_thumb_item;


	$thumbsListBox.find('.' + active_class).removeClass(active_class);

	$thumbsItem.eq(index).addClass(active_class);

};

Gall.prototype.setPosThumbsList = function(index) {

	var $thumbsListBox = this._elements.$thumbsListBox,

		 animate = this._classes_behavoir.animate,

		 position_info = this.setPositionThumb(index),

		 pos_start = position_info.pos_start,
		 offset = position_info.offset;

	//add animate
	if (typeof(index) !== 'undefined') $thumbsListBox.addClass(animate);

	//move to position
	this.moveElement($thumbsListBox, offset);

	//set global pos center
	this._meta.thumb_item_index = pos_start;

};

Gall.prototype.moveElement = function($element, offset) {

	var _this = this,
		hasTransition = _this._meta.hasTransition,
		hasTranslate3d = _this._meta.hasTranslate3d;

	if (!!hasTransition) {

		if(!!hasTranslate3d) {

			$element.css({'transform': 'translate3d(' + offset + 'px, 0, 0)'});

		} else {

			$element.css({'transform': 'translate(' + offset + 'px, 0)'});

		}

	} else {

		$element.animate({'left': offset + 'px'}, 300, function(){

			_this._meta.animating = false;
			
			_this.clearAnimate();

		});

	}

};

Gall.prototype.setThumbsItemOnClick = function(e) {

	e.preventDefault();
	e.stopPropagation();

	var _this = e.data._this,
		$curThumbsItem = $(e.currentTarget),
		 index = $curThumbsItem.index();
	
	_this.setPosThumbsWrapper(index);

	//after method set item_index = index
	_this.setPosListWrapper(index);

};

/*--- arrow --- */

Gall.prototype.translateOnClickArrow = function(e) {

	e.preventDefault();
	e.stopPropagation();

	var _this = e.data._this,
		$arrow = $(e.currentTarget),
		direction = _this.checkDirection($arrow),
		cur_index = _this._meta.item_index,
		determine_point = (_this._meta.list_length - 1),
		index = null;

	if (direction === 'next') {

		if (cur_index < determine_point) {

			index = +cur_index + 1;

		} else {

			index = cur_index;

		}
		

	} else {

		if (cur_index > 0) {

			index = +cur_index - 1;

		} else {

			index = cur_index;

		}

	}
	
	_this.setPosThumbsWrapper(index);

	//after method set item_index = index
	_this.setPosListWrapper(index);

};

Gall.prototype.translateThumbOnClickArrow = function(e) {

	e.preventDefault();
	e.stopPropagation();

	var _this = e.data._this,
		$arrowThumb = $(e.currentTarget),

		direction = _this.checkDirection($arrowThumb),

		thumbs_item_length = _this._meta.thumbs_list_length,
		size_on_page = 5,
		
		cur_index = _this._meta.thumb_item_index,
		index = null;

	if (direction === 'next') {

		if (cur_index < (thumbs_item_length - size_on_page - 1)) {

			index = cur_index + size_on_page - 3;

		} else {

			index = thumbs_item_length - 5;

		}
		

	} else {


		if (cur_index > size_on_page) {

			index = cur_index - size_on_page + 3;

		} else {
			index = 0;

		}

	}

	//fix count thumb < width thumbsBox
	if (thumbs_item_length > size_on_page) _this.setPosThumbsList(index);

};

/*************
 * DRAG LIST *
 *************/

/* --- instruments --- */

Gall.prototype.setDelta = function() {

	var pos_x = this._meta.touch_pos_x,
		pos_x_new = this._meta.touch_pos_x_new || 0,
		full_width = this._meta.width_item,
		min_delta = this._meta.width_item / 10,
		delta = pos_x_new - pos_x;

	if (Math.abs(delta) > min_delta) {

		if (!pos_x_new) delta = 0;

	} else {

		delta = 0;

	}	 

	return delta;

};

Gall.prototype.setCurIndex = function(index) {

	var delta = this.setDelta(),
		current_index = this._meta.item_index,
		determine_point = (this._meta.list_length - 1),
		index = null;

	if (delta < 0) {

		index = +current_index + 1;

		if (index > determine_point) index = determine_point;

	} else if (delta > 0) {

		index = +current_index - 1;

		if (index < 0) index = 0;

	} else {

		index = +current_index;

	}

	return index;

};

/* --- translate --- */

Gall.prototype.userMouseDown = function(e) {

	// if drag over <A>
	e.preventDefault();

	var _this = e.data._this,
		hasTouch = _this._meta.hasTouch,
		pos_x = (!!hasTouch) ? e.originalEvent.touches[0].pageX : e.originalEvent.pageX;

	_this._meta.touch_pos_x = pos_x;

	_this._meta.drag_start = true;

};

Gall.prototype.userMouseMove = function(e) {

	e.preventDefault();

	var _this = e.data._this,
		hasTouch = _this._meta.hasTouch,
		drag_start = _this._meta.drag_start,

		cur_index = _this._meta.item_index,
		width_item = _this._meta.width_item,

		pos_x = _this._meta.touch_pos_x,
		pos_x_new = (!!hasTouch) ? e.originalEvent.touches[0].pageX : e.originalEvent.pageX,
		pos_x_new = pos_x_new || 0,

		offset = ( (pos_x_new - pos_x) - cur_index*width_item );

	if (drag_start) {

		_this._meta.touch_pos_x_new = pos_x_new;

		_this.moveElement(_this._elements.$listWrapper, offset);

	}

};

Gall.prototype.userMouseUp = function(e) {

	e.preventDefault();

	var _this = e.data._this,
		index = _this.setCurIndex(),

		list_box_length = _this._meta.list_length;

	if (_this._meta.drag_start) {

		if (index >= 0 && index < list_box_length) {

			_this.setPosThumbsWrapper(index);
			_this.setPosListWrapper(index);

		}
		
		_this._meta.drag_start = false;

	}

};

/***********
 * ROUTING *
 ***********/
 
Gall.prototype.setHash = function(num_photo) {

	if (!!window.GallRoute) {
	
		GallRoute.setHash({
			option_id: this.ROOT_BUILDER._meta.option_id,
			gallery_id: this.ROOT_BUILDER._meta.gallery_id,
			num_photo: num_photo
		});
	
	}

	return this;

};

/**********
 * EVENTS *
 **********/

Gall.prototype.normalizeEvents = function() {

	var events = {},
		hasTouch = this._meta.hasTouch;

	events = {
		click: 'click',
		userdown: 'mousedown',
		usermove: 'mousemove',
		userup: 'mouseup',
		userout: 'mouseout'
	};

	if (!!hasTouch) {

		events.click = 'touchend';
		events.userdown = 'touchstart';
		events.usermove = 'touchmove';
		events.userup = 'touchend';
		events.userout = 'touchcancel';

	}

	this._meta.normalize_events = events;

	return this;

};

/* --- property --- */

Gall.prototype.checkProp = function() {

	this.checkTransition()
		.checkTranslate3d()
		.checkTouch()
		.normalizeEvents();
		
	return this;

};

/* --- elements --- */

Gall.prototype.setElements = function() {

	this.setRoot()
		.setListWrapper()
		.setListWrapperPicSource()
		.setListBox()
		.setListBoxInfo()
		.setListWrapperWidth()
		.setArrowElements()
		.setRepeatBox()
		.setTopBoxBtn()
		.setCloseBtn();

	if (!!this._classes_elements.thumb_wrapper) {

		this.setThumbsWrapperBox()
			.setThumbsListBox()
			.setThumbsItem()
			.setThumbsItemInfo()
			.setThumbsListBoxWidth()
			.setArrowThumbsElements();

	}
	
	return this;

};

/* --- arrow --- */

Gall.prototype.arrowInitEvents = function() {

	var $arrow = this._elements.$arrow,
		$arrowThumbs = this._elements.$arrowThumbs,
		 events = this._meta.normalize_events;

	$arrow.on(events.click, { _this: this }, this.translateOnClickArrow);

	if(!!$arrowThumbs) $arrowThumbs.on('click', { _this: this }, this.translateThumbOnClickArrow);

	return this;	

};

Gall.prototype.thumbsInitEvents = function() {

	var $thumbsItem = this._elements.$thumbsItem,
		 events = this._meta.normalize_events;

	$thumbsItem.on(events.click, { _this: this }, this.setThumbsItemOnClick);

	return this;

};

Gall.prototype.dragInitEvents = function() {

	var $listWrapperPicSource = this._elements.$listWrapperPicSource,
		 events = this._meta.normalize_events;

	$listWrapperPicSource.on(events.userdown, { _this: this }, this.userMouseDown);
	$listWrapperPicSource.on(events.usermove, { _this: this }, this.userMouseMove);
	$listWrapperPicSource.on(events.userup, { _this: this }, this.userMouseUp);
	$listWrapperPicSource.on(events.userout, { _this: this }, this.userMouseUp);

	return this;	

};

Gall.prototype.initTransitionEnd = function() {

	var $listWrapper = this._elements.$listWrapper,
		$thumbsListBox = this._elements.$thumbsListBox,
		 events = 'webkitTransitionEnd transitionend';

	$listWrapper.on(events, { _this: this }, this.userTransitionEnd);

	if(!!$thumbsListBox) $thumbsListBox.on(events, { _this: this }, this.userTransitionEnd);

	return this;

}

/* --- repeat gall --- */

Gall.prototype.userRepeatGall = function(e) {

	e.preventDefault();

	var _this = e.data._this,
		index = 0;

	_this.setPosThumbsWrapper(index);
	_this.setPosListWrapper(index);

};

Gall.prototype.repeatGallInit = function() {

	var $repeatBox = this._elements.$repeatBox,
		 events = this._meta.normalize_events;

	$repeatBox.on(events.click, { _this: this }, this.userRepeatGall);

	return this;

};

/* --- top gall --- */

Gall.prototype.openTopGallery = function(e) {

	e.preventDefault();
		
	var _this = e.data._this,
		$targetEl = $(e.currentTarget),
		 gallery_id = $targetEl.attr('data-gallery-id'),
		 
		$rootGallery = _this.ROOT_BUILDER._elements.$rootGallery,
		 setNoPrev = (_this.ROOT_BUILDER.custom_settings) && _this.ROOT_BUILDER.custom_settings.setNoPrev;
	
	if (setNoPrev) {
	
		$('#rgG1').remove();
		$rootGallery.remove();
	
	} else {
	
		window['gall_' + _this.ROOT_BUILDER._meta.option_id + '_' + _this.ROOT_BUILDER._meta.gallery_id]._gall_box = null;
		$rootGallery.remove();
	
	}
	
	_this.ROOT_BUILDER._elements.$scriptRoot.parent().append($('<div >', { 'id': 'rgG1' }));

	var top_gall = rgG(1, gallery_id, { 
		setNoPrev: true,
		withoutDummy: true,
		deleteOnClose: function() {
			
			$('#rgG1').remove();
			window['gall_' + gallery_id] = null;
			
		} 
	});

};

Gall.prototype.topBoxGallEvents = function() {

	var $topBoxBtn = this._elements.$topBoxBtn;
	
	$topBoxBtn.on('click', { _this: this }, this.openTopGallery);
	
	return this;

};

/* --- close gall --- */

Gall.prototype.userCloseGall = function(e) {

	e.preventDefault();
	
	var _this = e.data._this,
		$root = _this._elements.$root,
		$rootGallery = _this.ROOT_BUILDER._elements.$rootGallery,
		 hide_gall_class = _this._classes_behavoir.hide_gall
		 index = 0;	

	//hide Overlay
	if (!!_this.ROOT_BUILDER) { 

		_this.ROOT_BUILDER._elements.$rootGallery.addClass(_this.ROOT_BUILDER._classes_behavoir.gallery_loading);

		//setTimeout(function(){

			_this.ROOT_BUILDER.hideOverlay();

			$root.addClass(hide_gall_class);

		//}, 400);

	} else {

		$root.addClass(hide_gall_class);
		
	}

	setTimeout(function(){

		_this.setPosThumbsWrapper(index);

		//after method set item_index = index
		_this.setPosListWrapper(index);
		
		//remove root gallery
		$rootGallery.remove();
		
		//if deleteOnClose true		
		if (!!_this.ROOT_BUILDER._meta.custom_settings.deleteOnClose) _this.ROOT_BUILDER._meta.custom_settings.deleteOnClose();

	}, 500);

};

Gall.prototype.closeGallEvents = function() {

	var $closeBtn = this._elements.$closeBtn,
		$overlayEl = this.ROOT_BUILDER._elements.$overlayEl;

	$closeBtn.on('click', { _this: this }, this.userCloseGall);
	$overlayEl.on('click', { _this: this }, this.userCloseGall);

	return this;

};

Gall.prototype.initEvents = function() {
	
	this.initTransitionEnd()
		.thumbsInitEvents()
		.arrowInitEvents()
		.dragInitEvents()
		.repeatGallInit()
		.topBoxGallEvents()
		.closeGallEvents();
		
	return this;

};

/*
18.02.15
note:
- add routing
	+Gall.prototype.setHash
	+Gall.prototype.setPosListWrapper -> senHash method

*/