{% if mod == 'footer' %}<div id="vendorsRg">{% endif %}

	{% if mod == 'header' %}
		<div class="b-vendors__item b-vendors__item_our-issues"><a href="/izdania/" class="b-link">Наши издания</a></div>
	{% endif %}
	
	{% for vendor in data %}
		
		{% if vendor.showMenu %}
		<div class="b-vendors__item {% if mod == 'header' %}b-vendors__item_{[ vendor.id ]} {[ vendor.class ]}{% endif %}">
			<a class="b-link {% if mod == 'footer' %}b-vendors__icon b-vendors__icon_{[ vendor.id ]}{% endif %}" title="{[ vendor.title ]}" href="{[ vendor.uri ]}" >{% if mod == 'header' %}{[ vendor.name ]}{% endif %}</a>
		</div>
		{% endif %}
		
	{% endfor %}

	{% if mod == 'header' %}
		<div class="b-vendors__item b-vendors__item_more-btn">...</div>
	{% endif %}
	
{% if mod == 'footer' %}</div>{% endif %}