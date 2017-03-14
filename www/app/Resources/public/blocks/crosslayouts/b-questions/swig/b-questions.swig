{% if (data[mod]) %}

    <div class="b-questions__name">{[ data[mod].name ]}</div>

    {{# {[ data[mod].object ]} }}
            <div class="b-question-block{{# mods__length}}{{# mods}} b-question-block_{{ . }}{{/ mods}}{{/ mods__length}}">

                {% if data[mod].showBlocks.answer %}

                    {% if data[mod].showBlocks.answer.jurist %}

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

                    {% endif %}

                {% endif %}

                <div class="b-question-block__body">

                    {{# questions__head }}

                        <div class="b-material-head">
                        	{{# questions__head__author__active}}
                                {% if data[mod].showBlocks.author %}
                                    {{# questions__head__author }}
                                        <span class="b-question-block__author">{{ questions__head__author__name }}{{# questions__head__author__location }} ({{ questions__head__author__location }}){{/ questions__head__author__location }}</span>
                                    {{/ questions__head__author }}
                                {% endif %}
                            {{/ questions__head__author__active}}
                            {% if data[mod].showBlocks.date %}
                                {{# questions__item_complete }}
                                    <span class="b-question-block__date">{{ questions__head__date }}</span>
                                {{/ questions__item_complete  }}
                            {% endif %}

                            <span class="b-material-head__rubric">Рубрика:{{# rubrics }} <a class="b-link b-material-head__rubric-name" href="{{ rubrics__link }}">{{ rubrics__title }}</a>{{^ rubrics__LAST__ }},{{/ rubrics__LAST__ }}{{/ rubrics}}</span>

                        </div>

                    {{/ questions__head}}

                    {% if mod == "latest" %}
                        {{# rubrics}}
                            <a href="{{ rubrics__link }}" class="b-link b-link_blue">{{ rubrics__title }}</a>
                        {{/ rubrics}}

                    {% endif %}

                    {% if mod !== "item" %}
                        <a class="b-link{% if mod == "latest" %} b-link_block{% endif %}" href="{{ link }}">

                            {% if data[mod].showBlocks.title %}
                                <div class="b-question-block__title b-link b-link_title{% if data[mod].showBlocks.mod %} b-link_latest{% endif %}">{{{  title }}}</div>
                            {% endif %}

                            {% if data[mod].showBlocks.text %}
                                <div class="b-question-block__text">{{{  text }}}</div>
                            {% endif %}

                        </a>
                    {% else %}
                        {% if data[mod].showBlocks.title %}
                            <h1 class="b-question-block__title">{{{  title }}}</h1>
                        {% endif %}

                        {% if data[mod].showBlocks.text %}
                            <div class="b-question-block__text">{{{  text }}}</div>
                        {% endif %}
                    {% endif %}

                    {%  if data[mod].showBlocks.tags %}

                        <div class="b-question-block__tags">

                            {{# tags__length }}

                                {{# tags}}
                                    <a href="{{ tags__link }}" class="b-link b-link_tag" rel="nofollow">{{ tags__title }}</a>{{^ tags__LAST__ }},{{/ tags__LAST__ }}
                                {{/ tags }}

                            {{/ tags__length }}

                        </div>

                    {%  endif %}

                    {{# questions__item_profile }}
                        {{# jurist__rate }}
                            <div class="b-rate b-rate_right">
                                <div class="b-rate__icon"></div>
                                <div class="b-rate__value">{{ jurist__rate__reply }}</div>
                            </div>
                        {{/ jurist__rate}}
                    {{/ questions__item_profile }}

                </div>

                {{^ questions__item_complete }}

                    {% if data[mod].showBlocks.answer %}

                        {% if data[mod].showBlocks.answer.jurist %}
                            {{# jurist }}
                                <div class="b-question-block__bottom">
                                    Отвечает
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

                        {% endif %}

                    {% endif %}

                {{/ questions__item_complete }}


            </div>

            {{# questions_list__bibliotechka }}
                {[ macro.RGBi(blocks.bibliotechkaAdvert)]}
            {{/ questions_list__bibliotechka }}

        {{/ {[ data[mod].object ]} }}

{% endif %}