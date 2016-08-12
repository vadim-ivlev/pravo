<div class="b-custom-links__body">
    {% for link in data.links %}
        <div class="b-custom-links__item">
            <a href="{[link.url]}">{[link.name]}</a>
        </div>
    {% endfor %}
</div>