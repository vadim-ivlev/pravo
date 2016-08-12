<!--#initcatalog -->

{% if data[mod] %}

	{% if mod == 'catalog' %}
		{{^ path__sections__second}}
	{% endif %}
	
	{% if data[mod].includes %}
		{% for include in data[mod].includes %}
		
		<!--#loadxml virtual="{[ include.path ]}" var="{[ include.var ]}" limit="{[ include.limit ]}" class="{[ include.class ]}" -->
		
		{% endfor %}
	{% endif %}
	
	{% if mod == 'catalog' %}
		{{/ path__sections__second}}
	{% endif %}
	
	<!--#loadarray type="{[ data[mod].type ]}" var="{[ data[mod].var ]}" limit="{[ data[mod].limit ]}" class="{[ data[mod].class ]}" view="{[ data[mod].view ]}" -->

{% endif %}