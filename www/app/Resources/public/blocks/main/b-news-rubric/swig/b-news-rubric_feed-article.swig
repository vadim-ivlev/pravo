<h3 class="b-news-rubric__title">
	{% if data.title.uri %}<a href="{[ data.title.uri ]}" class="b-link b-link_blue">{% endif %}
	{[ data.title.name ]}
	{% if data.title.uri %}</a>{% endif %}
</h3>

<div class="b-news-rubric__content">
	
	<div class="b-news-rubric__list">
		<!--#include virtual="{[ data.include ]}"-->
	</div>
	
</div>