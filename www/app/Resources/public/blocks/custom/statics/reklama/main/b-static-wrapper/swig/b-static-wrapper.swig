

	<div class="b-rubricator-menu group">

		<div class="b-rubricator-menu__list">

			{% for tabs in data.tabs %}

			<div data-mod="{[ tabs.mod ]}" class="b-rubricator-menu__item is-tab {% if loop.first %}b-rubricator-menu__item_active{% endif %}">{[ tabs.title ]}</div>

			{% endfor %}

		</div>

	</div>

<div data-mod="is-page-all" class="b__wrapper is-card is-page-reveal">

	<div class="b__wrapper group is-main-text">
		<div class="b__col">

			{% for item in data.section.main.text.item %}

				<div class="b__text">{[ item|raw ]}</div>

			{% endfor %}
		</div>
		<div class="b__col">

			{% for docs in data.section.main.docs %}

				<div class="b-downloads">
					<div class="b-downloads__link b-file-icon b-file-icon-{[ docs.type ]}">
						<a class="b-link b-link_inner b-link_blue" href="{[ docs.url ]}">{[ docs.title ]}</a>
					</div>
					<div class="b-downloads__meta">{[ docs.size ]}</div>
				</div>

			{% endfor %}

		</div>
	</div>

	<div class="b__wrapper">

		{% for item in data.section.main.item %}

			<div class="b-card group">
				<div class="b-card__media">
					<a href="" class="b-link"><img src="{[ item.img ]}" alt="{[ item.title ]}" class="b-card__img has-shadow"></a>
				</div>
				<div class="b-card__content">
					<div class="b__title b-card__title">
						<a href="" class="b-link">{[ item.title ]}</a>
					</div>
					<div class="b-card__meta group">
						<div class="b-ul">
							<ul class="b-ul__list">

								{% for list in item.list %}

									<li class="b-ul__item">
										{[ list ]}
									</li>

								{% endfor %}

							</ul>
						</div>
					</div>
				</div>
			</div>

		{% endfor %}

	</div>



</div>

{% for item in data.section.item %}

	<div data-mod="{[ item.mod ]}" class="b__wrapper group is-page is-page-reveal {% if item.mod %}{[ item.mod ]}{% endif %}">

		<div class="b__row group is-page-main">
			<div class="b__col group col-is-title">
				<div class="b__row group">
					<div class="b__col">
						<div class="b__title">

							{[ item.title ]}

						</div>
						<div class="b__subtitle">

							{[ item.subTitle|raw ]}

						</div>
					</div>
					<div class="b__col">

						{% for download in item.download %}

							<div class="b-downloads">
								<div class="b-downloads__link b-file-icon b-file-icon-{[ download.type ]}">
									<a class="b-link b-link_inner b-link_blue" href="{[ download.url ]}">{[ download.title ]}</a>
								</div>
								<div class="b-downloads__meta">{[ download.size ]}</div>
							</div>

						{% endfor %}

					</div>

				</div>
			</div>

			<div class="b__col group col-is-main">
				<div class="b__row group">
					<div class="b__media">
						<img src="{[ item.img ]}" alt="{[ item.title ]}" class="b__img">
					</div>
				</div>
				<div class="b__row">

					{% for subContent in item.subContent %}

						<p class="b__text">

							{[ subContent|raw ]}

						</p>

					{% endfor %}

				</div>
			</div>

			<div class="b__col group col-is-content">
				<div class="b__row is-content">

					{% for content in item.content %}

						<div class="b__col">
							{% for text in content.text %}

								<p class="b__text">{[ text|raw ]}</p>

							{% endfor %}

							{% if content.list %}

								<div class="b-ul">

									{% for list in content.list %}

										<ul class="b-ul__list">

											{% for content in list.content %}

												<li class="b-ul__item {% if content.flag %}flag-{[ content.flag ]}{% endif %}">{[ content.text|raw ]}<span>{[ content.meta ]}</span></li>

											{% endfor %}

										</ul>

									{% endfor %}
								</div>

							{% endif %}

							{% if content.download %}

								{% for download in content.download %}

									<div class="b-downloads">
										<div class="b-downloads__link b-file-icon b-file-icon-{[ download.type ]}">
											<a class="b-link b-link_inner b-link_blue" href="{[ download.url ]}">{[ download.title ]}</a>
										</div>
										<div class="b-downloads__meta">{[ download.size ]}</div>
									</div>

								{% endfor %}

							{% endif %}

						</div>

					{% endfor %}

				</div>
			</div>
		</div>

		{% if item.extraContent %}

			<div class="b__row is-page-side">
				<div class="b__wrapper is-extra-content group">
					<div class="b__title">
						{[ item.extraContent.title ]}
					</div>
					<div class="b__row">
						{%  for col in item.extraContent.col %}
							<div class="b__col">
								{% for item in col.item %}

									{% for text in item.text %}

										<div class="b__text">
											{[ text|raw ]}
										</div>

									{% endfor %}

									<div class="b-ul">
										<ul class="b-ul__list">

											{% for list in item.list %}

												<li class="b-ul__item">{[ list|raw ]}</li>

											{% endfor %}

										</ul>
									</div>

								{% endfor %}
							</div>
						{% endfor %}
					</div>
				</div>
			</div>

		{% endif %}

	</div>

{% endfor %}

<div class="js-contact b__wrapper is-contact">
	<div class="b__title">{[ data.contacts.title ]}</div>

	<div class="b__row is-contact-general group">

		{% for general in data.contacts.item.general %}

				<div class="b__col">

					{% if general.genPhone %}

						{% for genPhone in general.genPhone %}

							<h2 class="b__title">{[ genPhone ]}</h2>

						{% endfor %}

					{% endif %}

					{% if general.name %}

						<div class="b__title">{[ general.name ]}</div>

					{% endif %}

					<div class="b__subtitle">{[ general.subTitle ]}</div>

					{% if general.subTitle %}

						<a href="mailto:{[ general.mail ]}" class="b-link b-link_inner b-link_blue">{[ general.mail ]}</a>

					{% endif %}

					{% if general.phone %}

						<div class="b__text">{[ general.phone ]}</div>

					{% endif %}

				</div>

		{% endfor %}

	</div>

	<div class="b__row">

		{% for others in data.contacts.item.others %}



				<div class="b__col">

					{% if others.name %}

						<div class="b__title">{[ others.name ]}</div>

					{% endif %}

					<div class="b__subtitle">{[ others.subTitle ]}</div>

					{% if others.subTitle %}

						<a href="mailto:{[ others.mail ]}" class="b-link b-link_inner b-link_blue">{[ others.mail ]}</a>

					{% endif %}

					{% if others.phone %}

						<div class="b__text">{[ others.phone ]}</div>

					{% endif %}

				</div>

		{% endfor %}

	</div>

</div>


<div class="js-contact-region b__wrapper group is-contact is-contact_region">
	<div class="b__title">{[ data.contacts.item.region.title ]}</div>
	{% for branch in data.contacts.item.region.branch %}
		<div class="b-bounded-row">
			<div class="b__subtitle">{[branch.location]}</div>
			{% for contacts in branch.contacts %}
				<div class="b-bounded-row__col">
					{% if contacts.name %}
						<div class="b-bounded-row__title">{[contacts.name]}</div>
					{% endif %}
					{% if contacts.subTitle %}
						<div class="b-bounded-row__subtitle">{[contacts.subTitle]}</div>
					{% endif %}
					{% if contacts.mail %}
						{% for mail in contacts.mail %}
							<a href="mailto:{[mail.address]}" class="b-link b-link_inner b-link_blue">{[mail.address]}</a>
							<br>
						{% endfor %}
					{% endif %}
					{% if contacts.phone %}
						{% for phone in contacts.phone %}
							<div class="b-bounded-row__text">{[phone.number]}</div>
						{% endfor %}
					{% endif %}
				</div>
			{% endfor %}
		</div>
	{% endfor %}
</div>
