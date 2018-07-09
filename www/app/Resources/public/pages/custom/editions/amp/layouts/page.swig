<!DOCTYPE html>
<html amp lang="ru">
<!-- tmpl {[ _meta.uri ]} -->
<head>
	
	{% block meta %}{% endblock %}
	
    {% block head %}{% endblock %}
	
</head>
<body>

    <div class="
		l-page 
		l-page_{[ _meta.uri ]}
		
		{% if _meta.promoSection %}l-page_promo{% endif %}
	">

        <div class="l-page__body group">
				
                <div 
					class="l-page__wrapper"
					{% if main.itemtype %}itemscope="" itemtype="{[ main.itemtype ]}"{% endif %}
				>
				
                    {% block main %}{% endblock %}
					
                </div>
 
        </div>

		{% block footer %}{% endblock %}
		
    </div>
	
</body>
<!-- /tmpl {[ _meta.uri ]} -->
</html>