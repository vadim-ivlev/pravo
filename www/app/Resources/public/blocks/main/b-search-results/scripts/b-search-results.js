$(document).ready(function() {
	$('.js-search-form-results').on('submit', function(e) {
		window.location.href = 
		"/search/?query=" + encodeURIComponent($(this).find("input[name=input_text-results]").val()) + 
		'&search=' + $(this).find("select[name=input_select-results]").val();
		e.preventDefault();
		e.stopPropagation();
	});
});