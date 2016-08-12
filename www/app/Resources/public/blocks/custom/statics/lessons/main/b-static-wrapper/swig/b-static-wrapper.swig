{% if data %}


<div class="b-popup b-popup_src b-popup_regulations">

	<div class="b-popup__wrapper">

		<div class="b-field_select group">

			<div class="b__title">{[ data.regulations.title ]}</div>

			<div class="b-field__wrapper">

				<select name="regulations" class="b-field__select b-field__select_select" type="select">

					{% for item in data.regulations.item %}

						<option value="{[ item.value ]}">{[ item.title ]}</option>

					{% endfor %}

				</select>

			</div>

		</div>

	{% for item in data.regulations.item %}

		<div class="b__item" data-value="{[ item.value ]}">

			{% for row in item.row %}

				<div class="b__wrapper">

					<div class="b__subtitle">{[ row.name ]}</div>

					<p class="b__text">{[ row.position ]}</p>

				</div>

			{% endfor %}

		</div>

	{% endfor %}

	</div>

</div>

<div class="b-popup b-popup_src b-popup_years">

	<div class="b-popup__wrapper">

		<div class="b-field_select group">
			<div class="b__title">{[ data.laureates.title ]}</div>

			<div class="b-field__wrapper">

				<select name="regulations" class="b-field__select b-field__select_select" type="select">

					{% for item in data.laureates.item %}

						<option value="{[ item.value ]}">{[ item.year ]}</option>

					{% endfor %}

				</select>

			</div>

		</div>

		{% for item in data.laureates.item %}

			<div class="b__item" data-value="{[ item.year ]}">

				{% if item.title %}

					<div class="b__title">

						{[ item.title ]}

					</div>

				{% endif %}

				{% for unit in item.unit %}

					<div class="b__wrapper">

						<div class="b__subtitle">{[ unit.country ]}</div>

						{% for name in unit.name %}

							<p class="b__text">{[ name ]}</p>

						{% endfor %}

					</div>

				{% endfor %}

			</div>

		{% endfor %}

	</div>

</div>

	{% if data.notice %}

		<div class="b__item">

			{% for notice in data.notice %}

				<p class="b__text">{[ notice|raw ]}</p>

			{% endfor %}

		</div>

	{% endif %}

	{% if data.newsShpiegel %}
	<div class="b-news b-news-spiegel">
	    <div class="b-news__list">

			{[ macro.RGBi(blocks.feed, parent) ]}

			{[ macro.RGBi(blocks.vidget, parent) ]}

			{[ macro.RGBi(blocks.videoInner, parent) ]}

	        <!--#include virtual="{[ data.newsShpiegel.includes ]}"-->
	    </div>
	</div>
	{% endif %}

	{% if data.news %}
	<div class="b-news">
	    <div class="b-news__list">
	        <!--#include virtual="{[ data.news.includes ]}"-->
	    </div>
	</div>
	{% endif %}

	{% if data.inner %}
	<div id="bNewsInnerChain" class="b-news-inner" data-request-uri="{{uri}}"  data-offset="3" data-request-include="sujet-541" data-request-num="5" >

	    <div class="b-news-inner__list">

	    </div>

	    <div class="b-news-inner__action">
	        <a class="b-link-btn b-link-btn_second b-btn-subs__btn b-news-inner__action_btn js-add-chain-btn">Загрузить ещё</a>
	    </div>

	</div>
	{% endif %}

	{[ macro.RGBi(blocks.koroleva, parent) ]}

	{[ macro.RGBi(blocks.basinskiy, parent) ]}

	{[ macro.RGBi(blocks.maksimov, parent) ]}

	{[ macro.RGBi(blocks.shvidkoy, parent) ]}

	{[ macro.RGBi(blocks.topNews, parent) ]}

	{[ macro.RGBi(blocks.calendarYears, parent) ]}

{% else %}

	<div class="b-list-wrapper b-news-inner">
	    {{{text}}}
	</div>

{% endif %}