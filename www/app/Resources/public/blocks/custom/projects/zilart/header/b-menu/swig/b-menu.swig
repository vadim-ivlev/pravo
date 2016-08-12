<div class="b-menu__body">

	<div class="b-menu__nav-icon" title="Меню">
		<div class="b-menu__nav-icon-line"></div> 
		<div class="b-menu__nav-icon-line"></div> 
		<div class="b-menu__nav-icon-line"></div>
	</div>
	
	<div class="b-menu__list">
		{% for item in data.list %}
		<div class="b-menu__item">
			<a href="{[ item.url ]}" class="b-link">{[ item.title ]}</a>
		</div>
		{% endfor %}
	</div>
</div>