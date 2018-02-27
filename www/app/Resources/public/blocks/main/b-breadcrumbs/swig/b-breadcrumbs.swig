{% if (data[mod]) %}
    <ul class="b-breadcrumbs__list">
        <li class="b-breadcrumbs__item">
            {% if mod == "main" %}
                Главная
            {% else %}
                <a href="{{# routes}}{{# bread__crumbs}}{{ bread__crumbs__main }}{{/ bread__crumbs}}{{/ routes}}" class="b-link b-link_blue">Главная</a>
            {% endif %}
        </li>
        {% if mod !== "main" %}
            {% if mod == "rubric" %}
                <li id="js-breadcrumbs-item" class="b-breadcrumbs__item">
                    {{ current_rubric.current_rubric_name }}
                </li>
            {% elseif mod == "answer" %}
                {{# questions_item }}
                    <li id="js-breadcrumbs-item" class="b-breadcrumbs__item">
                        {{# rubrics }}
                            {{# rubrics__FIRST__ }}
                                <a href="{{ rubrics__link }}" class="b-link b-link_blue">
                                    {{ rubrics__title }}
                                </a>
                            {{/ rubrics__FIRST__ }}
                        {{/ rubrics }}
                    </li>
                    <li id="js-breadcrumbs-item" class="b-breadcrumbs__item">
                        {{{  title }}}
                    </li>
                {{/ questions_item }}
            {% elseif mod == "tag" %}
                <li id="js-breadcrumbs-item" class="b-breadcrumbs__item">
                    {{ current_tag }}
                </li>
            {% endif %}
        {% endif %}
    </ul>
{% endif %}