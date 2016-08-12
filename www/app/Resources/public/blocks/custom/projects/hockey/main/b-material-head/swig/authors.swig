<div class="b-material-head__authors">
	{{# authors_by_kind}}
		<div class="b-material-head__authors-item">
		{{# link_kind_name}}
			{{link_kind_name}}:
		{{/ link_kind_name}}
		{{# authors_by_kind__authors}}
			<a itemprop="author" href="{{author_uri}}" class="b-link b-link_tag b-material-head__authors-link">
				{{name}}
			</a>
			
			<!-- полномочия -->
			{{# credentials}}
				<span class="b-material-head__authors-credentials">({{credentials}})</span>
			{{/ credentials}}
			<!-- / полномочия -->

			{{^ authors_by_kind__authors__LAST__}},{{/ authors_by_kind__authors__LAST__}}
		{{/ authors_by_kind__authors}}
		</div>
	{{/ authors_by_kind}}
</div>