{{# items_list }}
<div class="b-question-block{{# mods__length}}{{# mods}} b-question-block_{{ . }}{{/ mods}}{{/ mods__length}}">
<div class="b-img-col{{# visibility}} b-img-col_{{ visibility__state }}{{/ visibility}}">
    {{# jurist }}
        {{# jurist__img }}
            {{# jurist__img__type_medium }}
                <a href="{{ jurist__link }}">
                    <img src="{{ jurist__img__file }}" alt="{{ jurist__img__title }}" width="{{ jurist__img__width }}" height="{{ jurist__img__height }}" class="b-round-image">
                </a>
            {{/ jurist__img__type_medium }}
        {{/ jurist__img }}
    {{/ jurist }}
</div>
<div class="b-question-block__body">
    {{# questions__head }}
        <div class="b-material-head">
        	{{# questions__head__author__active}}
                {{# questions__head__author }}
                    <span class="b-question-block__author">{{ questions__head__author__name }}{{# questions__head__author__location }} ({{ questions__head__author__location }}){{/ questions__head__author__location }}</span>
                {{/ questions__head__author }}
            {{/ questions__head__author__active}}
            <span class="b-material-head__rubric">Рубрика:{{^ current_rubric}}{{# rubrics }} <a class="b-link b-material-head__rubric-name" href="{{ rubrics__link }}">{{ rubrics__title }}</a>{{^ rubrics__LAST__ }},{{/ rubrics__LAST__ }}{{/ rubrics}}{{/ current_rubric}}{{# current_rubric}}{{# rubrics }} <span class="b-material-head__rubric-name">{{ rubrics__title }}</span>{{^ rubrics__LAST__ }},{{/ rubrics__LAST__ }}{{/ rubrics}}{{/ current_rubric}}</span>
        </div>
    {{/ questions__head}}
    <a class="b-link" href="{{ link }}">
        <div class="b-question-block__title b-link b-link_title">{{{  title }}}</div>
        <div class="b-question-block__text">{{{  text }}}</div>
    </a>
    <div class="b-question-block__tags">
        {{# tags__length }}
            {{# tags}}
                <a href="{{ tags__link }}" class="b-link b-link_tag">{{ tags__title }}</a>{{^ tags__LAST__ }},{{/ tags__LAST__ }}
            {{/ tags }}
        {{/ tags__length }}
    </div>
</div>
{{# jurist }}
    <div class="b-question-block__bottom">
        <div class="b-question-block__bottom-title">Отвечает</div>
        {{# jurist__active }}
            <a href="{{ jurist__link }}" class="b-question-block__reply-link b-link b-link_blue">
                {{# jurist__img__length }}
                    {{# jurist__img}}
                        {{# jurist__img__type_medium }}
                            <img src="{{ jurist__img__file }}" alt="{{ jurist__img__title }}" width="17" height="17" class="b-round-image">
                        {{/ jurist__img__type_medium }}
                    {{/ jurist__img}}
                {{/ jurist__img__length }}
                {{# jurist}}
                    {{ jurist__first_name }} {{ jurist__last_name }}
                {{/ jurist }}
            </a>
        {{/ jurist__active }}
        {{^ jurist__active }}
            <span class="b-question-block__reply-link">
                {{# jurist__img__length }}
                    {{# jurist__img}}
                        {{# jurist__img__type_medium }}
                            <img src="{{ jurist__img__file }}" alt="{{ jurist__img__title }}" width="17" height="17" class="b-round-image">
                        {{/ jurist__img__type_medium }}
                    {{/ jurist__img}}
                {{/ jurist__img__length }}
                {{# jurist}}
                    {{ jurist__first_name }} {{ jurist__last_name }}
                {{/ jurist }}
            </span>
        {{/ jurist__active }}
        {{# jurist__rate }}
            <div class="b-rate b-rate_right">
                <div class="b-rate__icon"></div>
                <div class="b-rate__value">{{ jurist__rate__reply }}</div>
            </div>
        {{/ jurist__rate}}
    </div>
{{/ jurist}}
</div>
{{/ items_list }}