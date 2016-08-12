<div class="b-exchange__body">    
    <div class="b-exchange__list">    
        {{# rates}}    
        <div class="b-exchange__item {{id}}{{# change}} {{change}}{{/ change}}" title="{{title}} {{market}}">    
            <span class="b-exchange__item__title">{{title}}</span>    
            <span class="b-exchange__item__icon"></span>    
            {{rate}}    
            <span class="b-exchange__item__rate"></span>
        </div>
        {{/ rates}}  
    </div>
</div>    