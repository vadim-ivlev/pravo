{% if data[mod] %}

	{% if data[mod].liveReload %}
	<div class="liveReload" data-json="https://outer.rg.ru/plain/accents/api/?place={% if data[mod].placeDevId %}{{# is_prod}}{[ data[mod].placeId ]}{{/ is_prod}}{{# is_dev}}{[ data[mod].placeDevId ]}{{/ is_dev}}{% else %}{[ data[mod].placeId ]}{% endif %}{% if data[mod].trans %}&trans=1{% endif %}" data-delay="{% if data[mod].ssi %}{[ data[mod].delay | default('60000') ]}{% else %}0{% endif %}" data-tmpl="/res/templates/accents.html">
	{% endif %}
		
		{% if data[mod].ssi %}
			<!--#include{% if data[mod].includeSe %}_se{% endif %} virtual="/ssi/blocks/crosslayouts/b-accents/{% if data[mod].placeDevId %}{{# is_prod}}{[ data[mod].placeId ]}{{/ is_prod}}{{# is_dev}}{[ data[mod].placeDevId ]}{{/ is_dev}}{% else %}{[ data[mod].placeId ]}{% endif %}.ssi"-->
		{% endif %}

	{% if data[mod].liveReload %}
	</div>
	{% endif %}
	
{% endif %}