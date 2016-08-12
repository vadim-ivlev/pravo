<!DOCTYPE html>
<html>
<!-- tmpl {[ _meta.uri ]} -->
<head>
	{% block meta %}{% endblock %}
    {% block head %}{% endblock %}    
</head>
<body>

	{% block header %}{% endblock %}

    {% block schedule %}{% endblock %}

	<!-- <div class="page page_{[_meta.type]} group"> -->
        {% block main %}{% endblock %}
    <!-- </div> -->

	{% block footer %}{% endblock %}
</body>
<!-- /tmpl {[ _meta.uri ]} -->
</html>