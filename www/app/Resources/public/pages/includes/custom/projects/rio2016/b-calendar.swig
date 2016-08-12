<div class="b-calendar__body">
	<div class="b-calendar__name">Календарь соревнований</div>
	<div id="ui-datepicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">

		<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
			<div class="ui-datepicker-title">
				<span class="ui-datepicker-month">Август</span>&nbsp;<span class="ui-datepicker-year">2016</span>
			</div>
		</div>

		<div class="b-calendar__grid">
			<div class="b-calendar__grid__head">
				<div class="b-calendar__grid__day">Пн</div>
				<div class="b-calendar__grid__day">Вт</div>
				<div class="b-calendar__grid__day">Ср</div>
				<div class="b-calendar__grid__day">Чт</div>
				<div class="b-calendar__grid__day">Пт</div>
				<div class="b-calendar__grid__day">Сб</div>
				<div class="b-calendar__grid__day">Вс</div>
			</div>
			<div class="b-calendar__grid__month">
				{{#dateLinks}}
					<div class="b-calendar__grid__day b-calendar__grid__month__day {{#today}}today{{/today}}">
						{{#uri}}
				          <a href="{{uri}}" class="b-calendar__date_link">{{day}}</a>
				        {{/uri}}
				        {{^uri}}
				          <span class="ui-priority-secondary">{{day}}</span>
				        {{/uri}}
					</div>
				{{/dateLinks}}
			</div>
		</div>

	</div>
</div>