<div class="b-feed">

    <h2 class="b-feed__name">Наши издания</h2>

    {% for partner in data %}

    <div class="b-feed__item">
        <a class="b-link b-link_title" href="{[ partner.uri ]}" >{[ partner.title ]}</a>
    </div>

    {% endfor %}

</div>