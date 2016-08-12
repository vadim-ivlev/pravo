<div data-id="{{art_id}}" class="b-news-rubric__item">
	{{# {[ object ]}images_xlarge__length}}
    <a href="{{uri}}" class="b-news-rubric__item-image-wrapper">
        {{# {[ object ]}images_xlarge}}
            {{# {[ object ]}images_xlarge__LAST__}}

				<picture>
					<source 
						media="(max-width: 768px)" 
						srcset="{{# {[ object ]}images_xlarge}}{{# {[ object ]}images_xlarge__LAST__}}{{uri}}{{/{[ object ]}images_xlarge__LAST__}}{{/{[ object ]}images_xlarge}}">

					<img class="b-news-rubric__item-image" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}"
						src="{{uri}}" 
						srcset="{{# {[ object ]}images_xlarge}}{{# {[ object ]}images_xlarge__LAST__}}{{uri}} 2x{{/{[ object ]}images_xlarge__LAST__}}{{/{[ object ]}images_xlarge}}"
					>
				</picture>
				
            {{/ {[ object ]}images_xlarge__LAST__}}
        {{/ {[ object ]}images_xlarge}}
        <span class="b-news-rubric__item-time"><!--#datetime value="{{datetime}}" --></span>
    </a>
	{{/ {[ object ]}images_xlarge__length}}
    <div class="b-news-rubric__item-description">
        <h2 class="b-news-rubric__item-title">
            <a href="{{uri}}" class="b-link b-link_title">
				{{# title}}
					{{{title}}}
				{{/ title}}
				{{^ title}}
					{{{link_title}}}
				{{/ title}}
			</a>
        </h2>
		
		{{^ duplicate_link_title}}
			{{# uannounce}}
				<p class="b-news-rubric__item-text">
					<a href="{{ uri }}" class="b-link">{{{uannounce}}}</a>
				</p>
			{{/ uannounce}}
		{{/ duplicate_link_title}}
		{{# duplicate_link_title}}
			{{# title}}
				{{^ duplicate_title}}
					<p class="b-news-rubric__item-text">
						<a href="{{ uri }}" class="b-link">{{{link_title}}}</a>
					</p>
				{{/ duplicate_title}}
			{{/ title}}
		{{/ duplicate_link_title}}
		
		{{# {[ object ]}short_section__theme__path__length}}
        <div class="b-news-rubric__item-tags">
            {{# {[ object ]}short_section__theme__path}}
                <a href="{{uri}}" class="b-link b-link_tag">{{title}}</a>{{^ {[ object ]}short_section__theme__path__LAST__}}, {{/ {[ object ]}short_section__theme__path__LAST__}} 
            {{/ {[ object ]}short_section__theme__path}}
        </div>
		{{/ {[ object ]}short_section__theme__path__length}}
    </div>
</div>