<div class="b__title b__title_shifter">
    {[ macro.RGBi(blocks.headerPromo, parent) ]}
</div>

<div class="b__item is-sms-item group">
    <div class="b__media">
        <img src="{[ data.general.img ]}" alt="" class="b__img">
    </div>
    <div class="b__title">{[ data.general.title|raw ]}</div>
    <div class="b-table">

        <div class="b-table__item-wrapper group">

            {% for table in data.general.table %}

                <div class="b-table__item">
                    <h2 class="b-table__title">{[ table.title ]}</h2>

                    {% if table.row %}

                        {% for row in table.row %}

                            <div class="b-table__row group">

                                {% for col in row.col %}

                                    <div class="b-table__col">{[ col ]}</div>

                                {% endfor %}

                            </div>

                        {% endfor %}

                    {% endif %}

                </div>

            {% endfor %}

        </div>

    </div>
    <div class="b__wrapper">
        <h2 class="b__subtitle">{[ data.general.meta.title ]}</h2>
        <div class="b-ul">
            <ul class="b-ul__list">

                {% for list in data.general.meta.list %}

                    <li class="b-ul__item">{[ list|raw ]}</li>

                {% endfor %}

            </ul>
        </div>
    </div>
</div>

{% for item in data.item %}

    <div id="discount" class="b__item group">

        {% if item.img %}

            <div class="b__media">
                <img src="{[ item.img.url ]}" alt="{[ item.img.alt ]}" class="b__img">
            </div>

        {% endif %}

        <div class="b__wrapper">

            <div class="b__title">
                {[ item.title ]}
            </div>

            {% for text in item.text %}

                {% if text.item %}

                    {% for item in text.item %}

                        <div class="b__text">
                            {[ item|raw ]}
                        </div>

                    {% endfor %}

                {% endif %}

                {% if text.list %}

                    <div class="b-ul">
                        <ul class="b-ul__list">

                        {% for list in text.list %}

                            <li class="b-ul__item">
                                {[ list ]}
                            </li>

                        {% endfor %}

                        </ul>
                    </div>

                {% endif %}

            {% endfor %}

        </div>


        <div class="b__wrapper {% if item.table %}b-table__wrapper{% endif %}">

            <div class="b__title">
                {[ item.subTitle ]}
            </div>

            {% if item.select %}

                <div class="b-field_select group">

                    <div class="b-field__wrapper">

                        <select class="b-field__select b-field__select_select" id="select-zone" type="select">

                            {% for select in item.select %}

                                <option value="{[ select.value ]}">{[ select.item ]}</option>

                            {% endfor %}

                        </select>

                    </div>

                </div>

            {% endif %}

            {% if item.table %}

                {% for table in item.table %}

                    <div class="b-table {% if loop.first %} b-table_show {% else %} b-table_hide {% endif %}" data-value="{[ table.value ]}">

                        <div class="b-field_select group">

                            <div class="b-field__wrapper">

                                {% if item.select %}

                                    <select class="b-field__select b-field__select_select select-part" type="select">

                                        {% for part in item.part %}

                                            <option value="{[ part.value ]}">{[ part.item ]}</option>

                                        {% endfor %}

                                    </select>

                                {% endif %}

                            </div>

                        </div>

                        <div class="b-table__item-wrapper group">

                            {% for unit in table.unit %}

                                    <div class="b-table__item" {% if unit.id %} id="{[ unit.id ]}" {% endif %}>

                                        <div class="b-table__title-wrapper">

                                            <div class="b-table__title">
                                                {[ unit.title ]}
                                            </div>

                                        </div>

                                        <div class="b-table__subtitle-wrapper group">

                                            {% for subtitle in unit.subtitle %}

                                                <div class="b-table__subtitle">

                                                    {[ subtitle ]}

                                                </div>

                                            {% endfor %}
                                        </div>

                                        <div class="b-table__text-wrapper group">

                                            {% for rg in unit.rg %}

                                                <div class="b-table__text">

                                                    {[ rg ]}

                                                </div>

                                            {% endfor %}

                                        </div>

                                        <div class="b-table__text-wrapper group">

                                            {% for rgWeek in unit.rgWeek %}

                                                <div class="b-table__text">

                                                    {[ rgWeek ]}

                                                </div>

                                            {% endfor %}

                                        </div>

                                    </div>

                                {% endfor %}

                            </div>

                        <div class="b__text">
                            {[ table.hint ]}
                        </div>

                        <div class="b__text">
                            {[ table.text ]}
                        </div>

                    </div>

                {% endfor %}

            {% endif %}

        </div>

    </div>


{% endfor %}

{[ macro.RGBi(blocks.customContent, parent) ]}