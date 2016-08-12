<div class="b-judges__head">
    <div class="page">
        <h1>Судьи</h1>
    </div>
</div>

<div class="b-judges__body">
    <div class="page">
        {{#judges}}
            <div class="b-judges__item">
                <div class="b-judges__item__left">
                    <div class="b-judges__item__person">
                        <div class="b-judges__item__photo">
                            <img src="{{photo_path}}" alt="">
                        </div>
                        <div class="b-judges__item__name">{{name}}</div>
                    </div>
                    <div class="b-judges__mini-schedule">
                        <div class="b-judges__schedule b-schedule b-schedule_full">
                            <div class="b-schedule__body">            
                                <div class="b-schedule__part">
                                    <div class="b-schedule__table">
                                        <table>
                                        {{# dates}}
                                            {{# events}}
                                                <tr data-uri="{{uri}}" {% if item.is_active == true %}class="active"{% endif %}>
                                                    <td class="schedule_date">{{date}}</td>
                                                    <td class="game_time">{{game_time}}</td>
                                                    <td class="group_name">{{group_name}}</td>
                                                    <td class="first_team_flag"><div class="b-icon-country b-icon-country_{{first_team}}"></div></td>
                                                    <td class="first-team">{{first_team_name}}</td>
                                                    <td class="score">
                                                        {{# not_started}}
                                                            - : -
                                                        {{/ not_started}}
                                                        
                                                        {{^ not_started}}
                                                            <span>{{first_team_score}}</span> 
                                                            <span>:</span> 
                                                            <span>{{second_team_score}}</span>
                                                        {{/ not_started}}

                                                        <div class="translation">
                                                            {{# trans_status}}
                                                            <span class="{{# not_started}} false{{/ not_started}}{{# is_active}} is_active{{/ is_active}}{{# is_over}} is_over{{/ is_over}}"><a href="{{text_link}}" target="_blank">{{trans_status}}</a></span>
                                                            {{/ trans_status}}                                
                                                        </div>
                                                    </td>
                                                    <td class="second-team">{{second_team_name}}</td>
                                                    <td class="second_team_flag"><div class="b-icon-country b-icon-country_{{second_team}}"></div></td>
                                                </tr>
                                            {{/ events}}
                                        {{/ dates}}
                                        </table>
                                    </div>
                                    {{# dates}}
                                        <div class="b-schedule__mobile">
                                        <div class="b-schedule__mobile__date">{{date}}</div>
                                            {{# events}}
                                            <div class="b-schedule__mobile__item">
                                                {{# media}}
                                                <a href="javascript://" class="b-schedule__mobile__arrow"></a>
                                                {{/ media}}
                                                <div class="b-schedule__mobile__top">
                                                    <span>{{group_name}}</span>
                                                    <span>{{game_time}}</span>
                                                </div>
                                                <div class="b-schedule__mobile__mid">
                                                    <div class="left-team">{{first_team_name}}</div>
                                                    <div class="scores">
                                                        {{# not_started}}
                                                            - : -
                                                        {{/ not_started}}
                                                        
                                                        {{^ not_started}}
                                                            <span>{{first_team_score}}</span> 
                                                            <span>:</span> 
                                                            <span>{{second_team_score}}</span>
                                                        {{/ not_started}}                    
                                                    </div>
                                                    <div class="right-team">{{second_team_name}}</div>
                                                </div>
                                                <div class="b-schedule__mobile__bottom">
                                                    <div class="translation">
                                                        {{# trans_status}}
                                                        <span class="{{# not_started}} false{{/ not_started}}{{# is_active}} is_active{{/ is_active}}{{# is_over}} is_over{{/ is_over}}"><a href="{{text_link}}" target="_blank">{{trans_status}}</a></span>
                                                        {{/ trans_status}}                                
                                                    </div>
                                                </div>
                                                {{# media}}
                                                <div class="b-schedule__mobile__hidden">
                                                    <div>
                                                        <div><div class="media-icon_tv">&nbsp;</div></div>
                                                        <div>смотрите {{media_date}} {{media_month}} в {{media_time}} на телеканале {{media_name}}</div>
                                                        <div>
                                                            <div class="media-icon_{{media_abbr}}">&nbsp;</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {{/ media}}
                                            </div>
                                            {{/ events}}
                                        </div>
                                    {{/ dates}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="b-judges__item__right">
                    {{#birthday}}
                        <div>
                            <b>Дата рождения: </b>
                            {{birthday}}
                        </div>
                    {{/birthday}}
                    {{#city}}
                        <div>
                            <b>Город: </b>
                            {{city}}
                        </div>
                    {{/city}}
                    {{#category}}
                        <div>
                            <b>Категория: </b>
                            {{category}}
                        </div>
                    {{/category}}
                    {{#interesting}}
                        <div>
                            <b>Интересный факт: </b>
                            {{interesting}}
                        </div>
                    {{/interesting}}
                    {{#description}}
                        <div>
                            {{description}}
                        </div>
                    {{/description}}
                </div>
            </div>
        {{/judges}}
    </div>
</div>