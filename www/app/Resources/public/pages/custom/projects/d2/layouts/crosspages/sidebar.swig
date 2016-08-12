{# 
    Header
#}

{# выводим основные блоки #}
{% for block in sidebar.blocks %}

    {# если используем генератор тега #}
    {% if block.opt %}
        {[ macro.tag(block) ]}
    {% endif %}

{% endfor %}