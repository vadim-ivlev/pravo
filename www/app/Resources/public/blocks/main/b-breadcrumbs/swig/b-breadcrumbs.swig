{% if (data[mod]) %}
    <ul class="b-breadcrumbs__list">
        <li class="b-breadcrumbs__item">
            {% if mod == "main" %}
                Все консультации
            {% else %}
                <a href="{{# routes}}{{# bread__crumbs}}{{ bread__crumbs__main }}{{/ bread__crumbs}}{{/ routes}}" class="b-link b-link_blue">Все консультации</a>
            {% endif %}
        </li>
        {% if mod !== "main" %}
            <li id="js-breadcrumbs-item" class="b-breadcrumbs__item">
                {% if mod == "rubric" %}
                    {{ current_rubric.current_rubric_name }}
                {% elseif mod == "answer" %}
                    {{# questions_item }}{{# rubrics }}{{# rubrics__FIRST__ }}{{ rubrics__title }}{{/ rubrics__FIRST__ }}{{/ rubrics }}{{/ questions_item }}
                {% elseif mod == "tag" %}
                    {{ current_tag }}
                {% endif %}
            </li>
        {% endif %}
    </ul>
{% endif %}