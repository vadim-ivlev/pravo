<div class="b-feed__body b-feed__body_height-auto">

	{% if data.blocks %}
	
		{% for blocks in data.blocks %}
	
			<h2 class="b__name">
				<a class="b-link b-link_blue" href="{[ blocks.link ]}">{[ blocks.title ]}</a>
			</h2>

			<div class="b-feed__list">
				<!--#include virtual="{[ blocks.includes ]}"-->
			</div>
		
		{% endfor %}
		
	{% endif %}
		
</div>