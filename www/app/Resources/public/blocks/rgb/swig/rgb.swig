{% if blocks %}
	
	{% if sortBlocks %}
		
		{% set sortName = 'default' %}
		
		{% if mod %}
			
			{% for blockName in sortBlocks %}
				
				{% if loop.key == mod %}
					{% set sortName = mod %}
				{% endif %}
				
			{% endfor %}
			
		{% endif %}
		
		{% set blockList = sortBlocks[sortName]|split(' ') %}	{# меняем сортировку на кастомную #}
		
		{% for list in blockList %}
			{[ macro.RGBi(blocks[list], parent) ]}
		{% endfor %}
		
	{% else %}
	
		{% for block in blocks %}
			{[ macro.RGBi(block, parent) ]}
		{% endfor %}
	
	{% endif %}
	
{% else %}

	<div style="padding:10px 20px" class="b__color_warning">
		<div class="b__title">У {% if path.swigElem %}элемента{% else %}блока{% endif %} отсутствует swig шаблон (наличие обязательно)</div>
		
		<div class="b__subtitle">
			{% if path.swigElem %}
				{[ path.swigElem ]}
			{% else %}
				{[ path.swig ]}
			{% endif %}
		</div>
		
		{% if data.data_not_found %}
			<div class="b__title">У {% if path.dataElem %}элемента{% else %}блока{% endif %} {[ data.data_not_found ]} (наличие не обязательно)</div>
			<div class="b__subtitle">
				{% if path.swigElem %}
					{[ path.dataElem ]}
				{% else %}
					{[ path.data ]}
				{% endif %}
			</div>
		{% endif %}
	</div>
	
{% endif %}