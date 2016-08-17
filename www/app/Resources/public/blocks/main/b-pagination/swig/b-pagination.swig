{{# pagination }}
    <div class="b-arrow b-arrow_prev b-arrow_disabled js-arrow-prev-disabled"></div>
    {{# arrow }}
        {{# arrow__prev }}
            <a href="{{ arrow__link }}" class="b-arrow b-arrow_prev js-arrow-prev"></a>
        {{/ arrow__prev }}
    {{/ arrow }}
    {{# all__pages }}
        {{# first }}
            <a href="{{ link }}" class="js-to-page b-to-page{{# current }} b-to-page_active{{/ current }}">{{ number_page }}</a>
            {{# left_three_dots }}
                &hellip;
            {{/ left_three_dots }}
        {{/ first }}
        {{# middle }}        
            <a href="{{ link }}" class="js-to-page b-to-page{{# current }} b-to-page_active{{/ current }}">{{ number_page }}</a>
        {{/ middle }}
        {{# last }}
            {{# right_three_dots }}
                &hellip;
            {{/ right_three_dots }}
            <a href="{{ link }}" class="js-to-page b-to-page{{# current }} b-to-page_active{{/ current }}">{{ number_page }}</a>
        {{/ last }}
    {{/ all__pages }}
    {{# arrow }}
        {{# arrow__next }}
            <a href="{{ arrow__link }}" class="b-arrow b-arrow_next js-arrow-next"></a>
        {{/ arrow__next }}
    {{/ arrow }}
    <div class="b-arrow b-arrow_next b-arrow_disabled js-arrow-next-disabled"></div>
{{/ pagination }}