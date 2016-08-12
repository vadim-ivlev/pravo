<div class="b-feed__body">
	{% for blocks in data.blocks %}

		{{# {[ blocks.object ]}__length}}

			<h2 class="b-feed__name">
				{[ blocks.title ]}
			</h2>
			
			<div class="b-feed__list _hide_date">
				<div class="b-feed__col">
				{{# {[ blocks.object ]}}}
					<div class="b-feed__item">
						<a class="b-link b-link_title" href="{{uri}}">
							{{# ltitle}}
								{{{ltitle}}}
							{{/ ltitle}}
							
							{{^ ltitle}}
								{{# link_title}}
									{{{link_title}}}
								{{/ link_title}}
								
								{{^ link_title}}
									{{{title}}}
								{{/ link_title}}
							{{/ ltitle}}
						</a>
					</div>
				{{/ {[ blocks.object ]}}}
				</div>
			</div>
			
		{{/ {[ blocks.object ]}__length}}

	{% endfor %}
</div>