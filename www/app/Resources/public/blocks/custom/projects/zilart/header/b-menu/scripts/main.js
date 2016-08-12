var init = () => { 

	var $elem = $('.b-menu__nav-icon');

	$elem.on('click', function(){ 
		if ($elem.hasClass('active'))
			$elem.removeClass('active');
		else
			$elem.addClass('active');
	});

	$(document).on('click', function (event) {
	    if (!$elem.is(event.target) && $elem.has(event.target).length === 0){
	        $elem.removeClass('active');
	    }
	});

};


module.exports = {
    init
};