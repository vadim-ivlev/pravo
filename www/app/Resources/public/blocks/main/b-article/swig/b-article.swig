{% if (data[mod]) %}
    <h1 class="b-article__title">{[ data[mod].title | safe ]}</h1>
    {[ data[mod].image | safe]}
    {[  data[mod].text | safe ]}
{% endif %}