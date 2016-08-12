<!DOCTYPE html>
<html>
<!-- tmpl {[ _meta.uri ]} -->
<head>
    {% block head %}{% endblock %}
</head>
<body>
	
	<div class="container">
		
		<div class="b-header">
			 {% block header %}{% endblock %}
		</div>
			
		<div class="b-main">

			<div class="b-left">
				{% block sidebarLeft %}{% endblock %}
			</div>

			<div class="b-article-page">
				{% block main %}{% endblock %}
			</div>

			<div class="b-right">
				{% block sidebarRight %}{% endblock %}
			</div>				

		</div>

	</div>

	<div class="b-footer">
		 {% block footer %}{% endblock %}
	</div>	

</body>
<!-- /tmpl {[ _meta.uri ]} -->
</html>