<h3 class="b-news-rubric__title">
	{% if data.title.uri %}<a href="{[ data.title.uri ]}" class="b-link b-link_blue">{% endif %}
	{[ data.title.name ]}
	{% if data.title.uri %}</a>{% endif %}
<!--<span class="b-icon b-news-rubric__title-icon"></span>--></h3>

<div class="b-news-rubric__content">

	<!--#include virtual="/include/tmpl-b-news-rubric-spiegel/has-xlarge-image/obj-article/{[ data.include.type ]}-{[ data.include.uri ]}/is-spiegel/num-1/"-->
	
	<div class="b-news-rubric__list">
		<!--#include virtual="/include/tmpl-b-news-rubric/has-large-image/obj-article/{[ data.include.type ]}-{[ data.include.uri ]}/is-spiegel/num-4/offset-1/"-->
	</div>
	
	{% if data.ads %}
		{[ macro.RGBi(blocks[data.ads], parent) ]}
	{% endif %}
	
</div>