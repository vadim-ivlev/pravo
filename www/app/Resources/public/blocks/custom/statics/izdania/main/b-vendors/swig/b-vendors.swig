<div class="b__row group">

	{% for item in data %}

		<div class="b__item group">
				
			<div class="b__media has-shadow">

				<a href=""><img class="b__img" src="{[ item.image ]}" alt="{[ item.title ]}" title="{[ item.title ]}"></a>

			</div>

			<div class="b__title">{[ item.title ]}</div>

			<div class="b__text">

				{% for text in item.text %}

					<p class="b-p">{[ text|raw ]}</p>

				{% endfor %}

			</div>

			{% if item.list %}

				<ul class="b-ul">

					{% for list in item.list %}

						<li class="b-ul__item">{[ list ]}</li>

					{% endfor %}

				</ul>

			{% endif %}

			<div class="b__wrapper">

				{% for link in item.link %}

						<a class="b-link b-link_blue b-link_inner has-{[ link.position ]}" href="{[ link.url ]}">{[ link.title ]}</a>

				{% endfor %}

			</div>

		</div>

	{% endfor %}

</div>