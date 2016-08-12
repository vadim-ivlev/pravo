<div class="b-media__body">
    <div class="b-media__title">
		{% if data.title.media.uri %}
			<a class="b-link b-media__link" href="{[ data.title.media.uri ]}">{[ data.title.media.name ]}</a>
		{% else %}
			{[ data.title.media.name ]}
		{% endif %}
    </div>
    <div class="b-media__list">
        <!--#include virtual="{[
            data.includes[0]
        ]}"-->
    </div>
</div>