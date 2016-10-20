<ul class="b-search-results__list">
	{{# Questions_list }}
		<li class="b-search-results__item">
			<div class="b-search-results__left b-search-results__left_date">{{date}}</div>
			<a class="b-link" href="{{ link }}">
				<div class="b-search-results__item-title b-link b-link_title">{{ title }}</div>
				<div class="b-search-results__item-text">{{ text }}</div>
			</a>
		</li>
	{{/ Questions_list }}
	{{# AuthUsers_list }}
		<li class="b-search-results__item">
			<a href="{{ jurist__link }}" class="b-link">
				<div class="b-search-results__left">
					{{# jurist__img }}
						<img class="b-round-image" src="{{ jurist__img__file }}" width="55" height="55" alt="Анна Лаврухина">
					{{/ jurist__img }}
				</div>
				<div class="b-search-results__item-title b-link b-link_title">
					{{ jurist__last_name }}
					{{ jurist__first_name }}
					{{ jurist__patronymic }}
				</div>
				<div class="b-rate">
					<div class="b-rate__icon"></div>
					<div class="b-rate__value">{{ jurist__total__rating }}</div>
				</div>
			</a>
		</li>
	{{/ AuthUsers_list }}
</ul>
{{{ empty_search }}}