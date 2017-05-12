{# <div class="b-seo-info__name">{{{current_rubric.seo_title_rubric_for_block}}}</div> #}
{{^ current_rubric }}
	<div class="b-seo-info__body">
		<div class="b-seo-info__content">
			{[ data.main.text | safe ]}
		</div>
	</div>
{{/ current_rubric}}
{{# current_rubric.seo_title_description_for_block}}
	<div class="b-seo-info__body">
		<div class="b-seo-info__content">
			{{{current_rubric.seo_title_description_for_block}}}
		</div>
	</div>
{{/ current_rubric.seo_title_description_for_block}}