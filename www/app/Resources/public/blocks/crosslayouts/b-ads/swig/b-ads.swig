{% if data[mod] %}
<div
	class="b-ads__{[ data[mod].type ]} {% if data[mod].type == 'partners' %}b-partners {% if data[mod].mod %}b-partners_{[ data[mod].mod ]}{% endif %}{% endif %}"
	id="ads{[ data[mod].id ]}">
</div>
{% else %}
	<h3>Модификатор не найден</h3>
{% endif %}