<div class="b-list-head__body">
	<div class="b-list-head__row">
		<!-- заголовок -->
		<h1 class="b-list-head__title">
			{{# title}}
				{{title}}
			{{/ title}}
			{{# include_related_by_sujet }}
				{{# include_related_by_sujet__FIRST__}}
					{{title}}
				{{/ include_related_by_sujet__FIRST__}}
			{{/ include_related_by_sujet }}
		</h1>
		<rg-follow-sujet txt="'Следить за сюжетом'" subscribed="false" ></rg-follow-sujet>
		<!-- /заголовок -->
	</div>
	<div class="b-list-head__row">
		<!-- новости из рубрик -->
		<div class="b-list-head__related">
			В сюжете новости из рубрик: 
			
			{{# include_related_by_region__length}}
				{{# include_related_by_region}}
					{{# include_related_by_region__path}}
						{{# include_related_by_region__path__LAST__}}
							<a href="{{uri}}" class="b-link b-link_blue b-list-head___name_related">{{title}}</a>
						{{/ include_related_by_region__path__LAST__}}
					{{/ include_related_by_region__path}}
				{{/ include_related_by_region}}
			{{/ include_related_by_region__length}}
			
			{{# include_related_by_org__length}}
				{{# include_related_by_org}}
					{{# include_related_by_org__path}}
						{{# include_related_by_org__path__LAST__}}
							<a href="{{uri}}" class="b-link b-link_blue b-list-head___name_related">{{title}}</a>
						{{/ include_related_by_org__path__LAST__}}
					{{/ include_related_by_org__path}}
				{{/ include_related_by_org}}
			{{/ include_related_by_org__length}}
			
			{{# include_related_by_theme__length}}
				{{# include_related_by_theme}}
					{{# include_related_by_theme__path}}
						{{# include_related_by_theme__path__LAST__}}
							<a href="{{uri}}" class="b-link b-link_blue b-list-head__name_related">{{title}}</a>
						{{/ include_related_by_theme__path__LAST__}}
					{{/ include_related_by_theme__path}}
				{{/ include_related_by_theme}}
			{{/ include_related_by_theme__length}}
			
		</div>
		<!-- /новости из рубрик -->
	</div>
</div>