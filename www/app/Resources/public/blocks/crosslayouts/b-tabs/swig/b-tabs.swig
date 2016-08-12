<div class="b-tabs__body b-tabs__body_static">
	{% for tab in data.tabs %}
    <a href="{[ tab.uri ]}" class="b-link b-link_blue b-tabs__link b-tabs__item {[ tab.mustache ]}">{[ tab.name ]}</a>
    {% endfor %}
</div>