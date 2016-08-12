{# 
    SideContent
#}

{# выводим основные блоки #}
{% for block in side.blocks %}

    {# если используем генератор тега #}
    {% if block.opt %}
        {[ macro.tag(block) ]}
    {% endif %}

{% endfor %}