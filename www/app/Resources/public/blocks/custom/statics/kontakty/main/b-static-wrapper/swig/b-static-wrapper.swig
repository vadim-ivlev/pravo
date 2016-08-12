{[ macro.RGBi(blocks.address, parent) ]}
{% if data.menu %}

	{% for item in data.menu.list %}

		<div class="b-content-toggler">
			<div class="b-content-toggler__btn">
				<div class="b__name">{[ item.name | raw ]}</div>
			</div>

			{% if item.content %}

				<div class="b-feed b-content-toggler__ctx">
					<div class="b-feed__body">
						<div class="b-feed__list">

							{% for item in item.content %}
								<div class="b-feed__item">
									<div class="b-feed__title">{[ item.title | raw ]}</div>
									<div class="b-feed__text">{[ item.text | raw ]}</div>
								</div>
							{% endfor %}

						</div>
					</div>
				</div>

			{% endif %}

			{% if item.rubricator %}

				<div class="b-rubricator-wrapper b-content-toggler__ctx">

					<div class="b-content-toggler__wrapper">
					
						<div class="b-rubricator-menu group">
							<div class="b-rubricator-menu__list">
								{% for item in item.rubricator.rubrics %}
									<div class="b-rubricator-menu__item {[item.isActive]}" data-content-handler="{[ item.handler ]}">{[ item.title | raw ]}</div>
								{% endfor %}
							</div>
						</div>

						{% for item in item.rubricator.content %}

						<div class="b-feed b-content-handler__ctx {[ item.rubHandler ]} {[item.isActive]}">
							<div class="b-feed__body">
								<div class="b-feed__list">
									{% for item in item.content %}
										<div class="b-feed__item">
											<div class="b-feed__title">{[ item.title | raw ]}</div>
											<div class="b-feed__text">{[ item.text | raw ]}</div>
										</div>
									{% endfor %}
								</div>
							</div>
						</div>

						{% endfor %}

					</div>

				</div>

			{% endif %}

		</div>

	{% endfor %}

{% endif %}