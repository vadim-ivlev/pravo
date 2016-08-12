<div class="b-categories__body b-categories__body_blue">

    <div class="b-categories__list">
		
		{% for item in data.menu.main %}
			<div class="b-categories__item {{# title__for__{[item.alias]}}}is-active{{/ title__for__{[item.alias]}}}">
				<a class="b-link b-link_white b-categories__link {% if item.customClass %}{[item.customClass]}{% endif %}" href="{[item.uri]}">{[item.name]}</a>
			</div>
		{% endfor %}
		
    </div>

    <div class="b-categories__list">
        {% for item in data.menu.second %}
			<div class="b-categories__item {{# title__for__{[item.alias]}}}is-active{{/ title__for__{[item.alias]}}}">
				<a class="b-link b-link_white b-categories__link" href="{[item.uri]}">{[item.name]}</a>
			</div>
		{% endfor %}
    </div>
	
</div>