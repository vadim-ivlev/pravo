$(window).load(function() {

	$("a[rel=example_group]").fancybox({
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'titlePosition'		: 'inside',
		'overlayColor' : '#000',
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
		return '<span id="fancybox-title-over">'+ (title.length ? '' + title : '') + '</span>';
				}
	});

	$("a[rel=infograf]").fancybox({
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'titlePosition'		: 'outside',
		'width'				: '95%',
		'height'			: '95%',
		'overlayColor' : '#000',
		'titleFormat'		: function(title, currentArray, currentIndex, currentOpts) {
		return '<span id="fancybox-title-over">'+ (title.length ? '' + title : '') + '</span>';
			}
	});	

	$(".iframe").fancybox({
		'width'				: '99%',
		'height'			: '99%',
		'autoScale'     	: false,
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'type'				: 'iframe',
		'overlayColor' : '#000'
	});	

	$("a[rel=inlinegroup]").fancybox({
		'titlePosition'		: 'outside',
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'overlayColor' : '#000',
		'type' : 'inline'
	});	

	$(".modal").fancybox({
		'titlePosition'		: 'outside',
		'transitionIn'		: 'elastic',
		'transitionOut'		: 'elastic',
		'autoScale'     	: true,
		'overlayColor' : '#000',
		'type' : 'inline'
	});

	/* add Alex 29.06.2015 */

	$("a[rel=big_infograph]").fancybox({
		'width' : '98%',
		'autoScale' : false,
		'overlayColor' : '#000',
		'titlePosition'	: 'inside',
		'titleFormat' : function(title, currentArray, currentIndex, currentOpts) {
			return '<span id="fancybox-title-over">'+ (title.length ? '' + title : '') + '</span>';
		}
	});

});