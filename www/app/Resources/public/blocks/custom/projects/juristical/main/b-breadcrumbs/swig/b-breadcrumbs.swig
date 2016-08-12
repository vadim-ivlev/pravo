{% if (data[mod]) %}
    <ul class="b-breadcrumbs__list">
        <li class="b-breadcrumbs__item">
            {% if mod == "main" %}
                Все консультации
            {% else %}
                <a href="/jurists/main/1/html/0/" class="b-link b-link_blue">Все консультации</a>
            {% endif %}
        </li>
        {% if mod !== "main" %}
            <li class="b-breadcrumbs__item">
                {% if mod == "rubric" %}
                    {{ current_rubric }}
                {% elseif mod == "answer" %}
                    {{# questions_item }}{{# rubrics }}{{# rubrics__FIRST__ }}{{ rubrics__title }}{{/ rubrics__FIRST__ }}{{/ rubrics }}{{/ questions_item }}
                {% elseif mod == "tag" %}
                    {{ current_tag }}
                {% endif %}
            </li>
        {% endif %}
    </ul>
{% endif %}