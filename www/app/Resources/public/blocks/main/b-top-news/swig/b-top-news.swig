<div class="b-top-news__body">

	{% if data.name %}
	<h2 class="b-top-news__name">
		{[ data.name ]}
	</h2>
	{% endif %}

	{% if data.title %}
	<h2 class="b-top-news__title">
		{[ data.title ]}
	</h2>
	{% endif %}

	<div class="b-top-news__list">

		<div class="liveReload" data-request="jsonp" data-iterator="." data-json="{[ data.json ]}" data-delay="0" data-reload="false" data-tmpl="{[ data.tmpl ]}"></div>
	
	</div>

</div>