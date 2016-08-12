<div class="b-news__body b-news-spiegel">
    <div class="b-news__list">
        {{# latest_interviews}}
            {{#latest_interviews__FIRST__}}
                
				{[ macro.RGBi(data.newsSpiegel) ]}
				
            {{/latest_interviews__FIRST__}}
        {{/ latest_interviews}}
    </div>
</div>

<div class="b-news__body">

    <div class="b-news__list">
        {{# latest_interviews}}
            {{^latest_interviews__FIRST__}}

				{[ macro.RGBi(data.news) ]}

			{{/latest_interviews__FIRST__}}
        {{/ latest_interviews}}
    </div>
</div>