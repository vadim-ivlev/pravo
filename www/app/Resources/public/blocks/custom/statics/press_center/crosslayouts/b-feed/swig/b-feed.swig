<div class="b-feed__body b-feed__body_height-auto">
    <h2 class="b-feed__name">
    	{% if data.link %}<a class="b-link" href="{[ data.link ]}">{% endif %}
    	{[ data.title ]}
    	{% if data.link %}</a>{% endif %}
    </h2>

    <div class="b-feed__list">
		<!--#include virtual="{[
    		data.includes[0]
		]}"-->
    </div>

</div>