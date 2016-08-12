<div class="b-gallery__body">
    
	<div class="b-gallery__name">ГАЛЕРЕЯ</div>

    <div class="b-gallery__fotorama fotorama b-gallery__linked_slide" data-thumbmargin="4" data-width="100%" data-nav="thumbs" data-arrows="true" data-loop="true">
    	{% for image in data.images %}
			<a class="b-gallery__link" href="/res/images/custom/projects/zilart/gallery/{[ image.filename ]}.jpg" data-fit="contain" data-thumbfit="cover">
				<img class="b-gallery__image" src="/res/images/custom/projects/zilart/gallery/thumbs/{[ image.filename ]}.jpg">
			</a>
		{% endfor %}
	</div>

</div>
