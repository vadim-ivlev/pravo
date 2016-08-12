<meta itemprop="description" content="{{meta_description}}" />

<article itemprop="articleBody">
	
	<!-- Если газетный материал - выводим загссылку -->
	{{# subtitle}}
		<h3>{{{subtitle}}}</h3>
	{{/ subtitle}}

	{[ macro.RGBi(blocks.imgArt) ]}

	<div class="text">
      <p>{{{ text }}}</p>
	</div>
	
	{{# child_links__length}}

	<div class="olymp-page-main-content-article-text">
		{{# child_links}}
			{{# link_type_is_comment}}
				<div class="head-ar">
					<h1>
						{{# title}}
							<h1>{{{title}}}</h1>
						{{/ title}}
						
						{{^ title}}
							<h2>{{{link_title}}}</h2>
						{{/ title}}
					</h1>
				</div>
				
				<!-- авторы -->
				{[ macro.RGBi(blocks.authors, parent) ]}
				<!-- /авторы -->
				
				<div class="main-text">{{{text}}}</div>
				
				<div class="clear"></div>
			{{/ link_type_is_comment}}
		{{/ child_links}}
	</div>	

	{{/ child_links__length}}
</article>