<meta itemprop="description" content="{{meta_description}}" />

<article itemprop="articleBody">
	
	<!-- Если газетный материал - выводим загссылку -->
	{{# subtitle}}
		<div class="b-material-wrapper__subtitle">
			{{{subtitle}}}
		</div>
	{{/ subtitle}}
	
    {[ macro.RGBi(blocks.imgArt) ]}

    <div class="b-material-wrapper__content">

    	<div class="b-social">{[ macro.RGBi(blocks.share) ]}</div>

    	<div class="b-material-wrapper__content-wrapper">
		
			{{{ text }}}
			
			{{# child_links__length}}

			<div class="b-material-wrapper__child">
				{{# child_links}}
						
						<div class="b-material-wrapper__child-wrapper b-material-wrapper__child-{{ link_type }}">
						
							<div class="b-material-head b-material-head_art b-material-head_child">
							
								<div class="b-material-wrapper__name b-material-head__row">
									<h1 class="b-material-head__title">
										{{# title}}
											{{{title}}}
										{{/ title}}
										
										{{^ title}}
											{{{link_title}}}
										{{/ title}}
									</h1>
								</div>
								
								{{# child_links__authors__length}}
								<div class="b-material-head__row">
									<!-- авторы -->
									<div class="b-material-head__authors">
										{{# child_links__authors}}
											<div class="b-material-head__authors-item">
											{{# link_kind_name}}
												{{link_kind_name}}:
											{{/ link_kind_name}}

												<a itemprop="author" href="{{author_uri}}" class="b-link b-link_tag b-material-head__authors-link">
													{{name}}
												</a>
												
												<!-- полномочия -->
												{{# credentials}}
													({{credentials}})
												{{/ credentials}}
												<!-- / полномочия -->

												{{^ child_links__authors__LAST__}},{{/ child_links__authors__LAST__}}
				
											</div>
										{{/ child_links__authors}}
									</div>
									<!-- /авторы -->
								</div>
								{{/ child_links__authors__length}}
								
							</div>
							
							{{{text}}}
						
						</div>
						
				{{/ child_links}}
			</div>	

			{{/ child_links__length}}

		</div>

	</div>

</article>