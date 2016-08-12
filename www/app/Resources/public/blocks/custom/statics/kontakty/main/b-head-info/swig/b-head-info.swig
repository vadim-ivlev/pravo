{% if data.person %}

	{% for item in data.person %}

	<div class="b-person">
		<div class="b-person__body">
			<div class="b-person__media">
				<img src="{[ item.media ]}" class="b-person__img">
			</div>
			<div class="b-person__info">
				<div class="b-person__title">{[ item.title ]}</div>
				<div class="b-person__description">{[ item.description | raw ]}</div>
			</div>
		</div>
	</div>

	{% endfor %}

{% endif %}