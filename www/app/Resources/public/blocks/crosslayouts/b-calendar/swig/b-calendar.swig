<div class="b-calendar__body">

    <h2 class="b-calendar__name b__name">
        {% if data.link %}<a class="b-link" href="{[ data.link ]}">{% endif %}
        {[ data.title ]}
        {% if data.link %}</a>{% endif %}
    </h2>

	<!--#include virtual="{{calendar_uri}}"-->
	
</div>