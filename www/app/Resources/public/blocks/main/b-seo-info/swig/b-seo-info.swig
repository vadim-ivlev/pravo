{# <div class="b-seo-info__name">{{{current_rubric.seo_title_rubric_for_block}}}</div> #}
{{^ seo.seo__length }}
	<div class="b-seo-info__body">
		<div class="b-seo-info__content">
			{[ data.main.text | safe ]}
		</div>
	</div>
{{/ seo.seo__length }}
{{# seo.seo__length}}
	<div class="b-seo-info__body">
		<div class="b-seo-info__content">
			{{{seo.seo__block_text}}}
		</div>
	</div>
{{/ seo.seo__length}}