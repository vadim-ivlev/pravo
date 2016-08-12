{% for social in data %}
	<a class="b-icon b-icon_type_social b-social__item b-social__item_{[ social.id ]}" title="{[ social.title ]}" target="_blank" href="{[ social.uri ]}"></a>
{% endfor %}