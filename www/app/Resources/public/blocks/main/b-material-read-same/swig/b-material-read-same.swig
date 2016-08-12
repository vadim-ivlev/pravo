<div class="b-feed b-material-read-same__body">

	{% if data.hasMaterialParent %}
		{[ macro.RGBi(blocks.materialSujet, parent) ]}

		{[ macro.RGBi(blocks.materialRubric, parent) ]}
	{% endif %}

	{% if data.hasTopNews %}
		{[ macro.RGBi(blocks.topNews, parent) ]}
	{% endif %}
	
</div>