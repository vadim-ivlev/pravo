{% if data[mod] %}

	<rg-adfox
		uri="
			{% if data[mod].uri %}
				{[ data[mod].uri ]}
			{% else %}
				//ads.adfox.ru/5906/prepareCode?{% if data[mod].pp %}pp={[ data[mod].pp ]}&amp;{% endif %}{% if data[mod].p1 %}p1={[ data[mod].p1 ]}&amp;{% endif %}ps=cior&amp;p2={[ data[mod].p2 | default('fjgg') ]}&amp;pct=a&amp;plp=a&amp;pli=a&amp;pop=a
			{% endif %}
		"
		{% if data[mod].screenType %}
			screentype="{[ data[mod].screenType ]}"
		{% endif %}
		{% if data[mod].appear %}
			appear="{[ data[mod].appear ]}"
		{% endif %}
		>
	</rg-adfox>

{% endif %}