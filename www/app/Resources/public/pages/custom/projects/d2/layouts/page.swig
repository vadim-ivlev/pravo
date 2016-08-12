<!DOCTYPE html>
<html>
<!-- tmpl {[ _meta.uri ]} -->
<head>
	{% block meta %}{% endblock %}
    {% block head %}{% endblock %}    
</head>
<body>
	<div class="page article">

	{% block header %}{% endblock %}

	{% block main %}{% endblock %}

	{% block sidebar %}{% endblock %}

	{% block footer %}{% endblock %}

	</div>
</body>
<!-- /tmpl {[ _meta.uri ]} -->
</html>