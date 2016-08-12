<a class="b-media__list-item" href="{{ uri }}">
	{{# {[ object ]}images_large }}
		{{# {[ object ]}images_large__LAST__ }}
    		<img class="b-media__list-item-image" src="{{ uri }}" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}">
    	{{/ {[ object ]}images_large__LAST__ }}
	{{/ {[ object ]}images_large }}

    <div class="b-media__full b-media-full">
    	{{# {[ object ]}images_large }}
			{{# {[ object ]}images_large__LAST__ }}
				
				<picture>
					<source 
						media="(max-width: 1024px)" 
						srcset="/res/images/pixel_w.gif">

					<img class="b-media-full__image" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}"
						src="{{uri}}" 
						srcset="/res/images/pixel_w.gif 1024w, {{uri}} 1920w"
					>
				</picture>
				
	        	{{/ {[ object ]}images_large__LAST__ }}
		{{/ {[ object ]}images_large }}
        <div class="b-media-full__description">
            <div class="b-media-full__description-icons">
                {{# has_video }}<span class="b-icon b-media__icon-video">видео</span>{{/ has_video }}
                {{# has_photo }}<span class="b-icon b-media__icon-photo">фото</span>{{/ has_photo }}
            </div>
            {{ link_title }}
        </div>
    </div>
</a>