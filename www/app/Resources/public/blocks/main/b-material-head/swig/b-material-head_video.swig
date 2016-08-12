<div class="b-material-head__row">
	<!-- дата и время -->
	<div class="b-material-head__date">
		<span class="b-material-head__datetime">{{datetime__readable}}</span>
	</div>
	<!-- /дата и время -->
</div>
<div class="b-material-head__row">
	<!-- заголовок -->
	<h1 class="b-material-head__title">
		{{# title}}
			{{{title}}}
		{{/ title}}
	</h1>
	<!-- /заголовок -->
</div>
<div class="b-material-head__row">
	<!-- авторы -->
		<div class="b-material-head__authors">
		 {{# authors__length}}
			 Автор:
			 {{# authors}}
				<a href="{{author_uri}}" class="b-link b-link_tag b-material-head__authors-link">
					{{name}}
					{{# credentials}}
						<span class="b-material-head__authors-credentials">({{credentials}})</span>
					{{/ credentials}}
				</a>
			{{/ authors}}
		 {{/ authors__length}}
		 {{^ authors__length}}
			 {{# custom_author}}
				 Автор: {{{custom_author}}}
			 {{/ custom_author}}
		 {{/ authors__length}}
		</div>
	<!-- /авторы -->
</div>