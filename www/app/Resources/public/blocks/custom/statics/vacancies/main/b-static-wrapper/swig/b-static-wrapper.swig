{% for block in data %}

	<div class="b-static-wrapper__info b__color_warning">

		<div class="b__title">{[ block.title ]}</div>

		<div class="b__subtitle">{[ block.subtitle ]}</div>

		<div class="b__text">
			{[ block.text ]}
		</div>

	</div>

	{% for row in block.row %}

	<!--div class="b-content-toggler">

		<div class="b-content-toggler__btn">

			<div class="b__name">{[ row.name ]}</div>

		</div>

		<div class="b-content-toggler__ctx">

			<div class="b-content-toggler__wrapper">

				<div class="b-ul">

					{% for item in row.item %}

					<div class="b-ul__title">{[ item.title ]}</div>

					<ul class="b-ul__list">

						{% for list in item.list %}

						<li class="b-ul__item">{[ list ]}</li>

						{% endfor %}

					</ul>

					{% endfor %}

				</div>

			</div>

		</div>

	</div-->

	{% endfor %}

{% endfor %}

{#
    Убрал по просьбе Оксаны

    {[ macro.RGBi(blocks.form) ]}

#}