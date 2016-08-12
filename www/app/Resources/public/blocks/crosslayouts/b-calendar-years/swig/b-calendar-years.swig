
    <div class="b__title">{[ data.calendar.title ]}</div>

    <div class="b__list group">

        {% for item in data.calendar.item %}

            <div class="b__item" data-value="{[ item.value ]}">

                <a href="" class="b-link">{[ item.value ]}</a>

            </div>

        {% endfor %}

    </div>
