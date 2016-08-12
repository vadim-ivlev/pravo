<div class="b-list-head__body">
	<div class="b-author {{#author__images__length}}b-author_has-media{{/author__images__length}}">
		
		{{#author__images__length}}
		<!-- изображение -->
		<div class="b-list-head__row b-author__media">
			{{#author__images}}
				{{#author__images__FIRST__}}
					<img src="{{uri}}" class="b-author__img">
				{{/author__images__FIRST__}}
			{{/author__images}}
		</div>
		<!-- /изображение -->
		{{/author__images__length}}
		
		<div class="b-list-head__row b-author__content">

			<!-- заголовок -->
			<h1 class="b-list-head__title b-author__title">
				{{author__name}}
			</h1>
			<!-- /заголовок -->

			<!-- информация об авторе -->
			<div class="b-author__info">
				
				<div class="b-author__binding">

					<!-- электронная почта -->
					{{# author__email}}
						<div class="b-author__binding-item">
							E-mail: <a class="b-link b-link_blue" target="_blank" rel="nofollow" href="mailto:{{author__email}}">{{author__email}}</a>
						</div>
					{{/ author__email}}
					<!-- / электронная почта -->
					
					<!-- сайт -->
					{{# author__ext_uri}}
						<div class="b-author__binding-item">
							Сайт: <a class="b-link b-link_blue" target="_blank" rel="nofollow" href="{{author__ext_uri}}">{{author__ext_uri}}</a>
						</div>
					{{/ author__ext_uri}}
					<!-- / сайт -->
					
					<!-- блог -->
					{{# author__blog_uri}}
						<div class="b-author__binding-item">
							Блог: <a class="b-link b-link_blue" target="_blank" rel="nofollow" href="{{author__blog_uri}}">{{author__blog_uri}}</a>
						</div>
					{{/ author__blog_uri}}
					<!-- / блог -->
					
				</div>
				
				<div class="b-author__text">
					{{#author__text}}
						{{{author__text}}}
					{{/author__text}}
				</div>
			</div>
			<!-- /информация об авторе -->
			
		</div>
		
	</div>
</div>