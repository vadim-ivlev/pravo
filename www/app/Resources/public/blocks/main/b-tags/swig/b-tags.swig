{{# tags }}
    {{# length }}
        <h2 class="b-tags__title">{{ tags__letter }}</h2>
        <ul class="b-tags__list">            
            {{# tags__items }}
                {{# tags__items__frequency }}
                    <li class="b-tags__list-item">
                        <a href="{{ tags__items__link }}" class="b-link" rel="nofollow" from="tags-list">{{ tags__items__title }} <span class="b-grey-text">({{ tags__items__frequency }})</span></a>
                    </li>
                {{/ tags__items__frequency }}
            {{/ tags__items }}
        </ul>
    {{/ length }}
{{/ tags }}