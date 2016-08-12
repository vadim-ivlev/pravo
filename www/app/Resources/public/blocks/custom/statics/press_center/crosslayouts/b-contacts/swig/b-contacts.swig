<div class="b-contacts__name">{[ data.name ]}</div>

{% for content in data.content %}

	<div class="b-contacts__item">

		<div class="b-contacts__subtitle">{[ content.subtitle ]}</div>

	    <div class="b-contacts__title">{[ content.title|raw ]}</div>

	</div>


{% endfor %}