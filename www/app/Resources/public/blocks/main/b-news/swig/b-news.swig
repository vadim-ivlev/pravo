{% if data.name %}
	<div class="b-news__name">{[ data.name ]}</div>
{% endif %}

{% if data.includes[0] %}
	<div class="b-news__body b-news-spiegel">

		<div class="b-news__list">
			<!--#include virtual="{[
				data.includes[0]
			]}"-->
		</div>
		
	</div>
{% endif %}

{% if data.includes[1] %}
	<div class="b-news__body">

		<div class="b-news__list">
			<!--#include virtual="{[
				data.includes[1]
			]}"-->
		</div>

	</div>
{% endif %}