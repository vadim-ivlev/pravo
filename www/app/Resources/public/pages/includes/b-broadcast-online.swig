{{# online}}
	{{# broadcast__length}}
	<div data-completed="{{broadcast__completed}}" data-id="{{broadcast__id}}" class="b-broadcast-online">
		{{# broadcast}}
		<div class="b-broadcast-online__wrapper">
			
			{{# show_date}}
				<div class="b-broadcast-online__date">{{date}}</div>
			{{/ show_date}}
			
			{{# posts__length}}
				{{# posts}}
				<div class="b-broadcast-online__item">
				
					<div class="b-broadcast-online__info">
						{{# show_time}}
							<div class="b-broadcast-online__time">{{posts__time}}</div>
						{{/ show_time}}
						{{# diary}}
							{{# posts__author}}
								<div class="b-broadcast-online__author">{{posts__author}}</div>
							{{/ posts__author}}
						{{/ diary}}
					</div>
					
					<div class="b-broadcast-online__text {{# posts__event}}b-broadcast-online_text-event{{/ posts__event}} {{# posts__quote}}b-broadcast-online__text-quote{{/ posts__quote}} {{# posts__question}}b-broadcast-online_text-question{{/ posts__question}}">
						
						<div class="b-broadcast-online__{{# posts__question}}question{{/ posts__question}}{{# posts__event}}event{{/ posts__event}}">
							{{& posts__text}}
						</div>
						{{# posts__media__length}}
							{{# posts__media}}
								<div class="b-broadcast-online__media">
									<img class="b-broadcast-online__img" alt="{{# source}}{{source}}{{/ source}}{{^ source}}{{title}}{{/ source}}" title="{{# source}}{{source}}{{/ source}}{{^ source}}{{title}}{{/ source}}" src="{{uri}}">
								</div>
							{{/ posts__media}}
						{{/ posts__media__length}}
						

						{{# posts__answer__length}}
							{{# posts__answer}}
							<div class="b-broadcast-online__answer">
								{{# posts__answer__media__length}}
									{{# posts__answer__media}}
										<div class="b-broadcast-online__media">
											<img class="b-broadcast-online__img" alt="{{# source}}{{source}}{{/ source}}{{^ source}}{{title}}{{/ source}}" title="{{# source}}{{source}}{{/ source}}{{^ source}}{{title}}{{/ source}}" src="{{uri}}">
										</div>
									{{/ posts__answer__media}}
								{{/ posts__answer__media__length}}
								
								{{& posts__answer__text}}
							</div>
							{{/ posts__answer}}	
						{{/ posts__answer__length}}
						
					</div>
					
				</div>
				{{/ posts}}
			{{/ posts__length}}
			
		</div>
		{{/ broadcast}}
	</div>
	{{/ broadcast__length}}
{{/ online}}