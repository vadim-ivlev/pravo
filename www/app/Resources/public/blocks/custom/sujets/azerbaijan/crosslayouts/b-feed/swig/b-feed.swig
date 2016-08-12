<div class="b-feed__body">
	{% for blocks in data.blocks %}

		<h2 class="b-feed__name">
			{[ blocks.title ]}
		</h2>
		
		<div class="b-feed__list _hide_date">
			{% for item in blocks.list %}
				<div class="b-feed__item">{[ item.text | raw ]}</div>
			{% endfor %}
		</div>

	{% endfor %}
</div>