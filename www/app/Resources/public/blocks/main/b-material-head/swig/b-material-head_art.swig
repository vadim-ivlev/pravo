<div class="b-material-head__row">
	<!-- дата и время -->
	<div class="b-material-head__date">
		<span class="b-material-head__date-day">{{date_or_time}}</span>
		<span class="b-material-head__date-time">{{datetime__hours}}:{{datetime__minutes}}</span>
		<meta itemprop="datePublished" content="{{datetime__iso8601__ext}}" />
	</div>
	<!-- /дата и время -->

	<!-- рубрика -->
	{{# main_tema}}
	<div class="b-material-head__rubric">
		Рубрика: <a itemprop="articleSection" class="b-link b-material-head__rubric-name" href="{{main_tema__uri}}">{{main_tema__title}}</a>
		<meta itemprop="genre" content="{{main_tema__title}}" />
	</div>
	{{/ main_tema}}
	<!-- /рубрика -->

	<!-- проект -->
	{{# main_project}}
	<div class="b-material-head__rubric">
		Проект: <a class="b-link b-material-head__rubric-name" href="{{main_project__uri}}">{{main_project__title}}</a>
	</div>
	{{/ main_project}}
	<!-- /проект -->

	<a class="b-icon b-icon_type_print b-material-head__print" href="#"></a>
</div>

<div class="b-material-head__row">
	<!-- заголовок -->
	<h1 itemprop="headline" class="b-material-head__title">
		{{# title}}
			{{{title}}}
		{{/ title}}
		{{^ title}}
			{{{link_title}}}
		{{/ title}}
	</h1>
	<!-- /заголовок -->
</div>

<div class="b-material-head__row">

	<!-- авторы -->
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
	<!-- /авторы -->

	<!-- газетный выпуск -->
	{{# fascicle_fulltitle}}
	<div class="b-material-head__anchor">
		<a href="{{fascicle_uri}}" class="b-link b-link_tag">{{fascicle_fulltitle}} №{{fascicle_number}} ({{fascicle_number_current}})</a>
	</div>
	{{/ fascicle_fulltitle}}
	<!-- /газетный выпуск -->

</div>