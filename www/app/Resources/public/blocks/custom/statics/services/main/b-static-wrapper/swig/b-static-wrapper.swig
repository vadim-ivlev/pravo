
<div class="b__row group">

	<h2 class="b__title">{[ data.row.itemMobile.title ]}</h2>

	<div class="b__item has-right half-size">

		<div class="b__media">

			<img src="{[ data.row.itemMobile.itemRight.imageUrl ]}" alt="" class="b__img">

		</div>

	</div>

	<div class="b__item has-left half-size">

		<ul class="b-ul">
			{% for list in data.row.itemMobile.itemLeft.list %}

				<li class="b-ul__item">{[ list ]}</li>

			{% endfor %}

		</ul>

		<p class="b-p">{[ data.row.itemMobile.itemLeft.text ]}</p>

		<div class="b-app-store">

			{% for images in data.row.itemMobile.itemLeft.images %}

				<div class="b-app-store__item has-left">

					<a href="{[ images.link ]}"  class="b-app-store__link"><img src="{[ images.imgUrl ]}" alt="" class="b-app-store__img"></a>

				</div>

			{% endfor %}

		</div>

	</div>


</div>
<div class="b__row group">

	<h2 class="b__title">{[ data.row.itemRss.title ]}</h2>

	{% for item in data.row.itemRss.item %}

	<div class="b__item has-left half-size">

		{% for table in item.table %}

			<div class="b-table__title">{[ table.title ]}</div>

			<table class="b-table">

			{% for item in table.item %}

			<tr class="b-table__row">

				<td class="b-table__text">{[ item.text ]}</td>

				<td class="b-table__col"><a class="b-table__icon rss-icon" href="{[ item.rss ]}"></a></td>

				<td class="b-table__col"><a class="b-table__icon yandex-news-icon" href="{[ item.yandex ]}"></a></td>

				<td class="b-table__col"><a class="b-table__icon google-icon" href="{[ item.google ]}"></a></td>

			</tr>

			{% endfor %}

			</table>

		{% endfor %}
			

	</div>

	{% endfor %}
</div>

<div class="b__row">

	<h2 class="b__title">{[ data.row.itemSoc.title ]}</h2>

	{% for cols in data.row.itemSoc.cols %}

		<div class="b__col has-left quarter-size">


			{% for item in cols.item %}

				<div class="b__item">

					<div class="b__subtitle {[ item.title.itemClass ]} ">{[ item.title.text ]}</div>


					{% for link in item.link %}

						<a href="{[ link.href ]}" class="b-link b-link_blue">{[ link.text ]}</a>

					{% endfor %}

				</div>

			{% endfor %}


		</div>

	{% endfor %}

</div>




