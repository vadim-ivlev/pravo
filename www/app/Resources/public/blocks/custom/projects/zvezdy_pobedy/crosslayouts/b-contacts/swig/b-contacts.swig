<h2 class="b-contacts__name">
    {[ data.name ]}
</h2>

{% for links in data.links %}
<div class="b-contacts__link">
    <a href="{[ links.url ]}" target="_blank" class="b-link b-link_blue">{[ links.title ]}</a>
</div>
{% endfor %}