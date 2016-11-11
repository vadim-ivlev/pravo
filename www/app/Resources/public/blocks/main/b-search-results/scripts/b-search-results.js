$('.js-search-form').on('submit', function() {
console.log('111');
	window.location.href = 
	"/search/1/?query=" + encodeURIComponent($(this).find("input[name=input_text]").val()) + 
	'&search=' + $(this).find(".js-search-form-select").val();
});