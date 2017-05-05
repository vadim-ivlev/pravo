$(document).ready(function() {
/*if (window.location.search === '?dev=true') {
	$('.b-search').css('display', 'inline-block');
}*/
	function mobileMenuDisplay() {
		var menuMobileLink = $('#js-mobile-menu'),
			menuMobile = $('.b-menu-mobile');

		menuMobileLink.on('click tap', function(e) {
			menuMobile.toggle();
			e.stopPropagation();
		});

		$(document).on('click tap', function(e) {
			if (menuMobile.has(e.target).length === 0) {
				menuMobile.hide();
			}
		});
	}

	function searchBarDisplay() {
		var	searchIcon = $('#js-search-icon'),
			searchOverlay = $('#cboxOverlay'),
			searchBar = $('#js-search-bar');

		searchIcon.on('click', function(e) {
			/*searchOverlay.show().append(searchBar);
			searchBar.show();*/
			RG.events.publish('search.overlay.show');
			e.preventDefault();
			e.stopPropagation();
		});
		/*searchOverlay.on('click', function() {
			$(this).hide().remove(searchBar);
			searchBar.hide();
		});*/
	}
	
	mobileMenuDisplay();
	searchBarDisplay();

	/*$('#form').on('submit', function() {
		window.location.href = 
			"/search/?query=" + encodeURIComponent($(this).find("input[name=input_text]").val()) + 
			'&search=' + $(this).find("#select").val();
	});*/

});
