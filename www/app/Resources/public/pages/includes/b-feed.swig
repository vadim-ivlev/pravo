<div data-id="{{art_id}}" class="b-feed__item {% if mod %}b-feed__{[ mod ]}{% endif %} {{# spiegel}}b-feed__spiegel{{/ spiegel}}">

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
	
	{% if !hideDate %}
		{{# datetime}}
		<span class="b-feed__date _date">
			<!--#datetime value="{{datetime}}" -->
			{{dateFormat(datetime)}}
		</span>
		{{/ datetime}}
	{% endif %}
	
    <a class="b-link b-link_title" href="{{uri}}">
        {{# link_title}}
			{{{link_title}}}
        {{/link_title}}
        {{^ link_title}}
            {{{title}}}
        {{/link_title}}
    </a>
	
	{% if showBlocks.tags %}
			
		{{# {[ object ]}short_section__theme__path__length}}
		<div class="b-feed__list-item-tags">
			{{# {[ object ]}short_section__theme__path}}
				<a href="{{uri}}" class="b-link b-link_tag">{{title}}</a>{{^ {[ object ]}short_section__theme__path__LAST__}}, {{/ {[ object ]}short_section__theme__path__LAST__}}
			{{/ {[ object ]}short_section__theme__path}}
		</div>
		{{/ {[ object ]}short_section__theme__path__length}}
		
	
		{{# {[ object ]}stories__length}}
		<div class="b-feed__list-item-tags">
			{{# fascicles__broadsides__sections__latest_objects__stories}}
			<a href="/sujet/{{coll_id}}/index.html" class="b-link b-link_tag">{{{title}}}</a>
			{{/ fascicles__broadsides__sections__latest_objects__stories}}
		</div>
		{{/ {[ object ]}stories__length}}
	
	{% endif %}
	
</div>