<div class="b-team-standings__body">
	<div class="b-team-standings__name">Командный зачет</div>
	<table class="b-team-standings__table">
		<tr>
			<th>№</th>
			<th>Страна</th>
			<th><div class="b-team-standings__medal gold"></div></th>
			<th><div class="b-team-standings__medal silver"></div></th>
			<th><div class="b-team-standings__medal bronze"></div></th>
			<th><div class="b-team-standings__medal overall"></div></th>
		</tr>
		{{#countries}}
		<tr {{#is_russia}}class="is_russia"{{/is_russia}}>
			<td>{{position}}</td>
			<td>{{countryName}}</td>
			<td>{{gold}}</td>
			<td>{{silver}}</td>
			<td>{{bronze}}</td>
			<td>{{overall}}</td>
		</tr>
		{{/countries}}
	</table>
</div>