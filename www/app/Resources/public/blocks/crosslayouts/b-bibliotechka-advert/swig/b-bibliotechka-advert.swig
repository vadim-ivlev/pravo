<div class="b-bibliotechka-advert__name">
    {% if (data[mod]) %}{[ data[mod].name ]} {% endif %}<a href="{[data.link.url]}" class="{[data.link.class]}">{[data.link.name]}</a>
</div>
{{# sidebar.bibliotechka}}
    <div class="b-bibliotechka-advert__body">
        <a href="{{ book.book__purchase_link }}">
            {{# bibliotechka__issue__array }}
                {{# bibliotechka__issue}}
                    <div class="b-bibliotechka-advert__issue">Выпуск {{ bibliotechka__issue__number }} ({{ bibliotechka__issue__year }})</div>
                {{/ bibliotechka__issue}}
            {{/ bibliotechka__issue__array }}
            {{#  book}}
                <div class="b-bibliotechka-advert__image-wrapper">
                    {{# book__img}}
                        <img src="{{ book__img__file }}" alt="{{ book__img__title }}" class="b-bibliotechka-advert__image" width="107" height="151">
                    {{/ book__img}}
                    {{# book__mods__length }}
                        {{# book__mods }}
                            <div class="b-bibliotechka-advert__ribbon">{{ book__mods__value }}</div>
                        {{/ book__mods }}
                    {{/ book__mods__length }}
                </div>
                <div class="b-bibliotechka-advert__description">
                    <div class="b-bibliotechka-advert__title">{{ book__title }}</div>
                    <p class="b-bibliotechka-advert__text">{{ book__annotation }}</p>
                </div>
            {{/ book}}
        </a>
        {{# book}}
            <div class="b-bibliotechka-advert__bottom">
                {{# book__download}}
                    <div class="b-download">
                        <a href="{{ book__download__link }}" class="b-link b-link_inner b-file-icon b-file-icon-pdf" target="_blank">Содержание</a>
                        <div class="b-download__size">{{ book__download__size }}</div>
                    </div>
                {{/ book__download}}
                <div class="b-bibliotechka-advert__purchase">
                    <span class="b-bibliotechka-advert__price">{{ book__price }}</span>
                    <div class="b-bibliotechka-advert__purchase-link">
                        <a href="{{ book__purchase_link }}" class="b-link-btn b-link-btn_second">Купить</a>
                    </div>
                </div>
            </div>
        {{/ book}}
    </div>
{{/ sidebar.bibliotechka}}