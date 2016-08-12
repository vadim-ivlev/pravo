{{# categories }}
    {{# rubrics_tags }}
        <h2 class="b-tags__title">
            <a class="b-link" href="{{ rubrics_tags__links }}">{{ rubrics_tags__name }}</a>
        </h2>
        <ul class="b-tags__list">
            {{# rubrics_tags__items_unit }}
                {{# rubrics_tags__items }}
                    <li class="b-tags__list-item">
                        <a href="{{ rubrics_tags__items__link }}" class="b-link">{{ rubrics_tags__items__title }} <span class="b-grey-text">({{ rubrics_tags__items__frequency }})</span></a>
                    </li>
                {{/ rubrics_tags__items }}
            {{/ rubrics_tags__items_unit }}
        </ul>
    {{/ rubrics_tags }}
{{/ categories }}