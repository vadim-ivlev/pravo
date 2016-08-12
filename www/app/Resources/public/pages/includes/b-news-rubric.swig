<div data-id="{{art_id}}" class="b-news-rubric__list-item {{# {[ object ]}LAST__}} is-tablet{{/ {[ object ]}LAST__}}">
    <div class="b-news-rubric__list-item-time"><!--#datetime value="{{datetime}}" --></div>
	{{# {[ object ]}images_small__length}}
	<a href="{{uri}}">
    {{# {[ object ]}images_small}}
        {{# {[ object ]}images_small__LAST__}}

			<picture>
				<source 
					media="(max-width: 768px)" 
					srcset="/res/images/pixel_w.gif">

				<img class="b-news-rubric__list-item-image" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}"
					src="{{uri}}" 
					srcset="/res/images/pixel_w.gif 768w, {{uri}} 1920w"
				>
			</picture>
			
        {{/ {[ object ]}images_small__LAST__}}
    {{/ {[ object ]}images_small}}
	</a>
	{{/ {[ object ]}images_small__length}}
    <a class="b-news-rubric__list-item-link" href="{{uri}}">{{link_title}}</a>
</div>