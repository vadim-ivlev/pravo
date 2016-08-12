

{% if data.tabs %}

	<div class="b-rubricator-menu group">

		<div class="b-rubricator-menu__list">

			{% for tabs in data.tabs %}

				<div data-mod="{[ tabs.mod ]}" class="b-rubricator-menu__item is-tab {% if loop.first %}b-rubricator-menu__item_active{% endif %}">{[ tabs.title ]}</div>

			{% endfor %}

		</div>

	</div>

{% endif %}

<div data-mod="{[ data.mainPage.mod ]}" class="b__wrapper is-page-reveal is-main-page group">
	<div class="b__col is-main-text">

		{% for item in data.mainPage.main.item %}

			{% if item.text %}

				{% for text in item.text %}

					<div class="b__text">{[ text ]}</div>

				{% endfor %}

			{% endif %}


			{% if item.list %}

				<div class="b-ul">
					<ul class="b-ul__list">

						{% for list in item.list %}

							<li class="b-ul__item">
								{[ list|raw ]}
							</li>

						{% endfor %}

					</ul>

				</div>

			{% endif %}

		{% endfor %}

		{% for meta in data.mainPage.main.meta %}

			<div class="b__wrapper is-meta">

				<div class="b__title">{[ meta.title ]}</div>

				{% for content in meta.content %}

					<div class="b__row group">
						<div class="b__col">{[ content.left ]}</div>
						<div class="b__col">{[ content.right ]}</div>
					</div>

				{% endfor %}

			</div>

		{% endfor %}

	</div>
	<div class="b__col is-table-wrapper">

		{% for docs in data.mainPage.side.docs %}

			<div class="b-downloads">
				<div class="b-downloads__link b-file-icon b-file-icon-{[ docs.type ]}">
					<a class="b-link b-link_inner b-link_blue" href="{[ docs.url ]}">{[ docs.title ]}</a>
				</div>
				<div class="b-downloads__meta">{[ docs.size ]}</div>
			</div>

		{% endfor %}

		<div class="b__wrapper is-table group">

			<div class="b__title">{[ data.mainPage.side.table.title ]}</div>

			<div class="b__wrapper">

				<div class="b-field_select group">
					<div class="b-field__wrapper">
						<select name="" class="b-field__select b-field__select_select" type="select">

							{% for select in data.mainPage.side.table.select %}

								<option value="{[ select.value ]}">{[ select.title ]}</option>

							{% endfor %}

						</select>
					</div>

				</div>

				{% for item in data.mainPage.side.table.item %}

					<div class="b__wrapper is-table-item" data-value="{[ item.data ]}">

						{% for unit in item.unit %}

							<div class="b__item group is-table-unit">

								{% for col in unit.col %}

									<div class="b__row group is-table-row">
										<div class="b__col is-table-col-right">{[ col.left ]}</div>
										<div class="b__col is-table-col-left">
											<div class="b__col">{[ col.center ]}</div>
											<div class="b__col">{[ col.right ]}</div>
										</div>
									</div>

								{% endfor %}

							</div>

						{% endfor %}

					</div>

				{% endfor %}

			</div>

			{% for meta in data.mainPage.side.table.meta %}

				<div class="b__text">{[ meta ]}</div>

			{% endfor %}

		</div>
	</div>
</div>

<div data-mod="{[ data.majorPage.mod ]}" class="b__wrapper is-page-reveal is-banners-place is-major-page">
	<div class="b__col is-main">
		<div class="b__wrapper is-main-description">

			{% for description in data.majorPage.col.main.description %}

					{% if description.text %}

						{% for text in description.text %}

							<div class="b__text">{[ text ]}</div>

						{% endfor %}

					{% endif %}

			{% endfor %}

		</div>

		<div class="b__wrapper is-interactive">
			<div class="b__wrapper is-interactive-item">
				<div class="b__item">
					<div class="b__media">
						<img src="{[ data.majorPage.col.side.item.img ]}" alt="" class="b__img">
					</div>
				</div>
			</div>
		</div>
		<div class="b__wrapper is-table">

			{% for item in data.majorPage.col.main.table.item %}

				<div class="b__row group {% if item.mod %}is-table-{[ item.mod ]}{% endif %}">

					<div class="b__col is-table-col-left">{[ item.left ]}</div>

					<div class="b__item group">

						{% if item.center %}

							<div class="b__col is-table-col-center">{[ item.center|raw ]}</div>

						{% endif %}

						{% if item.right %}

							<div class="b__col is-table-col-right">{[ item.right ]}</div>

						{% endif %}
					</div>

				</div>

			{% endfor %}

		</div>
		<div class="b__wrapper is-meta-description">

			<div class="b__title">{[ data.majorPage.col.main.meta.title ]}</div>

				{% for item in data.majorPage.col.main.meta.item %}

					{% if item.text %}

						{% for text in item.text %}

							<div class="b__text">{[ text ]}</div>

						{% endfor %}

					{% endif %}

					{% if item.list %}

						<div class="b-ul">
							<ul class="b-ul__list">

								{% for list in item.list %}

									<li class="b-ul__item">{[ list ]}</li>

								{% endfor %}

							</ul>
						</div>
					{% endif %}

				{% endfor %}
		</div>
	</div>
</div>

<div data-mod="{[ data.rubricPage.mod ]}" class="b__wrapper is-page-reveal is-banners-place is-rubric-page">
	<div class="b__col is-main">
		<div class="b__wrapper is-main-description">

			{% for description in data.rubricPage.col.main.description %}

				{% if description.text %}

					{% for text in description.text %}

						<div class="b__text">{[ text ]}</div>

					{% endfor %}

				{% endif %}

			{% endfor %}

		</div>

		<div class="b__wrapper is-interactive">
			<div class="b__wrapper is-interactive-item">
				<div class="b__item">
					<div class="b__media">
						<img src="{[ data.rubricPage.col.side.item.img ]}" alt="" class="b__img">
					</div>
				</div>
			</div>
		</div>
		<div class="b__wrapper is-table">

			{% for item in data.rubricPage.col.main.table.item %}

				<div class="b__row group {% if item.mod %}is-table-{[ item.mod ]}{% endif %}">

					<div class="b__col is-table-col-left">{[ item.left ]}</div>

					<div class="b__item group">

						{% if item.center %}

							<div class="b__col is-table-col-center">{[ item.center|raw ]}</div>

						{% endif %}

						{% if item.right %}

							<div class="b__col is-table-col-right">{[ item.right ]}</div>

						{% endif %}

					</div>

				</div>

			{% endfor %}

		</div>
		<div class="b__wrapper is-meta-description">

			<div class="b__title">{[ data.rubricPage.col.main.meta.title ]}</div>

				{% for item in data.rubricPage.col.main.meta.item %}

					{% if item.text %}

						{% for text in item.text %}

							<div class="b__text">{[ text ]}</div>

						{% endfor %}

					{% endif %}

					{% if item.list %}

						<div class="b-ul">
							<ul class="b-ul__list">

								{% for list in item.list %}

									<li class="b-ul__item">{[ list ]}</li>

								{% endfor %}

							</ul>
						</div>
					{% endif %}

				{% endfor %}
		</div>
	</div>
</div>

<div data-mod="{[ data.articlePage.mod ]}" class="b__wrapper is-page-reveal is-banners-place is-article-page">
	<div class="b__col is-main">

		<div class="b__wrapper is-main-description">

			{% for description in data.articlePage.col.main.description %}

				{% if description.text %}

					{% for text in description.text %}

						<div class="b__text">{[ text ]}</div>

					{% endfor %}

				{% endif %}

			{% endfor %}

		</div>

		<div class="b__wrapper is-interactive">
			<div class="b__wrapper">
				<div class="b__item">
					<div class="b__media">
						<img src="{[ data.articlePage.col.side.item.img ]}" alt="" class="b__img">
					</div>
				</div>
			</div>
		</div>

		<div class="b__wrapper is-table">

			{% for item in data.articlePage.col.main.table.item %}

				<div class="b__row group {% if item.mod %}is-table-{[ item.mod ]}{% endif %}">

					<div class="b__col is-table-col-left">{[ item.left ]}</div>

					<div class="b__item group">

						{% if item.center %}

							<div class="b__col is-table-col-center">{[ item.center|raw ]}</div>

						{% endif %}

						{% if item.right %}

							<div class="b__col is-table-col-right">{[ item.right ]}</div>

						{% endif %}

					</div>

				</div>

			{% endfor %}

		</div>
		<div class="b__wrapper is-meta-description">

			<div class="b__title">{[ data.articlePage.col.main.meta.title ]}</div>

				{% for item in data.articlePage.col.main.meta.item %}

					{% if item.text %}

						{% for text in item.text %}

							<div class="b__text">{[ text ]}</div>

						{% endfor %}

					{% endif %}

					{% if item.list %}

						<div class="b-ul">
							<ul class="b-ul__list">

								{% for list in item.list %}

									<li class="b-ul__item">{[ list ]}</li>

								{% endfor %}

							</ul>
						</div>
					{% endif %}

				{% endfor %}
		</div>
	</div>
</div>

<div data-mod="{[ data.infoMaterials.mod ]}" class="b__wrapper is-page-reveal is-info-materials">

	<div class="b__row">

		<div class="b__col is-main-text">

			{% for main in data.infoMaterials.col.main %}

				<div class="b__title">
					{[ main.title ]}
				</div>

				{% for content in main.content %}

					{% for text in content.text %}

						<div class="b__text">
							{[ text ]}
						</div>

					{% endfor %}

					{% if content.list %}

						{% for list in content.list %}

							<div class="b-ul">
								<ul class="b-ul__list">
									<li class="b-ul__item">
										{[ list ]}
									</li>
								</ul>
							</div>

						{% endfor %}

					{% endif %}

				{% endfor %}

			{% endfor %}

		</div>

		<div class="b__col group is-table">
			<div class="b__wrapper">
				<div class="b__title">

					{[ data.infoMaterials.col.side.table.title ]}

				</div>
				<div class="b__wrapper group is-item-wrapper">
					<div class="b__title">{[ data.infoMaterials.col.side.table.subtitle ]}</div>

					{% for item in data.infoMaterials.col.side.table.item %}

						<div class="b__item is-item-{[ item.mod ]}">

							{% for unit in item.unit %}

								<div class="b__row group">

									{% if unit.subtitle %}

										<div class="b__subtitle">{[ unit.subtitle|raw ]}</div>

									{% endif %}

									{% if unit.select %}

										<div class="b-field_select group">
											<div class="b-field__wrapper">
												<select name="infoMaterials" class="b-field__select b-field__select_select" type="select">

													{% for select in unit.select %}

														<option value="{[ value ]}">{[ select ]}</option>

													{% endfor %}

												</select>
											</div>
										</div>

										{% for select in unit.select %}

											<div class="b__col">{[ select ]}</div>

										{% endfor %}

									{% endif %}

									{% if unit.price %}

										<div class="b__wrapper is-price-wrapper">

											{% for price in unit.price %}

												<div class="b__col">{[ price ]}</div>

											{% endfor %}

										</div>

									{% endif %}

								</div>

							{% endfor %}
						</div>

					{% endfor %}

				</div>
				<div class="b__subtitle">

					{[ data.infoMaterials.col.side.table.meta ]}

				</div>
			</div>
		</div>
	</div>
</div>

<div data-mod="{[ data.mobileApp.mod ]}" class="b__wrapper is-page-reveal is-banners-place is-mobileApp">
	<div class="b__col is-main">
		<div class="b__wrapper is-description">

			{% for description in data.mobileApp.col.main.description %}

					{% if description.text %}

						{% for text in description.text %}

							<div class="b__text">{[ text|raw ]}</div>

						{% endfor %}

					{% endif %}

					{% if description.list %}

						<div class="b-ul">
							<ul class="b-ul__list">

								{% for list in description.list %}

								<li class="b-ul__item">{[ list|raw ]}</li>

								{% endfor %}

							</ul>
						</div>
					{% endif %}

			{% endfor %}

		</div>

		<div class="b__wrapper is-interactive">
			<div class="b__wrapper group is-check-mobile">
				<div class="b-form group">
					<div class="b-form__title">{[ data.mobileApp.col.side.interactive.radioButton.title ]}</div>

					{% for item in data.mobileApp.col.side.interactive.radioButton.item %}

						<label class="b-field b-field_input b-field_input_radio">
							<div class="b-field__label">{[ item.name ]}</div>
							<div class="b-field__wrapper">
								<input class="b-field__input b-field__input_radio" type="radio" {% if loop.first %} checked {% endif %} name="check-mobile" value="{[ item.name ]}"/>
								<span class="b-field__icon"></span>
							</div>
						</label>

					{% endfor %}

				</div>
			</div>
			{% for item in data.mobileApp.col.side.interactive.item %}

				<div class="b__wrapper is-interactive-item">

					{% for unit in item.unit %}

						<div class="b__item is-interactive-{[ unit.position ]}{% if loop.first %} is-active {% endif %}">
							<div class="b__media">
								<img src="{[ unit.img ]}" alt="" class="b__img">
							</div>
						</div>

					{% endfor %}

				</div>

			{% endfor %}
		</div>

		<div class="b__wrapper is-table">

			{% for item in data.mobileApp.col.main.table.item %}

				<div class="b__row group {% if item.mod %}is-table-{[ item.mod ]}{% endif %} {% if item.class %}{[ item.class ]}{% endif %}">

					<div class="b__col is-table-col-left">{[ item.left ]}</div>

					<div class="b__item group">
						
						{% if item.center %}

							<div class="b__col is-table-col-center">{[ item.center|raw ]}</div>

						{% endif %}

						{% if item.right %}

							<div class="b__col is-table-col-right">{[ item.right ]}</div>

						{% endif %}

					</div>
				</div>

			{% endfor %}

			<div class="b__text">{[ data.mobileApp.col.main.table.meta ]}</div>

		</div>
		<div class="b__wrapper is-meta-description">

			<div class="b__title">{[ data.mobileApp.col.main.meta.title ]}</div>

				{% for item in data.mobileApp.col.main.meta.item %}

					{% if item.text %}

						{% for text in item.text %}

							<div class="b__text">{[ text ]}</div>

						{% endfor %}

					{% endif %}

					{% if item.list %}

						<div class="b-ul">
							<ul class="b-ul__list">

								{% for list in item.list %}

									<li class="b-ul__item">{[ list ]}</li>

								{% endfor %}

							</ul>
						</div>
					{% endif %}

				{% endfor %}
		</div>
	</div>
</div>

<div class="b__wrapper is-contact">
	<div class="b__title">{[ data.contacts.title ]}</div>

	<div class="b__row is-contact-general group">

		{% for general in data.contacts.item.general %}

			<div class="b__col group">

				{% if general.genPhone %}

					{% for genPhone in general.genPhone %}

						<h2 class="b__title">{[ genPhone ]}</h2>

					{% endfor %}

				{% endif %}

				{% if general.name %}

					<div class="b__title">{[ general.name ]}</div>

				{% endif %}


				{% if general.subTitle %}

					<div class="b__subtitle">{[ general.subTitle ]}</div>

				{% endif %}

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
