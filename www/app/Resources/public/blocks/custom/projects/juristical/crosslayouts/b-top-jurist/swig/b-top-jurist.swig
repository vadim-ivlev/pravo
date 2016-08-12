{{# jurist__length}}
	<div class="b-top-jurist__name">{[data.title]}</div>
	{{# jurist}}
		{{# jurist_top}}
			<a class="b-link" href="{{ jurist_link }}">
				<div class="b-jurist-introduction">
					{{# jurist__img}}
						{{# type_medium}}
							<img src="{{ file }}" width="{{ width }}" height="{{ height }}" alt="{{ title }}" class="b-round-image">
						{{/ type_medium}}
					{{/ jurist__img}}
					<div class="b-jurist-introduction__right-col">
						<b>{{ jurist_name }}</b>
						<div class="b-jurist-introduction__index">Консультаций: {{ jurist_consultations }}</div>
					</div>
				</div>
			</a>
		{{/ jurist_top}}
	{{/ jurist}}
{{/ jurist__length}}