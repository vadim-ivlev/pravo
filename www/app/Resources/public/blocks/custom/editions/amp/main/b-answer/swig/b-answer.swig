{{# jurist}}
    {{# jurist__active }}
        <a href="{{ jurist__link }}" class="b-link">
            <div class="b-jurist-introduction">
                {{# jurist__img}}
                    {{# jurist__img__type_medium}}
                        <img src="{{ jurist__img__file }}" alt="{{ jurist__img__title }}" width="55" height="55" class="b-round-image">
                    {{/ jurist__img__type_medium}}
                {{/ jurist__img}}
                <div class="b-jurist-introduction__right-col">
                    <b>{{ jurist__name }}</b>
                    <div class="b-jurist-introduction__index">Консультаций: {{ jurist__consultations }}</div>
                </div>
            </div>
        </a>
    {{/ jurist__active }}
    {{^ jurist__active }}
        <div class="b-jurist-introduction">
            {{# jurist__img}}
                {{# jurist__img__type_medium}}
                    <img src="{{ jurist__img__file }}" alt="{{ jurist__img__title }}" width="55" height="55" class="b-round-image">
                {{/ jurist__img__type_medium}}
            {{/ jurist__img}}
            <div class="b-jurist-introduction__right-col">
                <b>{{ jurist__name }}</b>
                <div class="b-jurist-introduction__index">Консультаций: {{ jurist__consultations }}</div>
            </div>
        </div>
    {{/ jurist__active }}
{{/ jurist}}
{{# answer}}
    <div class="b-question-block__text">
        {{{ answer__text }}}
        {{# answer__type_card}}
            <ol class="b-answer-steps">
                {{# answer__steps}}
                    <li class="b-answer-steps__item">
                        <div class="b-answer-steps__title">{{ answer__steps__title }}</div>
                        <div class="b-answer-steps__text">{{ answer__steps__text }}</div>
                    </li>
                {{/ answer__steps}}
            </ol>
        {{/ answer__type_card}}
    </div>
    <div class="b-answer__lower-panel">
        {{# jurist}}
            {{# jurist__active }}
                {{# jurist__paid__feedback }}
                    {{# feedback__active }}
                        <a href="{{# type__feedback__email }}mailto:{{/ type__feedback__email }}{{ feedback__data }}" class="b-btn b-btn_orange b-right" target="{{# type__feedback__email  }}_self{{/ type__feedback__email }}{{^ target__feedback__email }}_blank{{/ target__feedback__email }}" rel="nofollow">Связаться с юристом</a>
                    {{/ feedback__active }}
                {{/ jurist__paid__feedback }}
            {{/ jurist__active }}
        {{/ jurist}}
    </div>
{{/ answer}}