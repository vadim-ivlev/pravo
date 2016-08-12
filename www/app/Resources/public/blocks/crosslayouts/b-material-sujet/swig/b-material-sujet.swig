<div class="b-feed b-material-sujet__body">

	{{# include_related_by_sujet}}
		
		{{# include_related_by_sujet__FIRST__}}

			<h2 class="b-material-sujet__name">
				<a href="{{uri}}">{{title}}</a>
			</h2>

			<div class="b-material-sujet__list">

	            <!--#loadxml virtual="{[ data.includes[0] ]}" var="{[ data.xml_var ]}" limit="3" class="related_articles" -->
							
				<!--#echo var="{[ data.xml_var ]}" -->

			</div>
			 
			<rg-follow-sujet txt="'Следить за сюжетом'" subscribed="false" ></rg-follow-sujet>

			<!-- <a href="{{uri}}" class="b-link_blue">Все новости сюжета</a> -->

		{{/ include_related_by_sujet__FIRST__}}
		
	{{/ include_related_by_sujet}}
		
	
</div>