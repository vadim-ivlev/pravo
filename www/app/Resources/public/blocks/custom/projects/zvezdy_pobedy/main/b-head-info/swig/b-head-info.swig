{% for row in data.headInfo.row %}

    <div class="b-head-info__row group">

        {% for col in row.col %}

            <div class="b-head-info__col group">

                {% if col.img %}

                    <div class="b-head-info__wrapper group">

                        {% for img in col.img %}

                            <div class="b-head-info__media">

                                {% if img.link %}

                                    <a href="{[ img.link ]}" target="_blank" class="b-lin"><img src="{[ img.url ]}" alt="" class="b-head-info__img"></a>

                                {% else %}

                                    <img src="{[ img.url ]}" alt="" class="b-head-info__img">

                                {% endif %}


                            </div>

                        {% endfor %}

                    </div>

                {% endif %}

                {% if col.text %}

                    <div class="b-head-info__wrapper group">

                        {% for text in col.text %}

                            <div class="b-head-info__text">{[ text|raw ]}</div>

                        {% endfor %}

                    </div>

                {% endif %}

                {% if col.code %}

                        {[ col.code|raw ]}

                {% endif %}

            </div>

        {% endfor %}

    </div>

{% endfor %}
