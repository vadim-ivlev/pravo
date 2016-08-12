<div class="b-team__head">
    <div class="page">
        <h1>{{country_name}}</h1>
        <div class="b-team__anchors">
            <a href="#consists">состав</a>
            <!-- <a href="#schedule">матчи</a> -->
        </div>
        <div class="b-team__select">
            <span>Выберите команду</span>
            <div class="b-team__select__wrapper">
                <a href="javascript://" class="b-team__select__link">{{country_name}}</a>
                <div class="b-team__select__hidden">
                    {{#country_list}}
                        <a href="/spec/football2016-teams/team-{{uri}}" class="b-team__select__link">{{name}}</a>
                    {{/country_list}}
                </div>
            </div>
        </div>
    </div>
</div>

<div class="b-team__body">
    <div class="page">
        <div class="b-team__description">
            <h1 class="b-team__icon"><span class="team-flag team-flag_{{country}}"></span> О команде</span></h1>
            <div class="b-team__text">
                {{{description}}}
            </div>
        </div>
        <div class="b-team__news">
            {{#groups}}
                <div class="b-team__group-part">
                    <div class="group_name">{{group_name}}</div>
                    <table>
                        <tr>
                            <td>Страна</td>
                            <td>И</td>
                            <td>В</td>
                            <td>П</td>
                            <td>О</td>
                        </tr>
                        {{#teams}}
                            <tr class="{{#current}}current-team{{/current}}">
                                <td><a href="/spec/football2016-teams/team-{{country}}"><div class="b-icon-country b-icon-country_{{country}}"></div> {{country_name}}</a></td>
                                <td>{{games}}</td>
                                <td>{{wins}}</td>
                                <td>{{loses}}</td>
                                <td>{{points}}</td>
                            </tr>
                        {{/teams}}
                    </table>
                </div>
            {{/groups}}
            <div class="b-team__mini-schedule">
                <div class="b-team__schedule b-schedule b-schedule_full">
                    <div class="b-schedule__body">            
                        <div class="b-schedule__part">
                            <div class="b-schedule__table">
                                <table>
                                {{# dates}}
                                    {{# events}}
                                        <tr data-uri="{{uri}}" {% if item.is_active == true %}class="active"{% endif %}>
                                            <td class="schedule_date">{{date}} {{date_month}}</td>
                                            <td class="game_time">{{game_time}}</td>
                                            <td class="group_name">{{group_name}}</td>
                                            <td class="first_team_flag"><a href="/spec/football2016-teams/team-{{first_team}}"><div class="b-icon-country b-icon-country_{{first_team}}"></div></a></td>
                                            <td class="first-team"><a href="/spec/football2016-teams/team-{{first_team}}">{{first_team_name}}</a></td>
                                            <td class="score">
                                                {{# not_started}}
                                                    - : -
                                                {{/ not_started}}
                                                
                                                {{^ not_started}}
                                                    <a href="{{text_link}}" target="_blank">
                                                        <span>{{first_team_score}}</span> 
                                                        <span>:</span> 
                                                        <span>{{second_team_score}}</span>
                                                    </a>
                                                {{/ not_started}}

                                                <div class="translation">
                                                    {{# trans_status}}
                                                    <span class="{{# not_started}} false{{/ not_started}}{{# is_active}} is_active{{/ is_active}}{{# is_over}} is_over{{/ is_over}}"><a href="{{text_link}}" target="_blank">{{trans_status}}</a></span>
                                                    {{/ trans_status}}                                
                                                </div>
                                            </td>
                                            <td class="second-team"><a href="/spec/football2016-teams/team-{{second_team}}">{{second_team_name}}</a></td>
                                            <td class="second_team_flag"><a href="/spec/football2016-teams/team-{{second_team}}"><div class="b-icon-country b-icon-country_{{second_team}}"></div></a></td>
                                        </tr>
                                    {{/ events}}
                                {{/ dates}}
                                </table>
                            </div>
                            {{# dates}}
                                <div class="b-schedule__mobile">
                                <div class="b-schedule__mobile__date">{{date}} {{date_month}}</div>
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
                                            <div class="left-team"><a href="/spec/football2016-teams/team-{{first_team}}">{{first_team_name}}</a></div>
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
                                            <div class="right-team"><a href="/spec/football2016-teams/team-{{second_team}}">{{second_team_name}}</a></div>
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
    </div>
</div>

<div id="consists" class="b-team__consists">
    <div class="page">
        <div class="b-schedule__head__name">Состав команды</div>
        <table>
            <tr class="first">
                <td>фио игрока</td>
                <td>амплуа</td>
                <td>дата рождения</td>
            </tr>
            {{# consists}}
                {{# placement}}
                    <tr>
                        <td>{{name}}</td>
                        <td>{{line}}</td>
                        <td>{{birthday}}</td>
                    </tr>
                {{/ placement}}
            {{/ consists}}
        </table>
        <table>
            <tr class="first">
                <td>фио игрока</td>
                <td>амплуа</td>
                <td>дата рождения</td>
            </tr>
            {{# consists}}
                {{^ placement}}
                    <tr>
                        <td>{{name}}</td>
                        <td>{{line}}</td>
                        <td>{{birthday}}</td>
                    </tr>
                {{/ placement}}
            {{/ consists}}
        </table>
    </div>
</div>

 
<!-- <div id="schedule" class="b-team__schedule b-schedule b-schedule_full">
    <div class="page">
        <div class="b-schedule__head__name">Матчи</div>       
        <div class="b-schedule__body">            
            <div class="b-schedule__part">
                <div class="b-schedule__table">
                    <table>
                    {{# dates}}
                        {{# events}}
                            <tr data-uri="{{uri}}" {% if item.is_active == true %}class="active"{% endif %}>
                                <td class="schedule_date">{{date}} {{date_month}}</td>
                                <td class="game_time">{{game_time}}</td>
                                <td class="group_name">{{group_name}}</td>
                                <td class="game_place">{{game_place}}</td>
                                <td class="trans_status">
                                    <div class="translation">
                                        {{# trans_status}}
                                        <span class="{{# not_started}} false{{/ not_started}}{{# is_active}} is_active{{/ is_active}}{{# is_over}} is_over{{/ is_over}}"><a href="{{text_link}}" target="_blank">{{trans_status}}</a></span>
                                        {{/ trans_status}}                                
                                    </div>
                                </td>
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
                                {{# media}}
                                    <td class="media">
                                        <div class="media_block">
                                            <div class="media-icon_{{media_abbr}}"></div>
                                            <span>смотрите</span> {{media_date}} {{media_month}} в {{media_time}} на <span>телеканале</span> {{media_name}}
                                        </div>
                                    </td>
                                {{/ media}}
                                {{^ media}}
                                    <td class="media_blank">&nbsp;</td>
                                {{/ media}}
                            </tr>
                        {{/ events}}
                    {{/ dates}}
                    </table>
                </div>
                {{# dates}}
                    <div class="b-schedule__mobile">
                    <div class="b-schedule__mobile__date">{{date}} {{date_month}}</div>
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
</div> -->
