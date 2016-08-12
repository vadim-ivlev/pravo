<div class="b-menu__body">
    {% for item in data.list %}
        <a href="{[ item.href ]}" class="b-menu__link">{[ item.title ]}</a>
    {% endfor %}

    <a href="javascript://" class="b-menu__mobile-link"><span></span></a>

    <div class="b-menu__overlay">
        {% for item in data.list %}
            <a href="{[ item.href ]}" class="b-menu__link">{[ item.title ]}</a>
        {% endfor %}
    </div>
</div>