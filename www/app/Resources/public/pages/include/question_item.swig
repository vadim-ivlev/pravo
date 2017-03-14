{{# questions }}
    <div class="b-question-block__body">
        {{# questions__head }}
            <div class="b-material-head">
        	   {{# questions__head__author__active}}
                 {{# questions__head__author }}
                        <span class="b-question-block__author">{{ questions__head__author__name }}{{# questions__head__author__location }} ({{ questions__head__author__location }}){{/ questions__head__author__location }}</span>
                    {{/ questions__head__author }}
                {{/ questions__head__author__active}}
                {{# questions__item_complete }}
                    <span class="b-question-block__date">{{ questions__head__date }}</span>
                {{/ questions__item_complete  }}
                <span class="b-material-head__rubric">Рубрика:{{# rubrics }} <a class="b-link b-material-head__rubric-name" href="{{ rubrics__link }}">{{ rubrics__title }}</a>{{^ rubrics__LAST__ }},{{/ rubrics__LAST__ }}{{/ rubrics}}</span>
            </div>
        {{/ questions__head}}
        <h1 class="b-question-block__title">{{{  title }}}</h1>
        <div class="b-question-block__text">{{{  text }}}</div>
        <div class="b-question-block__tags">
            {{# tags__length }}
                {{# tags}}
                    <a href="{{ tags__link }}" class="b-link b-link_tag">{{ tags__title }}</a>{{^ tags__LAST__ }},{{/ tags__LAST__ }}
                {{/ tags }}
            {{/ tags__length }}
        </div>
    </div>
{{/ questions }}