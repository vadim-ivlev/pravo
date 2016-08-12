
<div class="b-feed__body b-feed__body_height-auto">

    <h2 class="b-feed__name">{[ data.reglament.title ]}</h2>

    {% for item in data.reglament.item %}
        <div class="b-feed__item" data-value="{[ item.value ]}">
            <a class="b-link b-link_title" href="{[ item.url ]}">{[ item.title ]}</a>
        </div>
    {% endfor %}

</div>

