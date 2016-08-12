<div class="b-material-related__body">

	{% if data.material.blocks %}
		
		{% for blocks in data.material.blocks %}
		
			{{# include_related_by_{[ blocks.uri ]}}}
				<div class="b-material-related__item">
					<b class="b-material-related__name">{[ blocks.title ]}</b>
					{{# include_related_by_{[ blocks.uri ]}__path}}
						<a class="b-link" href="{{uri}}">{{title}}</a>
					{{/ include_related_by_{[ blocks.uri ]}__path}}
				</div>
			{{/ include_related_by_{[ blocks.uri ]}}}
		
		{% endfor %}
		
	{% endif %}
	
</div>