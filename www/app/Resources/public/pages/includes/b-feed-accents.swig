<div class="b-feed-accents__item">

    {{# at_first__small_image}}
        {{# {[ object ]}images_small__length}}
            <div class="b-feed-accents__media">
                <a href="{{uri}}">
                {{# {[ object ]}images_small}}
                    {{# {[ object ]}images_small__LAST__}}

                        <img class="b-feed-accents__img" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}"
                             src="{{uri}}">

                    {{/ {[ object ]}images_small__LAST__}}
                {{/ {[ object ]}images_small}}
                </a>
            </div>
        {{/ {[ object ]}images_small__length}}
    {{/ at_first__small_image}}
	
	{{# at_first__large_image}}
        {{# {[ object ]}images_large__length}}
            <div class="b-feed-accents__media">
                <a href="{{uri}}">
                {{# {[ object ]}images_large}}
                    {{# {[ object ]}images_large__LAST__}}

                        <img class="b-feed-accents__img" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}"
                             src="{{uri}}">

                    {{/ {[ object ]}images_large__LAST__}}
                {{/ {[ object ]}images_large}}
                </a>
            </div>
        {{/ {[ object ]}images_large__length}}
    {{/ at_first__large_image}}
	
	
	{{# datetime}}
		<div class="b-feed-accents__date">
			<!--#datetime value="{{datetime}}" -->
		</div>
	{{/ datetime}}
	
	<div class="b-feed-accents__subtitle">
		<a href="{{uri}}" class="b-feed-accents__link b-link">
			{{# link_title}}
			 {{{link_title}}}
			{{/link_title}}
			{{^ link_title}}
				{{{title}}}
			{{/link_title}}
		</a>
	</div>
		
</div>