<!--noindex-->

{% if mod == 'large' %}

	<div data-ga-event="Incut. Img large" class="ga-element b-read-more b-read-more_230x200 b-read-more_{{text_flow}}">

		<h3 class="b-read-more__name">{{plashka}}</h3>
	  
		<div class="b-read-more__list">
			{{# articles}}
				
				<div class="b-read-more__item">
					
					{{# articles__images_large__length}}
					
						<a href="{{uri}}">
							{{# articles__images_large}}
								{{# articles__images_large__LAST__}}
									<img class="b-read-more__img" src="{{uri}}" width="{{width}}" height="{{height}}" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}" />
								{{/ articles__images_large__LAST__}}
							{{/ articles__images_large}}
						</a>
					
					{{/ articles__images_large__length}}
					
					<div class="b-read-more__title">

						<a class="b-read-more__link b-read-more__link_230x200 b-link" href="{{uri}}">
							{{link_title}}
						</a>

					</div>

				</div> 
				
			{{/ articles}}
		</div>

	</div>

{% elseif mod =='small' %}

	<div data-type="Incut. Img small" class="b-read-more b-read-more_50x50 b-read-more_{{text_flow}}">

		<h3 class="b-read-more__name">{{plashka}}</h3>
	  
		<div class="b-read-more__list">
			{{# articles}}
				
				<div class="b-read-more__item">
					
					{{# articles__images_small__length}}
					
						<a href="{{uri}}">
							{{# articles__images_small}}
								{{# articles__images_small__LAST__}}
									<img class="b-read-more__img" src="{{uri}}" width="{{width}}" height="{{height}}"  alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}} {{/source}}" />
								{{/ articles__images_small__LAST__}}
							{{/ articles__images_small}}
						</a>
					
					{{/ articles__images_small__length}}
					
					<div class="b-read-more__title">

						<a class="b-read-more__link b-link" href="{{uri}}">
							{{link_title}}
						</a>

					</div>
		
				</div>
				
			{{/ articles}}
		</div>

	</div>

{% elseif mod =='width' %}

	<div data-type="Incut. By wide" class="b-read-more b-read-more_wide">
		
		<h3 class="b-read-more__name">{{plashka}}</h3>
	  
		<ul class="b-read-more__list">
			{{# articles}}
			<li class="b-read-more__item">
				<a class="b-read-more__link b-link" href="{{uri}}">{{link_title}}</a>
			</li>
			{{/ articles}}
		</ul>

	</div>

{% endif %}

<!--/noindex-->