<{[ data[mod].tag ]} 
	
	{% if data[mod].attrs %}
		{% for attrs in data[mod].attrs %}
			{[ loop.key ]}="
				{% if loop.key == 'items' %}
					{[attrs | json]}
				{% else %}
					'{[ attrs ]}'
				{% endif %}	
			"
		{% endfor %}
	{% endif %} 

></{[ data[mod].tag ]}>