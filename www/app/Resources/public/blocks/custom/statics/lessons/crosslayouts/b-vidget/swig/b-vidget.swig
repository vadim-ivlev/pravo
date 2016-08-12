{% for item in data.item %}

    <div class="b-vidget__item {[ item.mod ]}">

        <a href="{[ item.url ]}" target="_blank" class="b-link">

            {% if item.title %}

                <div class="b__title">{[ item.title|raw ]}</div>

            {% endif %}

            {% if item.subTitle %}

                <div class="b__subtitle">{[ item.subTitle ]}</div>

            {% endif %}

            {% if item.button %}

                <div class="b__text">{[ item.button ]}</div>

            {% endif %}

        </a>

    </div>

{% endfor %}

