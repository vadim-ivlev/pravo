{# 
    Header
#}

{# выводим основные блоки #}
{% for block in header.blocks %}

    {# если используем генератор тега #}
    {% if block.opt %}
        {[ macro.tag(block) ]}
    {% endif %}

{% endfor %}