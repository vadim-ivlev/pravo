


    <div class="b__item group">

        <div class="b__title">

            {[ data.title ]}

        </div>

        {% for row in data.row %}

        <div class="b__row">

            <div class="b__subtitle">

                {[ row.subTitle ]}

            </div>

            {% for text in row.text %}

                <div class="b__text">

                    {[ text|raw ]}

                </div>

            {% endfor %}

        </div>

        {% endfor %}

    </div>
