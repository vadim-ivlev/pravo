


	<div class="b__row">

		{% for item in data.row.item %}

			<div class="b__item group">

				<div class="b__wrapper group">

					<div class="b__title">{[ item.title ]}</div>

					<div class="b__text">{[ item.text ]}</div>

				</div>

				<div class="b-downloads">

					<div class="b-downloads__link b-file-icon b-file-icon-{[ item.file.fileType ]}"><a class="b-link b-link_inner b-link_blue" href="{[ item.file.link ]}">{[ item.file.linkTitle ]}</a></div>

					<div class="b-downloads__meta">(<span>{[ item.file.fileType ]}</span>, {[ item.file.fileSize ]})</div>

				</div>


			</div>

		{% endfor %}

	</div>






