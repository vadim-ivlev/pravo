<div class="b-categories__body{% if mod == "sidebar" %} b-categories__body_blue{% endif %}">
	<div class="b-categories__list{% if mod == "sidebar" %} b-categories__list_sidebar js-categories-list{% endif %}">
		{{# categories }}
			{{# rubrics }}
				<div class="b-categories__item{% if mod == "main" %} b-categories__item_main{% endif %}{{# rubrics__active }} b-categories__item_active{{/ rubrics__active }}">
					{{^ rubrics__active }}
						<a href="{{ rubrics__link }}" class="b-link{% if mod == "sidebar" %} b-link_white{% else %} b-link_blue{% endif %} b-categories__link">{{ rubrics__title }}</a>
					{{/ rubrics__active }}
					{{# rubrics__active }}
						<span>{{ rubrics__title }}</span>
					{{/ rubrics__active }}
				</div>
			{{/ rubrics }}
		{{/ categories }}
	</div>
</div>