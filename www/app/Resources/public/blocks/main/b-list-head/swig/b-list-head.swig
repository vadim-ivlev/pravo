<div class="b-list-head__body">
	{% for row in data %}
	<div class="b-list-head__row">
		<h1 class="b-list-head__title">
			
			{% if row.title %}

				{% for item in row.title %}
					{% if item.uri %}
						<a class="b-list-head__title-item {% if item.behavoirClass %}{[ item.behavoirClass ]}{% endif %}" href="{[ item.uri ]}" {% if item.dataAttrs %}{[ item.dataAttrs | raw ]}{% endif %}>{[ item.name ]}</a>
					{% else %}
						<span class="b-list-head__title-item {% if item.behavoirClass %}{[ item.behavoirClass ]}{% endif %}" {% if item.dataAttrs %}{[ item.dataAttrs | raw ]}{% endif %}>{[ item.name ]}</span>
					{% endif %}
				{% endfor %}

			{% else %}

				Установите заголовок страницы

			{% endif %}
			
		</h1>

		{% if row.subtitle %}
			{% for item in row.subtitle %}
				<h2 class="b-list-head__subtitle">{[ item.name ]}</h2>
			{% endfor %}
		{% endif %}
		
	</div>
	
	{% if row.tags %}
		{% for tag in row.tags %}
			{[ macro.RGBi(tag) ]}
		{% endfor %}
	{% endif %}
	
	{% if blocks.headInfo %}
		{[ macro.RGBi(blocks.headInfo, parent) ]}
	{% endif %}

	{% endfor %}
</div>