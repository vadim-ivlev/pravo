{{# online}}
	{{# broadcast}}
	<div class="b-diary__body">
		<a href="{{uri}}">
		{{# posts}}
			{{# posts__FIRST__}}
				<span class="b-diary__date">
					{{posts__date}}
				</span>   
				<span class="b-diary__text">
					{{posts__text}}
				</span>         
			{{/ posts__FIRST__}}
		{{/ posts}}

		<span class="b-diary__author">
			<span class="b-diary__photo">
				<img src="{{#media}}{{uri}}{{/media}}" alt="">
			</span>
			<span class="b-diary__author-name">
				{{diary_author}}
				<span>{{name}}</span>
			</span>
		</span> 
		</a>
	</div>
	{{/ broadcast}}
{{/ online}}