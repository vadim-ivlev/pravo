<div class="b-schedule__body b-schedule-full">        
    
    <div class="b-schedule__head">
        <div class="b-schedule__head__name">расписание / результаты</div>
    </div>

{{^short}}
    <!-- короткое расписание -->
    <div class="b-schedule__part">
    <div class="b-schedule__table">
    <table>
{{/short}}

{{# dates}}

    {{#short}}
        <!-- длинное расписание -->
        <div class="b-schedule__part">
        <div class="b-schedule__table">
        <table>
    {{/short}}

        {{^short}}
            <tr class="first">
                <td colspan="12">{{date}} мая</td>
            </tr>
        {{/short}}

            {{# events}}
                <tr data-uri="{{uri}}" {% if item.is_active == true %}class="active"{% endif %}>
                    <td>{{group_name}}</td>
                    <td>{{game_time}}</td>
                    <td>{{game_place}}</td>
                    <td>
                        <div class="translation">
                            {{# trans_status}}
                            <span class="{{# not_started}} false{{/ not_started}}{{# is_active}} is_active{{/ is_active}}{{# is_over}} is_over{{/ is_over}}"><a href="{{text_link}}" target="_blank">{{trans_status}}</a></span>
                            {{/ trans_status}}                                
                        </div>
                    </td>
                    <td><div class="b-icon-country b-icon-country_{{first_team}}"></div></td>
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
                    <td><div class="b-icon-country b-icon-country_{{second_team}}"></div></td>
                    {{# media}}
                        <!-- {{media}} -->
                        <!-- <td><div class="media-icon_tv"></div></td> -->
                        <!-- <td><div class="media-icon_{{media_abbr}}"></div></td> -->
                        <td>
                            <div class="media_block">
                                <div class="media-icon_{{media_abbr}}"></div>
                                <span>смотрите</span> {{media_date}} {{media_month}} в {{media_time}} на <span>телеканале</span> {{media_name}}
                            </div>
                        </td>
                    {{/ media}}
                    {{^ media}}
                        <!-- <td>&nbsp;</td> -->
                        <!-- <td>&nbsp;</td> -->
                        <td>&nbsp;</td>
                    {{/ media}}
                </tr>
            {{/ events}}

    {{#short}}
        </table>        
        <div class="b-schedule__head__full-schedule tablet">
            <a href="javascript://">Полное распиcание</a>
        </div>
        </div>
        <!-- версия под мобилу -->
        <div class="b-schedule__mobile">
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
            <div class="b-schedule__head__full-schedule mobile">
                <a href="javascript://">Полное распиcание</a>
            </div>
        </div>
        <!-- / версия под мобилу -->
        </div>
    {{/short}}

{{/ dates}}

{{^short}}
    </table>
    </div>
    <!-- версия под мобилу -->
    {{# dates}}
    <div class="b-schedule__mobile">
        <div class="b-schedule__mobile__date">{{date}} мая</div>
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
    <!-- / версия под мобилу -->
    </div>
{{/short}}

</div>