{% if data.adress %}

    <div class="{[ data.adress.classes ]}">
        
        {% for col in data.adress.col %}

            <div class="{[ col.classes ]}">
                
                {% if col.name %}
                    <div class="b__name b__name_accent">{[ col.name ]}</div>
                {% endif %}

                {% if col.media %}
                    <div class="b__media">
                        <img class="b__img" src="{[ col.media.img.src ]}">
                    </div>
                {% endif %}

                {% if col.text %}
                    <div class="b__text">
                        {% for item in col.text %}
                            <p class="b-p">{[ item | raw ]}</p>
                        {% endfor %}
                    </div>
                {% endif %}

            </div>

        {% endfor %}

    </div>

{% endif %}