$(function() {

	var currentRubric = $('#js-breadcrumbs-item').text();

	$.each($("#js-categories-list").children("div"), function(key, value) {

		var rubricTitle = ($(value).find('.b-categories__link')).text();

		if (currentRubric !== undefined && rubricTitle == currentRubric) {

			$(value).addClass('b-categories__item_active');

		} 

	});
	
});