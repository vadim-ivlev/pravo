{{# jurist__length }}
	<div class="b-feed__body">
		<h2 class="b-feed__name">{[ data.title ]}</h2>

		{{# jurist}}
			{{# jurist_offer}}
				<div class="b-feed__item">
					<div class="b-feed__row">
						<a href="{{ jurist_link }}" class="b-link">
							{{# jurist__img}}
								{{# type_medium}}
									<img src="{{ file }}" width="{{ width }}" height="{{ height }}" alt="{{ title }}" class="b-round-image">
								{{/ type_medium}}
							{{/ jurist__img}}
							<div class="b-feed__item-title">
								<b>{{ jurist_name }}</b>
							</div>
						</a>
					</div>
					<div class="b-feed__row">
						<b>Образование:</b>
						<br>
						{{ jurist_education }}
					</div>
					<div class="b-feed__row">
						<b>Специализация:</b>
						<br>
						{{# jurist__tags}}
							{{ jurist__tags_title }}{{^ jurist__tags__LAST__ }},{{/ jurist__tags__LAST__ }}
						{{/ jurist__tags}}
					</div>
				</div>
			{{/ jurist_offer}}
		{{/ jurist}}

	</div>
{{/ jurist__length }}