<div class="b__title b__title_shifter">
    {[ macro.RGBi(blocks.headerPromo, parent) ]}
</div>

{% for item in data.item %}

    <div class="b__item group">

        <div class="b__media">

            <img src="{[ item.img.url ]}" alt="{[ item.img.alt ]}" class="b__img">

        </div>

        <div class="b__wrapper">

            <div class="b__title">

                {[ item.title ]}

            </div>

            {% for text in item.text %}

                <div class="b__text">

                    {[ text|raw ]}

                </div>

            {% endfor %}

        </div>

    </div>

{% endfor %}

{[ macro.RGBi(blocks.customContent, parent) ]}