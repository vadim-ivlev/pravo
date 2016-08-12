<div class="b-feed">

    <div class="b-feed__body b-feed__body_height-auto">

        <h2 class="b-feed__name">{[ data.reglament.title ]}</h2>

        <h2 class="b-feed__title">{[ data.reglament.subtitle.name ]}</h2>

        <div class="b-feed__subtitle">{[ data.reglament.subtitle.text ]}</div>

        {% for item in data.reglament.item %}
            <div class="b-feed__item{% if item.mod %}{[ item.mod ]}{% endif %}" data-value="{[ item.value ]}">
                <a class="b-link b-link_title" href="{[ item.url ]}">{[ item.title ]}</a>
            </div>
        {% endfor %}

    </div>


</div>