
<div class="b-rubricator-menu">

	<div class="b-rubricator-menu__list">

		<div class="b-rubricator-menu__item b-rubricator-menu__item_active">Партнерские</div>

		<div class="b-rubricator-menu__item">Тематические</div>

		<div class="b-rubricator-menu__item">Региональные</div>

	</div>

</div>

<div class="b__wrapper group">

	<div class="b__row">
		
		{% for brand in data.materials.brand  %}

				<div class="b__item {% if brand.size %}is-{[ brand.size ]}{% endif %}">
					<div class="b__media">
						<a href="{[ brand.url ]}">
							<img src="{[ brand.img ]}" alt="" class="b__img is-first-img">
							<img src="{[ brand.smallImg ]}" alt="" class="b__img is-second-img">
						</a>
					</div>
					<a href="{[ brand.url ]}">
						<div class="b__col">
							<div class="b__title">{[ brand.title ]}</div>
							<div class="b__text">{[ brand.description ]}</div>
						</div>
					</a>
				</div>

		{% endfor %}

	</div>

	<div class="b__row">

		{% for content in data.materials.content  %}

				<div class="b__item {% if content.size %}is-{[ content.size ]}{% endif %}">
					<div class="b__media">
						<a href="{[ content.url ]}">
							<img src="{[ content.img ]}" alt="" class="b__img is-first-img">
							<img src="{[ content.smallImg ]}" alt="" class="b__img is-second-img">
						</a>
					</div>
					<a href="{[ content.url ]}">
						<div class="b__col">
							<div class="b__title">{[ content.title ]}</div>
							<div class="b__text">{[ content.description ]}</div>
						</div>
					</a>

				</div>

		{% endfor %}

	</div>

	<div class="b__row">

		{% for region in data.materials.region  %}

				<div class="b__item {% if region.size %}is-{[ region.size ]}{% endif %}">
					<div class="b__media">
						<a href="{[ region.url ]}">
							<img src="{[ region.img ]}" alt="" class="b__img is-first-img">
							<img src="{[ region.smallImg ]}" alt="" class="b__img is-second-img">
						</a>
					</div>
					<a href="{[ region.url ]}">
						<div class="b__col">
							<div class="b__title">{[ region.title ]}</div>
							<div class="b__text">{[ region.description ]}</div>
						</div>
					</a>
				</div>

		{% endfor %}		

	</div>

</div>
