<div class="b__title b__title_shifter">
    {[ macro.RGBi(blocks.headerPromo, parent) ]}
</div>

{% for item in data.items %}

    {% if item.extraTitle %}

        <div class="b__title b__title_extra">

            {[ item.extraTitle ]}

        </div>

    {% endif %}

    <div class="b__item group">

        <div class="b__media">

            <img src="{[ item.img.url ]}" alt="{[ item.img.alt ]}" class="b__img">

        </div>

        <div class="b__wrapper">

            <div class="b__title">

                {[ item.title|raw ]}

            </div>

            {% for text in item.text %}

                <div class="b__text">

                    {[ text|raw ]}

                </div>

            {% endfor %}

            {% if item.links %}

                {% for link in item.links %}

                    <a href="{[ link.url ]}" class="b-link b-link_inner b-link_blue">{[ link.title ]}</a>

                {% endfor %}

            {% endif %}

            {% if item.btn %}

                {% for btn in item.btn %}

                    <a href="{[ btn.url ]}" class="b-link-btn b-link-btn_accent">{[ btn.title ]}</a>

                {% endfor %}

            {% endif %}

        </div>

    </div>

{% endfor %}

{% for extraItems in data.extraItems %}

    <div class="b__wrapper is-extra-items">

        <div class="b__item group">

            <div class="b__wrapper">

                <div class="b__title">

                    {[ extraItems.title|raw ]}

                </div>

                {% for text in extraItems.text %}

                    <div class="b__text">

                        {[ text|raw ]}

                    </div>

                {% endfor %}

            </div>

            <div class="b__wrapper">

                <div class="b__media">

                    <img src="{[ extraItems.img.url ]}" alt="{[ extraItems.img.alt ]}" class="b__img">

                </div>

                {% if extraItems.btn %}

                    {% for btn in extraItems.btn %}

                        <a href="{[ btn.url ]}" class="b-link-btn b-link-btn_accent">{[ btn.title ]}</a>

                    {% endfor %}

                {% endif %}

            </div>

        </div>

    </div>

{% endfor %}

{[ macro.RGBi(blocks.customContent, parent) ]}