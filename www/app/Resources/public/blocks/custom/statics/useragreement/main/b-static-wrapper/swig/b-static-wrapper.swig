
<h2 class="b__title">{[ data.title|raw ]}</h2>

{% for text in data.text %}
    <p class="b__text">{[ text|raw ]}</p>
{% endfor %}
<div class="b__wrapper">

    {% for content in data.content %}

        <h3 class="b__title">{[ content.title|raw ]}</h3>

        {% for text in content.text %}
            <p class="b__text">{[ text|raw ]}</p>
        {% endfor %}

    {% endfor %}

</div>


