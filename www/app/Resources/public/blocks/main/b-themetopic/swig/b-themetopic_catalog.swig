<div class="b-themetopic__head">
	{% if data.link %}<a href="{[ data.link ]}">{% endif %}
	{[ data.title ]}
	{% if data.link %}</a>{% endif %}
</div>

<div class="b-themetopic__list">
	{{# block__themetopic}}
	<div class="b-themetopic__item">
		<div class="b-themetopic__item__title">
			<a class="b-link" href="{{uri}}">{{title}}</a>
		</div>

		{{# block__themetopic__images_medium__length}}
		<div class="b-themetopic__item__image">
			<a class="b-link" href="{{uri}}">
				{{# block__themetopic__images_medium}}
					<img class="b-themetopic__item__image__src" alt="{{source}}" title="{{source}}" src="{{uri}}">
				{{/ block__themetopic__images_medium}}
			</a>
		</div>
		{{/ block__themetopic__images_medium__length}}

	</div>
	{{/ block__themetopic}}
</div>