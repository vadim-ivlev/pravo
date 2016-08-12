{% if mod == 'doc' %}

	<div data-id="{{obj_id}}" class="b-news-inner__list-item b-news-inner__list-item_doc">
		{% if !hideDate %}
			<div class="b-news-inner__list-item-date _date">
				<!--#datetime value="{{datetime}}" -->
				{{dateFormat(datetime)}}
			</div>
		{% endif %}
		
		<div class="b-news-inner__list-item-wrapper">
			<h2 class="b-news-inner__list-item-title">
				<a href="{{uri}}" class="b-link b-link_title">{{{title}}}</a>
			</h2>
		</div>
	</div>

{% else %}

	<div data-id="{{art_id}}" class="b-news-inner__list-item {{# spiegel}}{{^ {[ object ]}images_medium__length}}b-news-inner__list-item_type_important{{/ {[ object ]}images_medium__length}}{{/ spiegel}}">
		
		{% if !hideDate %}
			<div class="b-news-inner__list-item-date _date">
				<!--#datetime value="{{datetime}}" -->
				{{dateFormat(datetime)}}
			</div>
		{% endif %}
		
		{{# {[ object ]}images_medium__length}}
			<div class="b-news-inner__list-item-image-wrapper">
				<a href="{{uri}}">
				{{# {[ object ]}images_medium}}
					{{# {[ object ]}images_medium__LAST__}}
									
						<picture>
							<source 
								media="(max-width: 768px)" 
								srcset="/res/images/pixel_w.gif">

							<img class="b-news-inner__list-item-image" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}"
								src="{{uri}}" 
								srcset="/res/images/pixel_w.gif 768w, {{uri}} 1920w"
							>
						</picture>
						
					{{/ {[ object ]}images_medium__LAST__}}
				{{/ {[ object ]}images_medium}}
				</a>
				{{# add_fascicles}}
					{{# {[ object ]}fascicles__length}}
						{{# {[ object ]}fascicles}}
							{{# {[ object ]}fascicles__FIRST__}}
							<div class="b-news-inner__list-item-edition b-news-inner__list-item-edition_type_image">
								<a href="{{uri}}" class="b-link b-link_tag">{{fascicle_fulltitle}} #{{fascicle_number}}</a>
							</div>
							{{/ {[ object ]}fascicles__FIRST__}}
						{{/ {[ object ]}fascicles}}
					{{/ {[ object ]}fascicles__length}}
				{{/ add_fascicles}}
			</div>
		{{/ {[ object ]}images_medium__length}}

		<div class="b-news-inner__list-item-wrapper">
			<h2 class="b-news-inner__list-item-title">
				<a class="b-link b-link_title" href="{{uri}}">
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
					<p class="b-news-inner__list-item-text">
						<a href="{{uri}}">{{{uannounce}}}</a>
					</p>
				{{/ uannounce}}
			{{/ duplicate_link_title}}
			{{# duplicate_link_title}}
				{{# title}}
					{{^ duplicate_title}}
						<p class="b-news-inner__list-item-text">
							<a href="{{ uri }}" class="b-link">{{{link_title}}}</a>
						</p>
					{{/ duplicate_title}}
				{{/ title}}
			{{/ duplicate_link_title}}
			
			{% if showBlocks.theme %}
			
				{{# {[ object ]}short_section__theme__path__length}}
				<div class="b-news-inner__list-item-tags">
					{{# {[ object ]}short_section__theme__path}}
						<a href="{{uri}}" class="b-link b-link_tag">{{title}}</a>{{^ {[ object ]}short_section__theme__path__LAST__}}, {{/ {[ object ]}short_section__theme__path__LAST__}}
					{{/ {[ object ]}short_section__theme__path}}
				</div>
				{{/ {[ object ]}short_section__theme__path__length}}
				
			{% endif %}
			
			{% if showBlocks.stories %}
			
				{{# {[ object ]}stories__length}}
				<div class="b-news-inner__list-item-tags">
					{{# fascicles__broadsides__sections__latest_objects__stories}}
					<a href="/sujet/{{coll_id}}/index.html" class="b-link b-link_tag">{{{title}}}</a>
					{{/ fascicles__broadsides__sections__latest_objects__stories}}
				</div>
				{{/ {[ object ]}stories__length}}
			
			{% endif %}
			
			{% if showBlocks.fascicles %}
			
				{{# add_fascicles}}
					{{# {[ object ]}fascicles__length}}
						{{# {[ object ]}fascicles}}
							{{# {[ object ]}fascicles__FIRST__}}
							<div class="b-news-inner__list-item-edition">
								<a href="{{uri}}" class="b-link b-link_tag">{{fascicle_fulltitle}} #{{fascicle_number}}</a>
							</div>
							{{/ {[ object ]}fascicles__FIRST__}}
						{{/ {[ object ]}fascicles}}
					{{/ {[ object ]}fascicles__length}}
				{{/ add_fascicles}}
			
			{% endif %}
			
		</div>
		
	</div>

{% endif %}