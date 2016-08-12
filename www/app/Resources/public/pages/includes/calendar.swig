<div id="ui-datepicker-div" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all">

	<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">
        {{# calendar__prev_month_uri}}
		<a class="ui-datepicker-prev ui-corner-all" href="{{calendar__prev_month_uri}}" title="Пред.">
			<span class="ui-icon ui-icon-circle-triangle-w">Пред.</span>
		</a>
        {{/ calendar__prev_month_uri}}
        {{# calendar__next_month_uri}}
		<a class="ui-datepicker-next ui-corner-all" href="{{calendar__next_month_uri}}" title="След.">
			<span class="ui-icon ui-icon-circle-triangle-e">След.</span>
		</a>
        {{/ calendar__next_month_uri}}
		<div class="ui-datepicker-title">
			<span class="ui-datepicker-month">{{calendar__month}}</span>&nbsp;<span class="ui-datepicker-year">{{calendar__year}}</span>
		</div>
	</div>

	<table class="ui-datepicker-calendar">
		
		<!-- Дни недели -->
		<tr>
            {{# calendar__calendar__weekdays}}
			<th>
				<span title="{{day}}">{{day}}</span>
			</th>
            {{/ calendar__calendar__weekdays}}
		</tr>
		<!-- /Дни недели -->

		<!-- Даты -->
        {{# calendar__calendar__weeks}}
		<tr>
            {{# calendar__calendar__weeks__days}}
			<td>
                {{# uri}}
				    <a href="{{uri}}">{{day}}</a>
                {{/ uri}}
                {{^ uri}}
                    <span class="ui-priority-secondary">{{day}}</span>
                {{/ uri}}
			</td>
            {{/ calendar__calendar__weeks__days}}
		</tr>
        {{/ calendar__calendar__weeks}}
		<!-- /Даты -->
	</table>

</div>