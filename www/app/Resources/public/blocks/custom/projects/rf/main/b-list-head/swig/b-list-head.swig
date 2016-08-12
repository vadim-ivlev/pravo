<div class="b-list-head__body">
	<div class="b-list-head__row">
		<h1 class="b-list-head__title">
			{{title}}
		</h1>
	</div>

	{% if data.related %}
	<div class="b-list-head__row">
		<div class="b-list-head__related">	
			{% for item in data.related %}
			<a href="{[item.uri]}" class="b-link b-link_blue b-list-head__name_related">{[item.title]}</a>
			{% endfor %}
		</div>
	</div>
	{% endif %}
</div>