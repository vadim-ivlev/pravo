/*******************
 * GALLERY BUILDER *
 *******************/

var GalleryBuilder = function(option_id, gallery_id, custom_settings) {

	this._id_elements = {
		script_element: '#rgG' + option_id,
		root_element: '#rgG_' + option_id + '_' + gallery_id,
		overlay_element: '#cboxOverlay'
	};

	this._classes_elements = {
		root_gall: 'rg-gallery',
		root_main_gall: 'rg-gall-root'
	};
	
	this._classes_behavoir = {
		overlay_show: 'rg-gallery-overlay_show',
		gallery_loading: 'rg-gall-root_loading'
	};
	
	this._elements = {};
	
	this._gallPrevSettings = {
		mainPhotoSrc: null,
		thumbsList: null,
		gall_id: gallery_id
	};
	
	this._gallMainSettings = {
		mainPhotoList: null,
		thumbsList: null,
		gall_id: gallery_id,
		gall_title: null,
		gall_desc: null
	};
	
	this._gallData = null;

	this._tmpl = {
		gall_prev: '/i/files/gallery_tmpl/gall_prev_default.html',
		gall_main: '/i/files/gallery_tmpl/gall_default.html'
	};

	this._meta = {
		use_cache_tmpl: false,
		
		gallery_offset_top: null,
		
		custom_settings: custom_settings || {},
		
		option_id: option_id,
		gallery_id: gallery_id,
		
		data_url: '//foto.rg.ru/project/photos/insert.php?option_id=' + option_id + '&photorep_id=' + gallery_id + '&callback=?'
	};
	
	return this;

};



/* --- Gallery settings --- */

GalleryBuilder.prototype.setPathToImage = function() {

	var host = '//cdnimg.rg.ru/i/gallery/',
		id_gallery = this._gallData.meta.photorep_id + '/',
		path_src_main_img = host + id_gallery,
		path_src_thumb_img = host + id_gallery + 'thumbs/';
	
	this._meta.path_src_main_img = path_src_main_img;
	this._meta.path_src_thumb_img = path_src_thumb_img;

	return this;

};

/* --- Template --- */

GalleryBuilder.prototype.setTmpl = function($element, tmpl, dataForTmpl) {

	return new Ractive({
			el: $element,
			template: tmpl,
			data: dataForTmpl
		});

};

/* --- Data --- */

GalleryBuilder.prototype.getGallData = function() {

	var _this = this,
		url = _this._meta.data_url,
		setNoPrev = (!!_this._meta.custom_settings) ? _this._meta.custom_settings.setNoPrev : false;
	
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		success: function(data) {
		
			_this._gallData = data;
			
			//set settings gallery
			_this.setPathToImage();
			
			//get template
			if (!setNoPrev) {
				
				_this.getTmplPrev();
				
			} else {
			
				_this.initOnlyMainGall();
			
			}
			
		}
	});
	
	return _this;

};

GalleryBuilder.prototype.getTmplPrev = function() {

	var _this = this,
		$scriptRoot = _this._elements.$scriptRoot,
		$root = $('<div />', { id: _this._id_elements.root_element.substring(1) }),
		 url_prev = _this._tmpl.gall_prev,
		 use_cache = _this._meta.use_cache_tmpl,
		 gallPrevTmpl = null,
		 prevSettings = {
			gall_id: _this._meta.gallery_id,
			
			gall_title: _this._gallData.meta.title,
			
			path_src_main_img: _this._meta.path_src_main_img,
			path_src_thumb_img: _this._meta.path_src_thumb_img,
			
			main_photo: _this._gallData.photos[_this._gallData.meta.main_photo_index],
			photos: [],
			
			_meta: { main_photo_index: _this._gallData.meta.main_photo_index }
		 };
		 
	//if (_this._gallData.meta.main_photo_index > _this._gallData.meta.preview_count) {
	
		prevSettings.photos = _this._gallData.photos.slice(0, _this._gallData.meta.preview_count);
	
	//} else {
	
		//prevSettings.photos = _this._gallData.photos.slice(0, _this._gallData.meta.preview_count + 1);
	
	//}
		 
	$scriptRoot.before($root);
	
	_this._elements.$root = $root;
	
	_this.initEvents();
	
	_this.checkRefferer();
	
	$.ajax({
		type: 'GET',
		url: url_prev,
		cache : use_cache,
		success: function(dataTmpl) {
		
			gallPrevTmpl = _this.setTmpl($root, dataTmpl, prevSettings);
			
			_this.removeDummyGall();
			
		}
	});

};

/* --- Get Main Gallery --- */

GalleryBuilder.prototype.initOnlyMainGall = function() {

	this.createMainGall();
	
	if(!!this._meta.custom_settings.showOverlay) this.showOverlay();

};

GalleryBuilder.prototype.initMainGallery = function() {

	var $root = this._elements.$root;
	
	$root.on('click', { _this: this }, this.openMainGall);

};

GalleryBuilder.prototype.goToSelectedPicture = function() {

	var gall_obj = this._gall_box,
		index = this._meta.user_photo_index;

	//open gall and translate to current click image
	gall_obj.setPosListWrapper(index);
	gall_obj.setPosThumbsWrapper(index);

};

GalleryBuilder.prototype.openMainGall = function(e) {

	if(!!e) e.preventDefault();
	
	var _this = (!!e) ? e.data._this : this,
		$root = _this._elements.$root,
		 gallBox = (!!_this._gall_box) ? _this._gall_box : null,
		 user_photo_index = (!!e) ? $(e.target).attr('data-index') : 0,
		$gallBoxRoot = (!!_this._gall_box) ? _this._gall_box._elements.$root : [],
		 hide_gall_class = null;

	_this.showOverlay();

	_this._meta.user_photo_index = user_photo_index;
		 
	//if (!gallBox) {

	_this.createMainGall();
	
	/*} else {
	
		hide_gall_class = _this._gall_box._classes_behavoir.hide_gall;
		
		$gallBoxRoot = _this._gall_box._elements.$root;

		//translate to selected picture
		_this.goToSelectedPicture();
	
		$gallBoxRoot.removeClass(hide_gall_class);
	
	}*/
	
	//send stat
	_this.sendStat();

	setTimeout(function(){

		_this._elements.$rootGallery.removeClass(_this._classes_behavoir.gallery_loading);

	}, 100);

};

GalleryBuilder.prototype.createMainGall = function() {

	var _this = this,
		$scriptRoot = _this._elements.$scriptRoot,
		$root = _this._elements.$root,
		 url_tmpl = _this._tmpl.gall_main,
		 use_cache = _this._meta.use_cache_tmpl,
		$rootGallery = $('<div/>', { id: 'gBox_' + _this._meta.option_id + '_' + _this._meta.gallery_id, 'class': _this._classes_elements.root_main_gall }),
		 //gallery_offset_top = _this._meta.gallery_offset_top || ($root.outerHeight(true) + 65)*-1,
		 gallery_loading_class = _this._classes_behavoir.gallery_loading,
		 mainTmpl = null,
		 mainSettings = {
			gall_id: _this._meta.gallery_id,
			option_id: _this._meta.option_id,
			gall_title: (!!_this._gallData) ? _this._gallData.meta.title : '',
			gall_desc: (!!_this._gallData) ? _this._gallData.meta.description : '',
			
			path_src_main_img: _this._meta.path_src_main_img,
			path_src_thumb_img: _this._meta.path_src_thumb_img,
			
			photos: (!!_this._gallData) ? _this._gallData.photos : [],
			linked_materials: [],

			top_gall: (!!_this._gallData.top) ? _this.prepareTopGallData(_this._gallData.top) : []

		 },
		 
		 _gall_box = null;

	//set RootGallery in main object
	_this._elements.$rootGallery = $rootGallery;

	//check position top
	//$rootGallery.css('top', gallery_offset_top + 'px');
	
	//append root main gallery
	$rootGallery.addClass(gallery_loading_class);
	//$root.after($rootGallery);
	$scriptRoot.after($rootGallery);
	
	$.ajax({
		type: 'GET',
		url: url_tmpl,
		cache : use_cache,
		success: function(dataTmpl) {
		
			mainTmpl = _this.setTmpl($rootGallery, dataTmpl, mainSettings);

			_gall_box = new Gall(_this._meta.gallery_id, _this).init();
			
			_this._gall_box = _gall_box;

			_this.goToSelectedPicture();

			//Init Ads
			_this.initAds();

			//Init linked materials
			_this.getLinkedMaterials(mainTmpl);

			$rootGallery.removeClass(gallery_loading_class);

			//Init yandex share
			$.getScript('/js/yandex.share.js');
			
		}
	});

};

/* --- linked materials --- */

GalleryBuilder.prototype.getLinkedMaterials = function(mainTmpl) {

	var linked_materials = [],
		materials = (!!this._gallData) ? this._gallData.referers : null,
		root_path = '//' + location.host + '/include/';

	if (!!materials) {

		$.each(materials.slice(0, 3), function(index, material){

			var  material_id = material.article_id;
			
			root_path += 'art-' + material_id + '/';
		
		});
		
		$.get(root_path, function(data){
		
			var $el = $('<div/>'),
				$materials = $el.html(data).find('.big_list_item');
			
			$materials.each(function(index, el){
			
				var $el = $(el),
					 material_title = $el.find('.subtitle').text(),
					 material_date = $el.find('.tak').text(),
					 material_url = $el.find('a').eq(0).attr('href'),
					 material_obj = {};
					 
				material_obj.title = $.trim(material_title);
				material_obj.date = material_date;
				material_obj.url = material_url;
					 
				linked_materials.push(material_obj);
			
			});
			
			mainTmpl.set('linked_materials', linked_materials);

		});
				 
	}

	return this;

};

GalleryBuilder.prototype.prepareTopGallData = function(topData) {

	var  result = [],
		 top_gallery_length = topData.length,
		 cur_gallery_id = this._meta.gallery_id,
		 top_gallery_id = null,
		 top_gallery_title = null,
		$buffer_text = $('<textarea />');

	$.each(topData, function(index, el){

		top_gallery_id = el.photorep_id;

		if (cur_gallery_id !== top_gallery_id) {

			top_gallery_title = el.title;

			el.title = $buffer_text.html($buffer_text.html(el.title).val()).val();

			result.push(el);

		}

	});

	if (top_gallery_length === result.length) result.pop();

	return result;

};

/* --- Overlay --- */

GalleryBuilder.prototype.showOverlay = function() {

	var $overlayEl = this._elements.$overlayEl,
		 overlay_show = this._classes_behavoir.overlay_show;
	
	$overlayEl.addClass(overlay_show);

	return this;

};

GalleryBuilder.prototype.hideOverlay = function() {

	var $overlayEl = this._elements.$overlayEl,
		 overlay_show = this._classes_behavoir.overlay_show;
	
	$overlayEl.removeClass(overlay_show);

	return this;

};

/* --- Ads --- */

GalleryBuilder.prototype.initAdvAdFox = function() {

	this.getAdvAdFoxUnit('adsB_240_1', '//ads.adfox.ru/5906/prepareCode?p1=sie&amp;p2=cqs&amp;pct=a&amp;pfc=a&amp;pfb=a')
		.getAdvAdFoxUnit('adsB_tgb_1', '//ads.adfox.ru/5906/prepareCode?p1=biwbq&amp;p2=csz&amp;pct=a&amp;pfc=a&amp;pfb=a')
		.getAdvAdFoxUnit('adsB_tgb_2', '//ads.adfox.ru/5906/prepareCode?p1=bjipi&amp;p2=csz&amp;pct=a&amp;pfc=a&amp;pfb=a')
		.getAdvAdFoxUnit('adsB_500_1', '//ads.adfox.ru/5906/prepareCode?p1=bkiij&amp;p2=esud&amp;pct=a&amp;pfc=a&amp;pfb=a');
				
	adfox_reloadBanner();

	return this;

};

GalleryBuilder.prototype.getAdvAdFoxUnit = function(bannerPlaceId, requestSrc) {

	var $rootGallery = this._elements.$rootGallery,
		$rootBanners = $rootGallery.find('#' + bannerPlaceId),
		tgNS = window.ADFOX.RELOAD_CODE,
		initData = tgNS.initBanner(bannerPlaceId, requestSrc);

	$rootBanners.html(initData.html);

	tgNS.loadBanner(initData.pr1, requestSrc, initData.sessionId);

	return this;

};

GalleryBuilder.prototype.initYaDirect = function() {

	var root_gallery_id = this._meta.option_id + '_' + this._meta.gallery_id;

	/*$.getScript('http://an.yandex.ru/system/context.js', function(){

		// Bottom in main block
		Ya.Direct.insertInto(29789, "yadirectHorizontal_" + root_gallery_id, {
			stat_id: 1,
			ad_format: "direct",
            type: "horizontal",
            limit: 2,
            favicon: true,

            font_size: .9,
            font_family: 'arial',
            border_type: 'block',
            header_bg_color: 'D7D7D7',
			border_color: 'D7D7D7',
			title_color: '990000',
			bg_color: 'ffffff',
			url_color: '006699',
			all_color: '000000',
			text_color: '000000',
			hover_color: 'FF0000'
		});

	});*/
	(function(w, d, n, s, t) {
    w[n] = w[n] || [];
    w[n].push(function() {
        Ya.Direct.insertInto(29789, "yadirectHorizontal_" + root_gallery_id, {
            stat_id: 1,
			ad_format: "direct",
            type: "posterHorizontal",
            limit: 2,
            favicon: true,

            font_size: .9,
            font_family: 'arial',
            border_type: 'block',
            header_bg_color: 'D7D7D7',
			border_color: 'D7D7D7',
			title_color: '990000',
			bg_color: 'ffffff',
			url_color: '006699',
			all_color: '000000',
			text_color: '000000',
			hover_color: '0066FF'
        });
    });
    t = d.getElementsByTagName("script")[0];
    s = d.createElement("script");
    s.src = "//an.yandex.ru/system/context.js";
    s.type = "text/javascript";
    s.async = true;
    t.parentNode.insertBefore(s, t);
	})(window, document, "yandex_context_callbacks");

	return this;

};

GalleryBuilder.prototype.initPartnersGorizontal = function() {

	var $partnersBox = $('#partnersGorizontal_' + this._meta.option_id + '_' + this._meta.gallery_id);
	
	$.get('/ssi/blocks/23_fotorepy.ssi')
		.done(function(data){
			$partnersBox.html(data);
		})
		.fail(function(data){
			console.error('initPartnersGorizontal error, ' + data);
		});

	return this;

};

GalleryBuilder.prototype.initPartnersVertical = function() {

	var $partnersBox = $('#partnersVertical_' + this._meta.option_id + '_' + this._meta.gallery_id);
	
	$.get('/ssi/blocks/25_fotorepy.ssi')
		.done(function(data){
			$partnersBox.html(data);
		})
		.fail(function(data){
			console.error('initPartnersVertical error, ' + data);
		});

	return this;

};

GalleryBuilder.prototype.initPartners = function() {

	this.initPartnersGorizontal()
		.initPartnersVertical();

	return this;

};

/* --- send stat --- */
GalleryBuilder.prototype.sendStat = function() {

	var url_gall = '//foto.rg.ru/photos/' + this._meta.gallery_id + '/index.html',
		url_article = location.href;
		
	//Google
	if (!!window.ga) ga('send', 'pageview', url_gall);

	//Yandex
	if (!!window.yaCounter22322746) yaCounter22322746.hit(url_gall, null, url_article);

	//Mail
	if (!!window._tmr) _tmr.push({id: "11659", url: url_gall, referrer: url_article, type: "pageView", start: (new Date()).getTime()});

	//Lifeinternet
	new Image().src = "//counter.yadro.ru/hit;RGSPORT?r"+
	escape(url_article)+((typeof(screen)=="undefined")?"":
	";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
	screen.colorDepth:screen.pixelDepth))+";u"+escape(url_gall)+
	";"+Math.random();

};

/* --- check refferer --- */
GalleryBuilder.prototype.checkRefferer = function() {

//http://foto.rg.ru/project/photos/add_ref.php?url='//rg.ru/ARTICLE_HREF'&photorep_id='ID'&aticle_id='ID'

	var gallery_id = this._meta.gallery_id,
		option_id = this._meta.option_id,
		article_id = $('meta[property="article:id"]').attr('content'),
		refferers = (!!this._gallData) ? this._gallData.referers : [],
		link_path = '//foto.rg.ru/project/photos/add_ref.php',
		link_url = '?url=//' + location.host + location.pathname,
		link_gall_id = '&photorep_id=' + gallery_id,
		link_article_id = '&article_id=' + article_id,
		link_option_id = '&option_id=' + option_id,
		result_link = '',
		send_to_refferer = true;
		
	if (article_id != 823780) {
		
		$.each(refferers, function(index, el){
		
			var ref_article_id = el.article_id;
			
			if (ref_article_id == article_id) {
			
				send_to_refferer = false;
			
			}
		
		});
		
		if (send_to_refferer) {
		
			result_link = link_path + link_url + link_gall_id + link_article_id + link_option_id + '&callback=?';
			
			/*$.ajax({
				type: 'GET',
				url: result_link,
				success: function(data){ console.log(data) }
			});*/
			
			$.getJSON(result_link, function(data){ console.log(data) });
			
			console.log('send to refferer');
			console.log(result_link);
		
		}
	
	} else {
	
		console.log('test page');
	
	}

};

/* --- scroll to gallery --- */
/*GalleryBuilder.prototype.scrollToGallery = function() {

	var $page = $(window),	
		 sctoll_y = this._elements.$root.offset().top;

	$page.scrollTop(sctoll_y);

};*/

/* --- set dummy --- */

GalleryBuilder.prototype.setDummyGall = function() {

	if (!this._meta.custom_settings.withoutDummy) {
	
		var $scriptRoot = this._elements.$scriptRoot,
			$dummy = $('<div />', { 'id': 'dummyBox_' + this._meta.option_id + '_' + this._meta.gallery_id, 'class': 'gall_dummy-b' });
		
		$scriptRoot.before($dummy);
		
		this._elements.$dummy = $dummy;
	
	}
	
	return this;

};

GalleryBuilder.prototype.removeDummyGall = function() {

	var $dummy = this._elements.$dummy;
	
	$dummy.remove();
	//$dummy.hide();
	
	return this;

};

/* --- Events --- */

GalleryBuilder.prototype.setElements = function() {

	this.setScriptRoot()
		//.setRoot()
		.setOverlayEl();
	
	return this;

};

GalleryBuilder.prototype.initEvents = function() {
	
	this.initMainGallery();
	
	return this;

};

GalleryBuilder.prototype.initAds = function() {
	
	this.initAdvAdFox()
		.initYaDirect()
		.initPartners();
	
	return this;

};

GalleryBuilder.prototype.buildGall = function() {
	
	this.setDummyGall()
		.getGallData();
	
	return this;
	
};

/* --- Init --- */

GalleryBuilder.prototype.init = function() {

	this.setElements()
		.buildGall();
		
	// after create root container this.initEvents

	return this;

};

/* --- Elements --- */

GalleryBuilder.prototype.setRoot = function() {

	var $root = $(this._id_elements.root_element);

	this._elements.$root = $root;
	
	return this;

};

GalleryBuilder.prototype.setScriptRoot = function() {

	var $scriptRoot = $(this._id_elements.script_element);

	this._elements.$scriptRoot = $scriptRoot;
	
	return this;

};

GalleryBuilder.prototype.setOverlayEl = function() {

	var $overlayEl = $(this._id_elements.overlay_element);
	
	this._elements.$overlayEl = $overlayEl;
	
	return this;

};

/**************
 * Gall BUILD *
 **************/
 
var rgG = function(option_id, gallery_id, custom_settings) {

	var gall = 'gall_';
	
	//on Dom Ready	
	$(function() {

		window[gall + option_id + '_' + gallery_id] = new GalleryBuilder(option_id, gallery_id, custom_settings).init();
	
	});

};