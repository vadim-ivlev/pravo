$(document).ready(function() {
	$('#js-mobile-menu').on('click tap', function(e) {
		$('.b-menu-mobile').toggle();
		e.stopPropagation();
	});
	$(document).on('click tap', function(e) {
		if ($('.b-menu-mobile').has(e.target).length === 0) {
			$('.b-menu-mobile').hide();
		}
	});
});