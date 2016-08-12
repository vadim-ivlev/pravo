<div class="b-gallery__body">
		<div class="b-gallery__fotorama b-gallery__linked_slide fotorama" data-click="false" data-arrows="true" data-nav="dots" data-loop="true" data-fit="cover" data-width="100%">
			{% for image in data.images %}
				<img class="b-gallery__image" src="/res/images/custom/projects/lada/jumbotron/{[ image.filename ]}.jpg" data-fit="cover">
			{% endfor %}
		</div>
</div>
