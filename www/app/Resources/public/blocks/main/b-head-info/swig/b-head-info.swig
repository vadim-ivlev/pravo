{% for row in data.row %}

<div class="b-head-info__row {[ row.classes ]} group">

    {% if row.title %}
        <h2 class="b__title b-head-info__title">{[ row.title | raw ]}</h2>
    {% endif %}

    {% for col in row.col %}

        <div class="b-head-info__col {[ col.classes ]}">

            {% for content in col.content %}

                    {% if content.text %}

                        <div class="b-head-info__wrapper">

                            {% for text in content.text.list %}
                                <p class="b__text b-head-info__text {[ content.text.classes ]}">{[ text | raw ]}</p>
                            {% endfor %}

                        </div>

                    {% endif %}

                    {% if content.media %}

                        <div class="b-head-info__wrapper">

                            <div class="b-head-info__media">
                                <img src="{[ content.media.img ]}" alt="{[ content.media.title ]}" class="b-head-info__img">
                            </div>

                        </div>

                    {% endif %}

            {% endfor %}

        </div>

    {% endfor %}

</div>

{% endfor %}