<div class="b-list-head__body">
	<div class="b-list-head__row">
		<h1 class="b-list-head__title">
			{{this_section__title}}
		</h1>
	</div>

	{{# sections__length}}
	<div class="b-list-head__row">
		<div class="b-list-head__related">	
			{{# sections}}
			<a href="{{uri}}" class="b-link b-link_blue b-list-head__name_related">{{title}}</a>
			{{/ sections}}
		</div>
	</div>
	{{/ sections__length}}
</div>