<div class="b-news-inner__body">
    
    <div class="b-news-inner__list" id="newsLoadContent">
    {{#letters}}
        {{#letters__list_persons}}
            <h2 class="b-news-inner__list-name b-news-inner__list-name_interviews">{{name}}</h2>
            {{# letters__list_persons__list_interviews}}
				
                {[ macro.RGBi(data.news) ]}
							
            {{/ letters__list_persons__list_interviews}}
        {{/letters__list_persons}}
    {{/letters}}
    </div>

</div>