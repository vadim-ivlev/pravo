var init = () => { 

	$('.b-gallery__linked_slide .fotorama__stage__frame').on('click', function(){
		window.open(
			'http://zilart.ru/?utm_source=rg.ru&utm_medium=statica&utm_campaign=mar_16&utm_term=msk&utm_content=slider_zilart', 
			'_blank'
		); 
	});

};


module.exports = {
    init
};