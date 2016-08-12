
{% for includes in data.includes %}

	<div class="b-top-news__body">

		{% if includes.name %}

			<h2 class="b-top-news__name">
				{[ includes.name ]}
			</h2>

		{% endif %}

		{% if includes.title %}

			<h2 class="b-top-news__title">
				<a href="{{uri}}">{{title}}</a>
			</h2>

		{% endif %}

		<div class="b-top-news__list">

			<!--#include virtual="{[
				includes.include
			]}"-->

		</div>

		<rg-follow-sujet txt="'Следить за сюжетом'" subscribed="false" ></rg-follow-sujet>

		{% if data.hasAllNews %}

			<a href="{{uri}}" class="b-link_blue">Все новости сюжета</a>

		{% endif %}


	</div>

{% endfor %}