{% for row in data.row %}

	<div class="b-row" {% if row.dataAttrs %}{[ row.dataAttrs ]}{% endif %}>

		{% for content in row.content %}

			{% if content.head %}
				<h3>{[ content.head|raw ]}</h3>
			{% endif %}

			{% if content.toggle %}

				{% for toggle in content.toggle %}

					<div class="b-content-toggler b-content-toggler_nodecor">

						<h3 class="b-content-toggler__btn">{[ toggle.toggleBtn|raw ]}</h3>

						<div class="b-content-toggler__ctx">

							<div class="b-content-toggler__ctx-body">

							{% for text in toggle.toggleContent %}

								{% for item in text %}

									{% if item %}
										<p class="b-p">{[ item|raw ]}</p>
									{% endif %}

								{% endfor %}

							{% endfor %}

							</div>

						</div>

					</div>

				{% endfor %}

			{% endif %}

			{% if content.text %}
				<p class="b-p">{[ content.text|raw ]}</p>
			{% endif %}


		{% endfor %}

	</div>

{% endfor %}