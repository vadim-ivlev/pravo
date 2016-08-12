{% for row in data.row %}

	<div class="b-row {% if row.behavoirClass %}{[ row.behavoirClass ]}{% endif %}">

	{% for content in row.content %}

		<p class="b-p">{[ content.text|raw ]}</p>

		{% if content.ul %}

			<div class="b-ul">

				<ul class="b-ul__list">

				{% for item in content.ul %}

					<li class="b-ul__item">{[ item|raw ]}</li>

				{% endfor %}

				</ul>

			</div>

		{% endif %}

	{% endfor %}

	</div>

{% endfor %}