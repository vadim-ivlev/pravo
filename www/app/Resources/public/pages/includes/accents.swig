{{# blocks__length}}
<div class="b-accents_wrapper">
	
	{{# blocks}}
	
		{{# header__length}}
		<div class="b-accents__name">
			{{# header}}
				{{# uri}}
					<a href="{{uri}}" class="b-accents__link b-link">
						{{{title}}}
					</a>
				{{/ uri}}
				{{^ uri}}
					{{{title}}}
				{{/ uri}}
			{{/ header}}
		</div>
		{{/ header__length}}

		<div class="b-accents__list">
			
			{{# broadcast__length}}
				{{# broadcast}}
				
				<div data-pos="{{broadcast__pos}}" class="b-accents__item b-broadcast b-broadcast_{{broadcast__type}}">
					
					<div class="b-broadcast__row">
						{{# broadcast__date}}
							<div class="b-broadcast__date">
								{{broadcast__date}}
							</div>
						{{/ broadcast__date}}
					</div>
					
					<div class="b-broadcast__row">
						
						{{# broadcast__item}}
						<div class="b-broadcast__item">
							
							<div class="b-broadcast__title"><a href="{{broadcast__uri}}">{{broadcast__title}}</a></div>
							
							{{# broadcast__media__length}}
								<div class="b-broadcast__media">
									{{# broadcast__media}}
										<img alt="{{title}}" src="{{uri}}" class="b-broadcast__img">
									{{/ broadcast__media}}
								</div>
							{{/ broadcast__media__length}}
							
							{{# broadcast__begin}}
								{{# broadcast__show__score}}
									<div class="b-broadcast__score">{{broadcast__score}}</div>
								{{/ broadcast__show__score}}
							{{/ broadcast__begin}}
							
						</div>
						{{/ broadcast__item}}					
					</div>
					
					{{# broadcast__info}}
					<div class="b-broadcast__row">
						
						<div class="b-broadcast__info">
							<a href="{{broadcast__uri}}">
								{{broadcast__info}}
							</a>
						</div>
						
					</div>
					{{/ broadcast__info}}
		
				</div>
				
				{{/ broadcast}}
			{{/ broadcast__length}}
			
			
			{{# accents__length}}
				{{# accents}}
				<div data-pos="{{broadcast__pos}}" class="b-accents__item {{# accents__type}}b-accents__item_{{accents__type}}{{/ accents__type}}">

					{{# accents__custom__length}}
						{{# accents__custom}}
						<div class="b-feed-accents__item">
							{{# accents__media__length}}
							
								{{# accents__subtitle}}
								<div class="b-feed-accents__media">
									{{# uri}}
									<a href="{{uri}}" class="b-feed-accents__link b-link">
										{{# accents__media}}
											<img src="{{uri}}" alt="{{accents__title}}" title="{{accents__title}}" class="b-feed-accents__img">
										{{/ accents__media}}
									</a>
									{{/ uri}}
									{{^ uri}}
										{{# accents__media}}
											<img src="{{uri}}" alt="{{accents__title}}" title="{{accents__title}}" class="b-feed-accents__img">
										{{/ accents__media}}
									{{/ uri}}
								</div>
								{{/ accents__subtitle}}
								
								{{^ accents__subtitle}}
								<div class="b-feed-accents__media">
									{{# accents__uri}}
									<a href="{{accents__uri}}" class="b-feed-accents__link b-link">
										{{# accents__media}}
											<img src="{{uri}}" alt="{{accents__title}}" title="{{accents__title}}" class="b-feed-accents__img">
										{{/ accents__media}}
									</a>
									{{/ accents__uri}}
									{{^ accents__uri}}
										{{# accents__media}}
											<img src="{{uri}}" alt="{{accents__title}}" title="{{accents__title}}" class="b-feed-accents__img">
										{{/ accents__media}}
									{{/ accents__uri}}
								</div>
								{{/ accents__subtitle}}
								
							{{/ accents__media__length}}

							{{# accents__date}}
								<div class="b-feed-accents__date">
									{{accents__date}}
								</div>
							{{/ accents__date}}

							{{# accents__subtitle__length}}
							<div class="b-feed-accents__subtitle">
								{{# accents__subtitle}}
								<a href="{{uri}}" class="b-feed-accents__link b-link">
									{{{title}}}
								</a>
								{{/ accents__subtitle}}
							</div>
							{{/ accents__subtitle__length}}
							
						</div>

						{{# accents__title}}
						<div class="b-accents__title">
							<a href="{{accents__uri}}" class="b-accents__link b-link">
								{{{accents__title}}}
							</a>
						</div>
						{{/ accents__title}}
						
						{{/ accents__custom}}
					{{/ accents__custom__length}}


					{{# accents__include__length}}

						{{# accents__include}}

							{{# id}}
								<!--#include virtual="/include/tmpl-b-feed-accents/{{type}}-{{id}}/{{# mod}}{{mod}}/{{/ mod}}num-1/"-->
							{{/ id}}

							{{# accents__title}}
								<div class="b-accents__title">
									{{# accents__uri}}
										<a href="{{accents__uri}}" class="b-accents__link b-link">
											{{{accents__title}}}
										</a>
									{{/ accents__uri}}
									{{^ accents__uri}}
										{{{accents__title}}}
									{{/ accents__uri}}
								</div>
							{{/ accents__title}}

						{{/ accents__include}}
					{{/ accents__include__length}}


					{{# accents__html__length}}
						{{# accents__html}}
							{{{html}}}
						{{/ accents__html}}
					{{/ accents__html__length}}
					
				</div>
				{{/ accents}}
			{{/ accents__length}}
				
		</div>
	
	{{/ blocks}}
	
</div>
{{/ blocks__length}}