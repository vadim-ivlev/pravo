<!-- <script>
	var currentRubric = '{{ current_rurbic }}';
</script> -->

<div class="b-categories__body{% if mod == "sidebar" || mod == "sidebar-active-link" %} b-categories__body_blue{% endif %}">
	<div id="js-categories-list" class="b-categories__list{% if mod == "sidebar" || mod == "sidebar-active-link" %} b-categories__list_sidebar{% endif %}">
		<div class="b-categories__item b-categories__item_mobile">
			<a class="b-categories__link" href="/">Все консультации</a>
		</div>
		{{# categories }}
			{{# rubrics }}
				<div class="b-categories__item{% if mod == "main" %} b-categories__item_main{% endif %}{{# select_rubric}} b-categories__item_highlighted{{/ select_rubric}}{{# rubrics__active }} b-categories__item_active{{/ rubrics__active }}">
					{{^ rubrics__active }}
						<a href="{{ rubrics__link }}" class="b-link b-categories__link">{{ rubrics__title }}</a>
					{{/ rubrics__active }}
					{{# rubrics__active }}
						<a href="{{ rubrics__link }}" class="b-link b-categories__link{% if mod !== "sidebar-active-link" %} b-categories__link_disabled{% endif %}">{{ rubrics__title }}</a>
					{{/ rubrics__active }}
				</div>
			{{/ rubrics }}
		{{/ categories }}
	</div>
</div>