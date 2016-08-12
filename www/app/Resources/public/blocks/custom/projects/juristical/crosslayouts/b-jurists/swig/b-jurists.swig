{% if (data[mod]) %}
    <div class="b-jurists__name">{[ data[mod].name ]}</div>

    {{# {[ data[mod].object ]} }}
        <div class="b-jurist-block{{# mods__length }}{{# mods }} b-jurist-block_{{ . }}{{/ mods }}{{/ mods__length }}">

            {% if data[mod].showBlocks.img %}
                {{# jurist__img}}
                    <!--<div class="b-img-col b-img-col_visible">-->
                        {{# jurist__img__type_medium }}
                            <img class="b-round-image" src="{{ jurist__img__file }}" width="{[ data[mod].img__width ]}" height="{[ data[mod].img__height ]}" alt="{{ jurist__img__title }}">
                        {{/ jurist__img__type_medium }}
            <!--</div>-->
                {{/ jurist__img}}
            {% endif %}

            {% if mod == "feed" %}
                <a class="b-link" href="{{ jurist__link }}">
                    <div class="b-jurist-block__title b-jurist-block__title_sidebar">
                        <div class="b-jurist-block__last-name b-jurist-block__last-name_feed">{{ jurist__last_name }}</div>
                        {{ jurist__first_name }}

                        {% if data[mod].showBlocks.patronymic %}
                            {{ jurist__patronymic }}
                        {% endif %}

                    </div>
                </a>
            {% endif %}

            <div class="b-jurist-block__body{{# mods__length }}{{# mods }} b-jurist-block__body_{{ . }}{{/ mods }}{{/ mods__length }}">

                {% if mod !== "feed" %}
                    <a class="b-link" href="{{ jurist__link }}">
                        <div class="b-jurist-block__title{% if mod == "top" %} b-jurist-block__title_top{% endif %}">

                            {% if mod !== "top" %}
                                <div class="b-jurist-block__last-name">{{ jurist__last_name }}</div>
                            {% else %}
                                {{ jurist__last_name }}
                            {% endif %}

                            {{ jurist__first_name }}

                            {% if data[mod].showBlocks.patronymic %}
                                {{ jurist__patronymic }}
                            {% endif %}

                        </div>
                    </a>
                {% endif %}

                {% if data[mod].showBlocks.education %}
                    {{# jurist__education__length }}
                        <div class="b-jurist-block__info">
                            <span class="b-jurist-block__info-title{% if mod == "feed" %} b-jurist-block__info-title_block{% endif %}">Образование:</span> {{# jurist__education}}{{ jurist__education }}{{/ jurist__education }}
                        </div>
                    {{/ jurist__education__length }}
                {% endif %}

                {% if data[mod].showBlocks.specialization %}
                    <div class="b-jurist-block__info">
                        <span class="b-jurist-block__info-title{% if mod == "feed" %} b-jurist-block__info-title_block{% endif %}">Специализация:</span> {{# rubrics}}{{ rubrics__title }}{{^ rubrics__LAST__ }}, {{/ rubrics__LAST__}}{{/ rubrics }}
                    </div>
                {% endif %}

                {% if data[mod].showBlocks.company %}
                    {{# jurist__company__length }}
                        <div class="b-jurist-block__info">
                            <span class="b-jurist-block__info-title">Организация:</span> {{# jurist__company }}{{{ jurist__company }}}{{/ jurist__company }}
                        </div>
                    {{/ jurist__company__length }}
                {% endif %}

                {% if mod !== "profile" %}
                    <div class="b-jurist-block__index">
                        {{# jurist__rate }}
                            <div class="b-jurist-block__info b-jurist-block__info_inline">
                                <span class="b-jurist-block__info-title">Рейтинг:</span>
                                <div class="b-rate">
                                    <div class="b-rate__icon"></div>
                                    <div class="b-rate__value">{{ jurist__rate__author }}</div>
                                </div>
                            </div>
                        {{/ jurist__rate }}

                        {% if data[mod].showBlocks.consultations %}

                            {% if mod !== "top" %}
                                <div class="b-jurist-block__info b-jurist-block__info_inline">
                                    <span class="b-jurist-block__info-title">Консультаций:</span> {{ jurist__consultations }}
                                </div>
                            {% else %}
                                <div class="b-jurist-block__info b-jurist-block__info_top">Консультаций: {{ jurist__consultations }}</div>
                            {% endif %}

                        {% endif %}
                    </div>
                {% endif %}

            </div>

            {% if mod == "profile" %}
                {{# jurist__bio__length }}
                    <div class="b-jurist-block__info b-jurist-block__info_bio">
                        <span class="b-jurist-block__info-title b-jurist-block__info-title_block">Краткая биография</span>
                        {{ jurist__bio }}
                    </div>
                {{/ jurist__bio__length }}
                <div class="b-jurist-block__index b-jurist-block__index_inline">
                    {{# jurist__rate }}
                        <div class="b-jurist-block__info b-jurist-block__info_inline">
                            <span class="b-jurist-block__info-title">Рейтинг:</span>
                            <div class="b-rate">
                                <div class="b-rate__icon"></div>
                                <div class="b-rate__value">{{ jurist__rate__author }}</div>
                            </div>
                        </div>
                    {{/ jurist__rate }}

                    {% if data[mod].showBlocks.consultations %}

                        {% if mod !== "top" %}
                            <div class="b-jurist-block__info b-jurist-block__info_inline">
                                <span class="b-jurist-block__info-title">Консультаций:</span> {{ jurist__consultations }}
                            </div>
                        {% else %}
                            <div class="b-jurist-block__info b-jurist-block__info_top">Консультаций: {{ jurist__consultations }}</div>
                        {% endif %}

                    {% endif %}

                </div>
                {{# jurist__paid__feedback }}
                    {{# feedback__active }}
                        <a href="{{# type__feedback__email }}mailto:{{/ type__feedback__email }}{{ feedback__data }}" class="b-btn b-btn_orange b-right" target="{{# type__feedback__email }}_self{{/ type__feedback__email }}{{^ target__feedback__email }}_blank{{/ target__feedback__email }}">Связаться с юристом</a>
                    {{/ feedback__active }}
                {{/ jurist__paid__feedback }}
            {% endif %}

        </div>
    {{/ {[ data[mod].object ]} }}
{% endif %}