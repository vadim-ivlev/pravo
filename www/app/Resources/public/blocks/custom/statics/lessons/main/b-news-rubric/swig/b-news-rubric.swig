<h3 class="b-news-rubric__title">
    {% if data.title.uri %}<a href="{[ data.title.uri ]}">{% endif %}
        {[ data.title.name ]}
        {% if data.title.uri %}</a>{% endif %}
</h3>

<div class="b-news-rubric__content">

    <!--#include virtual="/include/tmpl-b-news-rubric-spiegel/{[ data.include.type ]}-{[ data.include.uri ]}/num-1/"-->

    <div class="b-news-rubric__list">
        <!--#include virtual="/include/tmpl-b-news-rubric/{[ data.include.type ]}-{[ data.include.uri ]}/num-4/offset-1/"-->
    </div>

</div>