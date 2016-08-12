<div class="b-top-news__body b-top-news__press" data-alias="{{ this_section__alias }}">

	{% if data.name %}
	<h2 class="b-top-news__name">
		<a href="{[data.link]}">{[ data.name ]}{{this_section__title}}</a>
	</h2>
	{% endif %}

	<div class="b-top-news__list">
		<!--#include virtual="{[
            data.includes[0]
        ]}"-->	
	</div>

</div>