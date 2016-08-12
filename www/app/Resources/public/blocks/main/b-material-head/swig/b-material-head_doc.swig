<div class="b-material-head__row">
	<!-- дата и время -->
	<div class="b-material-head__date">
		<span class="b-material-head__date-day">{{{readable_release_date}}}</span>
	</div>
	<!-- /дата и время -->
	<!-- привязка к выпуску -->
	<div class="b-material-head__gazeta">
		<!-- газетный выпуск -->
		{{#fascicle_fulltitle}}
		<div class="b-material-head__anchor">
			<a href="{{fascicle_uri}}" class="b-link b-link_tag">{{fascicle_fulltitle}} №{{fascicle_number}} ({{fascicle_number_current}})</a>
		</div>
		{{/fascicle_fulltitle}}
		<!-- /газетный выпуск -->
	</div>
	<!-- /привязка к выпуску -->

	<a class="b-icon b-icon_type_print b-material-head__print" href="#"></a>
</div>
<div class="b-material-head__row">
	<!-- заголовок -->
	<h1 class="b-material-head__title">
		{{#title}}
			{{{title}}}
		{{/title}}
		{{^title}}
			{{{link_title}}}
		{{/title}}
	</h1>
	<!-- /заголовок -->
</div>