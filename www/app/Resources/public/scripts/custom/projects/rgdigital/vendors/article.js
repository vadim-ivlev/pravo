clientHeight = function (){ // Высота окна просмотра
	return document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
}
/*
counter_articles = function(dest){
	// статистика по блокам
	source = window.location.hash;
	
	if (source != '') {		

		arr_source = source.split('=');
		id_box = arr_source[1];
		//if ($('#cbox_' + id_box).length) {	 // !!!
			if (source.indexOf('cbox=') + 1) {
				to_send = source +'&dest=' + dest;
				//$.getJSON( "http://spiritual-hour-398.appspot.com/counter/?callback=?", { counter: to_send } );
				////$.getJSON( "http://outer.rg.ru/plain/blocks_stat/?callback=?", { counter: to_send } );
				window.location.hash = '';
			}
		//}
	}
}

// Статистика по просмотрам
compareObjects = function (a, b) {
  if (a.offset_top > b.offset_top) return 1;
  if (a.offset_top < b.offset_top) return -1;
  return 0;
};

each_in_box = function(box){
	var b = {}; // box с article id
	var c = {};
	b_index = box.attr('data-box');
	
	// пробегаемся внутри блока по ссылкам с классом view_link
		box.find('.view_link').each(function(index, element) {
		this_link = $(this);
		c[index] = this_link.parents(".counter_item").attr('data-id');
	});
	
	b[b_index] = c;
	send_stats(b);
}

check_scroll = function(d, x){
	$(window).scroll(function() {
		if ($(this).scrollTop() > d[x]) {
			this_box = $('.count_i_' + x);
			this_box.removeClass('count_i_hide');
			each_in_box(this_box);
			
			x++
		}
	});
}

send_stats = function(b){
	if (!$.isEmptyObject(b)) {
		//$.getJSON( "http://spiritual-hour-398.appspot.com/counter/view.php?callback=?", { view: b });
		////$.getJSON( "http://outer.rg.ru/plain/blocks_stat/view.php?callback=?", { view: b });
		//console.log(b);
	}
}

view_box = function(o){
	var o = {}; // отступ top
	var oHide = {}	
	var sh = clientHeight();
	var x = 0;
	
	// пробегаемся по всем блокам counter_box на странице
	$('.counter_box').each(function(index, element) {
		o[index] = $(this);
	});
	
	for (var i in o) {
		o_top = o[i].offset().top - sh;
		if (o_top <= 0) {
			each_in_box(o[i]);
		} else {
			o[i].addClass('count_i_hide').addClass('count_i_' + x);
			oHide[x] = o_top;
			x++;
		}
	}
	
	
	check_scroll(oHide, 0);
	

	//console.log(oHide);
}
 // cтатистика по просмотрам
*/


add_href_photo_article = function(){
    if ($("#comments_hidden").attr('oid').length == 0) return;

    $('.tile a, .kolb a, .zakladki1 .text-photo-x table a').each(function() {
        var this_link = $(this);

        var regexp = /#a_[0-9]+$/;
        if (regexp.test(this_link.attr('href'))) {
            return;
        }

        this_link.attr('href', this_link.attr('href') +'#a_'+ $("#comments_hidden").attr('oid'));
    });
}

/* новость на карте */
map_address = function(addr){	

    var zoom = /[Мм]осква/.test(addr) ? zoom = '0.016457' : zoom = '0.216457';
	
	var jsonData = $.getJSON('https://geocode-maps.yandex.ru/1.x/?geocode=' + encodeURIComponent(addr) + '&results=1&format=json', function(data){
			  
		var coords = $.parseJSON(jsonData.responseText).response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' '),
		resultSrc = 'https://static-maps.yandex.ru/1.x/?ll=' + coords[0] + ',' + coords[1] + '&spn=' + zoom + ',0.00619&pt=' + coords[0] + ',' + coords[1] + ',pm2blm&l=map&size=600,335',
		$mapsPoint = $('#mapsPoint');
				
		$mapsPoint.attr('src', resultSrc);
			
	});
}
/* / новость на карте */

/*HAS ZERO для facebook social
var replaceImg = function (replaceClass) {
  var $replaceBox = $(replaceClass),
      $imgReplaseBox = $replaceBox.find('img'),
	   imgReplaseBox_SRC = $replaceBox.attr('data-src');
	
  $imgReplaseBox.attr('src', imgReplaseBox_SRC);	
  $replaceBox.removeClass('has_zero');
};

$(document).ready(function(){
	// скрываем сюжеты если они пустые
	if ($('#sujet_box strong').size() == 0) {
		$('#sujet_box').hide();
	}
	
	//заменяем большую картинку в блоке читайте еще
	replaceImg('.has_zero');
});*/

/* GA in link LEAD article 12.09.2014*/
$(function(){

	$('.main-text .lead a').on('click', function(e){

		ga('send', 'event', 'Переход по ссылке', 'Лид в материалах', {'nonInteraction': 1});

	});

    $('#rgHeaderBox .nav-second-b__layer__unit__link[href="/gazeta/svezh.html"]').on('click', function(e){

        ga('send', 'event', 'Переход по ссылке', 'Свежий номер из материалов');

    });

});

/* send ga incuts info after load page 28.10.2014 */
$(function(){

	var incuts_checker = {
	
			incuts_classes: 'insert-materials',
			
			incuts_type_classes: {
				gorizont: 'insert-materials-g',
				small_image: 'insert-materials-r-small',
				large_image: 'insert-materials-r-large'
			},
			
			incuts_pull: null,
			
			ga_events: {
				title: {
					viewed_page: 'Врезки. Просмотр страницы'
				}
			},
			
			//metods
			
			$getIncuts: function(incuts_classes) {
				
				var $incuts = $('.' + incuts_classes).eq(0);
				
				if (!$incuts.length) $incuts = null;
				
				return $incuts;
				
			},
			
			setPullIncuts: function() {
			
				var  incuts_pull = [],
					 incuts_type_classes = this.incuts_type_classes,
					 incut_type_class = null,
					$incuts = null;
					
				for(incut_type_class in incuts_type_classes) {
				
					incut_type_class = incuts_type_classes[incut_type_class];
					
					$incuts = this.$getIncuts(incut_type_class);
					
					if (!!$incuts) incuts_pull.push($incuts);
				
				}
				
				this.incuts_pull = incuts_pull;
			
			},
			
			sendGaEvent: function() {
			
				var $incuts = null,
					 incuts_type = null,
					 incuts_pull = this.incuts_pull,
					 incuts_length = incuts_pull.length,
					 iterator = 0,
					 status = null,
					 events_title = this.ga_events.title.viewed_page;
					
				if (!!incuts_length) {
				
					for(; iterator < incuts_length; iterator++) {
					
						$incuts = incuts_pull[iterator];
						
						incuts_type = $incuts.attr('data-type');
						 
						ga('send', 'event', events_title, incuts_type, {'nonInteraction': 1});
						//console.log('ga("send", "event", ' + events_title + ', ' + incuts_type + ');');
					
					}
					
					status = 'sended';
				
				} else {
				
					status = 'pull is null';
				
				}

				return status;
			
			},
			
			init: function() {
				
				this.setPullIncuts();
				
				this.sendGaEvent();
				
			}
		
	};
	
	incuts_checker.init();

});

/* --- Add info in image incut on artice --- */

$(function() {

	var image_info = {
		
		setInfo: function() {
		
			var $images = $('.main-text img[data-title]');
			
			if (!!$images.length) {
			
				$images.each(function(index, image){
				
					var $image_wrapper = $('<div />').addClass('article-img'),
						$image = $(image),
						$image_box = $('<div />'),
						$info_box = $('<div />'),
						 title = $image.attr('data-title') || '',
						 source = $image.attr('data-source') || '',
						 align = $image.attr('align'),
						 image_width = $image.width();
						 
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
							title + '<b> Фото: ' + source + '</b>' +
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

});


/*added by Dima 30.07.2015*/

$(function(){

	$(".b-reveal-answer-show").click(function(){

		$(this).hide();

	});
}); 