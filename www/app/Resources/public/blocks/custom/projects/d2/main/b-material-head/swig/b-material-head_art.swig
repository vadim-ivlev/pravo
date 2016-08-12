<!-- заголовок -->
<h2 itemprop="headline">
	{{# title}}
		{{{title}}}
	{{/ title}}
	{{^ title}}
		{{{link_title}}}
	{{/ title}}
</h2>
<!-- /заголовок -->

<div>
 	<!-- Мета -->
	<i class="section-article-infoMeta">

		{{date_or_time}}, {{datetime__hours}}:{{datetime__minutes}}
		<meta itemprop="datePublished" content="{{datetime__iso8601__ext}}" />

		<!-- авторы -->
		{{# authors_by_kind__length}}
			{{# authors_by_kind}}
				{{# link_kind_name}}
					{{link_kind_name}}:
				{{/ link_kind_name}}
				{{# authors_by_kind__authors}}
					<a itemprop="author" href="{{author_uri}}">
						{{name}}
					</a>
					
					<!-- полномочия -->
					{{# credentials}}
						({{credentials}})
					{{/ credentials}}
					<!-- / полномочия -->

					{{^ authors_by_kind__authors__LAST__}},{{/ authors_by_kind__authors__LAST__}}
				{{/ authors_by_kind__authors}}
			{{/ authors_by_kind}}
		{{/ authors_by_kind__length}}
		<!-- /авторы -->

	</i>
	<!-- /Мета -->

	<div class="social">
		{[ macro.RGBi(blocks.share) ]}
	</div>

</div>