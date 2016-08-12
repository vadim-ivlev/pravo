<div data-id="{{art_id}}" class="b-news__list-item 
	{{# {[ object ]}images_xlarge__length}}

		b-news__list-x-lagre
		
	{{/ {[ object ]}images_xlarge__length}}

	{{^ {[ object ]}images_xlarge__length}}
	
		{{^ {[ object ]}images_large__length}}
			{% if showArm %}b-news__list-item_type_armageddon{% endif %} b-news__list-no-lagre
		{{/ {[ object ]}images_large__length}}

		b-news__list-no-x-lagre
		
	{{/ {[ object ]}images_xlarge__length}}

	">

	{{# {[ object ]}images_large__length}}
		<a href="{{ uri }}" class="b-news__list-item-image-wrapper">
			
			{% if mod == 'spiegel' %}
			
				{{# {[ object ]}images_xlarge}}
					{{# {[ object ]}images_xlarge__LAST__}}
					
						<img src="{{uri}}" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}" class="b-news__list-item-image">
						
					{{/ {[ object ]}images_xlarge__LAST__}}
				{{/ {[ object ]}images_xlarge}}
			
			{% else %}
			
				{{# at_first__xlarge_image}}
					{{# {[ object ]}images_xlarge}}
						{{# {[ object ]}images_xlarge__LAST__}}
						
							<img src="{{uri}}" alt="{{# source}}Фото: {{source}}{{/ source}}" title="{{# source}}Фото: {{source}}{{/ source}}" class="b-news__list-item-image">
							
						{{/ {[ object ]}images_xlarge__LAST__}}
					{{/ {[ object ]}images_xlarge}}
				{{/ at_first__xlarge_image}}
				
				{{^ at_first__xlarge_image}}
					{{# {[ object ]}images_large__length}}

							<picture>
								<source
									media="(max-width: 768px)"
									srcset="{{# {[ object ]}images_xlarge}}{{# {[ object ]}images_xlarge__LAST__}}{{uri}}{{/ {[ object ]}images_xlarge__LAST__}}{{/ {[ object ]}images_xlarge}}{{^ {[ object ]}images_xlarge}}/res/images/pixel_w.gif{{/ {[ object ]}images_xlarge}}">

								<img 
									class="b-news__list-item-image" 
									alt="{{# source}}Фото: {{source}}{{/ source}}{{^ source}}{{link_title}}{{/ source}}" 
									title="{{# source}}Фото: {{source}}{{/ source}}{{^ source}}{{link_title}}{{/ source}}"
									src="{{# {[ object ]}images_large}}{{# {[ object ]}images_large__LAST__}}{{uri}}{{/ {[ object ]}images_large__LAST__}}{{/ {[ object ]}images_large}}"
									srcset="{{# {[ object ]}images_xlarge}}{{# {[ object ]}images_xlarge__LAST__}}{{uri}} 2x{{/ {[ object ]}images_xlarge__LAST__}}{{/{[ object ]}images_xlarge}}">
							</picture>

					{{/ {[ object ]}images_large__length}}
				{{/ at_first__xlarge_image}}
			
			{% endif %}
			<div class="b-news__list-item-action">
				{{# has_video }}<span class="b-icon b-news__list-item-icon b-news__list-item-icon_type_play"></span>{{/ has_video }}
				{{# has_photo }}<span class="b-icon b-news__list-item-icon b-news__list-item-icon_type_gallery"></span>{{/ has_photo }}
			</div>
		</a>
	{{/ {[ object ]}images_large__length}}
	
	{{^ {[ object ]}images_large__length}} 
		{% if !hideDate %}
			<span class="b-news__list-item-time">
				<!--#datetime value="{{ datetime }}" -->
				{{dateFormat(datetime)}}
			</span>
		{% endif %}
	{{/ {[ object ]}images_large__length}}
	
	<h2 class="b-news__list-item-title">
		<span class="b-news__list-item-time">
			<!--#datetime value="{{ datetime }}" -->
			{{dateFormat(datetime)}}
		</span>
		<a href="{{ uri }}" class="b-link b-link_title">
			{{{link_title}}}
		</a>
	</h2>
	
	{% if showBlocks.persons %}
	
		{{#{[ object ]}persons__length}}
			<div class="b-news__list-item-tags">
				{{#{[ object ]}persons}}
					Персона: 
					<a class="b-link b-link_tag" href="/interviews/{{interviewee_id}}.html">{{name}}</a>
				{{/{[ object ]}persons}}
			</div>
		{{/{[ object ]}persons__length}}
	
	{% endif %}
	
</div>