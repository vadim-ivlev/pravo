<!DOCTYPE html>
<html>
<!-- tmpl {[ _meta.uri ]} -->
<head>
    {% block head %}{% endblock %}

	{{# include_related_by_theme__length}}

	    {{# include_related_by_theme}}
	        
	        {{# include_related_by_theme__FIRST__}}
	            
	            <!--#if expr="'{{var_name}}' eq 'theme_kino_news'"--><!--#set var="rubric_news" value="1"--><!--#endif -->
	            <!--#if expr="'{{var_name}}' eq 'theme_kino_rakurs'"--><!--#set var="rubric_review" value="1"--><!--#endif -->
	            <!--#if expr="'{{var_name}}' eq 'theme_kino_journal'"--><!--#set var="rubric_journal" value="1"--><!--#endif -->

	        {{/ include_related_by_theme__FIRST__}}

	    {{/ include_related_by_theme}}


	{{/ include_related_by_theme__length}}

</head>
<body>

	<div id="cboxOverlay" class="container-overlay"></div>
	
	<div class="page page_article <!--#if expr="$rubric_news eq 1"-->page_news<!--#endif --><!--#if expr="$rubric_review eq 1"-->page_review<!--#endif --><!--#if expr="$rubric_journal eq 1"-->page_journal<!--#endif -->">
		
		<div class="page__layout page_layout_header">
			 {% block header %}{% endblock %}
		</div>
			
		<div class="page__layout page_layout_article">

            <div class="page__layout__body group">
            	
            	<div class="article group">
            		
					<div class="article-left-wrapper group">
						{% block sidebarLeft %}{% endblock %}
					</div>

					<div class="article-main-wrapper">

						<div class="article-main">
							{% block main %}{% endblock %}
						</div>

					</div>

					<div class="article-side-wrapper group">
						{% block side %}{% endblock %}
					</div>

            	</div>

				<div class="article-right-wrapper group">
					{% block sidebarRight %}{% endblock %}
				</div>

            </div>
                
			<div class="page__layout page_layout_footer">
				 {% block footer %}{% endblock %}
			</div>	
				
		</div>

	</div>

	

</body>
<!-- /tmpl {[ _meta.uri ]} -->
</html>