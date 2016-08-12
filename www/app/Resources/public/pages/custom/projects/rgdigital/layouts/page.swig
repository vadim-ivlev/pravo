<!DOCTYPE html>
<html class="wf-notosans-n4-active wf-notosans-n7-active wf-notoserif-n4-active wf-notoserif-n7-active wf-active" lang="ru">
<!-- tmpl {[ _meta.uri ]} -->
<head>
    {% block head %}{% endblock %}
</head>
<body>
	
	<div class="container article">
		
		<header>
			 {% block header %}{% endblock %}
		</header>
		
		<div class="row">
			
			<div class="main-content col-md-9 col-sm-12">
				{% block main %}{% endblock %}
			</div>
			
			<aside class="col-md-3 col-sm-12 mid-vert">
				{% block sidebarRight %}{% endblock %}
			</aside>
			
		</div>
		
		<footer>
			 {% block footer %}{% endblock %}
		</footer>
		
	</div>
	
</body>
<!-- /tmpl {[ _meta.uri ]} -->
</html>