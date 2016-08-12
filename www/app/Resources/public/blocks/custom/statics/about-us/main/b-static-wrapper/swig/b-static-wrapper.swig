<div class="has-media">


	{% for row in data.row %}

		<div class="b-rubricator-menu">

			<div class="b-rubricator-menu__list">

				<div id="anniversary" class="b-rubricator-menu__item b-rubricator-menu__item_active">25 лет Российской газете</div>

				<div id="interview" class="b-rubricator-menu__item">Интервью</div>

			</div>

		</div>

		<div class="b__row b__row_anniversary">

			{% for anniversary in row.anniversary %}

			<div class="b__item">

				<div class="b__media">

					{% for media in anniversary.media %}

					<div class="b-video-source" data-file="{[ media.video_src ]}" data-image="{[ media.video_img ]}"></div>

					{[ media.video_code|raw ]}

					{% endfor %}

				</div>

				{% for content in anniversary.content %}

				<div class="b__content">

					<div class="b-vendors-block {[ content.class ]} "></div>

					<div class="b__title">{[ content.title ]}</div>

					<div class="b__text">{[ content.text ]}</div>

					<div class="b-quote">

						{% for quote in content.quote %}

						<div class="b-quote__meta">{[ quote.meta ]}</div>

						{% endfor %}

					</div>

				</div>

			</div>



			{% endfor %}

			{% endfor %}

		</div>

		<div class="b__row b__row_interview visuallyhidden">

			{% for interview in row.interview %}

			<div class="b__item">

				<div class="b__media">

					{% for media in interview.media %}

					<div class="b-video-source" data-file="{[ media.video_src ]}" data-image="{[ media.video_img ]}"></div>

					{[ media.video_code|raw ]}

					{% endfor %}

				</div>

				{% for content in interview.content %}

				<div class="b__content">

					<div class="b-vendors-block {[ media.class ]} "></div>

					<div class="b__title">{[ content.title ]}</div>

					<div class="b__text">{[ content.text ]}</div>


					<div class="b-quote">

						{% for quote in content.quote %}

						<div class="b-quote__text">{[ quote.text ]}</div>

						<div class="b-quote__name">{[ quote.name ]}</div>

						<div class="b-quote__meta">{[ quote.meta ]}</div>

						{% endfor %}

					</div>

				</div>

			</div>


			{% endfor %}

			{% endfor %}

		</div>

	{% endfor %}

</div>
