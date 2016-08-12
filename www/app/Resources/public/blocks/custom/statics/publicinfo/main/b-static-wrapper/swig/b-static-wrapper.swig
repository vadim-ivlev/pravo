{% for row in data.row %}

	{% for info in row.info %}

		{% for item in info.item %}

			<div class="b-downloads">

				<div class="b-downloads__link b-file-icon b-file-icon-{[ item.fileType ]}"><a class="b-link b-link_inner b-link_blue" href="{[ item.link ]}">{[ item.linkTitle ]}</a></div>

				<div class="b-downloads__meta">(<span>{[ item.fileType ]}</span>, {[ item.fileSize ]})</div>

			</div>

		{% endfor %}

	{% endfor %}

	{% for report in row.report %}

		{% for title in report.title %}

			<div class="b-p"> {[ title.item ]} </div>

		{% endfor %}

		{% for filialItems in report.filialItems %}

		<div class="b-static-wrapper__list group">

			{% for item in filialItems.item %}

				<div class="b-downloads">

					<div class="b-downloads__link b-file-icon b-file-icon-{[ item.fileType ]}"><a class="b-link b-link_inner b-link_blue" href="{[ item.link ]}">{[ item.linkTitle ]}</a></div>

					<div class="b-downloads__meta">(<span>{[ item.fileType ]}</span>, {[ item.fileSize ]})</div>

				</div><br>

			{% endfor %}

		</div>

		{% endfor %}

		{% for archive in report.archive %}

			{% for item in archive.item %}

				<div class="b-downloads b-downloads_last ">

					<div class="b-downloads__link b-title b-file-icon b-file-icon-{[ item.fileType ]}"><a class="b-link b-link_inner b-link_blue" href="{[ item.link ]}">{[ item.linkTitle ]}</a></div>

					<div class="b-downloads__meta">(<span>{[ item.fileType ]}</span>, {[ item.fileSize ]})</div>

				</div>

			{% endfor %}

		{% endfor %}

	{% endfor %}

{% endfor %}