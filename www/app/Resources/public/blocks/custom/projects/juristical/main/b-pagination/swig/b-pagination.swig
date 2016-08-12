{#<a href="" class="b-arrow b-arrow_prev"></a>#}
{#<a href="" class="b-to-page b-to-page_active">1</a>#}
{#<a href="" class="b-to-page">2</a>#}
{#<a href="" class="b-to-page">3</a>#}
{#<a href="" class="b-to-page">4</a>#}
{#<a href="" class="b-to-page">5</a>#}
{#<a href="" class="b-to-page">&hellip;</a>#}
{#<a href="" class="b-to-page">54</a>#}
{#<a href="" class="b-arrow b-arrow_next"></a>#}


{{# pagination }}
    <div class="b-arrow b-arrow_prev b-arrow_disabled js-arrow-prev-disabled"></div>
    {{# arrow }}
        {{# arrow__prev }}
            <a href="{{ arrow__link }}" class="b-arrow b-arrow_prev js-arrow-prev"></a>
        {{/ arrow__prev }}
    {{/ arrow }}
    {{# all__pages }}
        <a href="{{ link }}" class="js-to-page b-to-page{{# current }} b-to-page_active{{/ current }}">{{ number_page }}</a>
    {{/ all__pages }}
    {{# arrow }}
        {{# arrow__next }}
            <a href="{{ arrow__link }}" class="b-arrow b-arrow_next js-arrow-next"></a>
        {{/ arrow__next }}
    {{/ arrow }}
    <div class="b-arrow b-arrow_next b-arrow_disabled js-arrow-next-disabled"></div>
{{/ pagination }}