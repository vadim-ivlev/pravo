<div class="b-feed b-material-sujet__body">
	
	{{# include_related_by_theme}}
		
		{{# include_related_by_theme__FIRST__}}
		
			{{# include_related_by_theme__path}}
			
				{{# include_related_by_theme__path__FIRST__}}
				
				<h2 class="b-material-sujet__name">
					Читайте в рубрике <a href="{{uri}}">{{title}}</a>
				</h2>

				<div class="b-material-sujet__list">

					<!--#loadxml virtual="{[ data.includes[0] ]}" var="{[ data.xml_var ]}" limit="4" class="related_articles" -->
								
					<!--#echo var="{[ data.xml_var ]}" -->

				</div>

				<!-- <a href="{{uri}}" class="b-link_blue">Все новости рубрики</a> -->
				
				{{/ include_related_by_theme__path__FIRST__}}
			
			{{/ include_related_by_theme__path}}
		
		{{/ include_related_by_theme__FIRST__}}
		
	{{/ include_related_by_theme}}
	
</div>