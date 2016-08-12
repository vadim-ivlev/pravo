<div class="b-team__body">
    <div class="b-team__description">
        <h1 class="b-team__icon"><span class="team-flag team-flag_{{country}}"></span> {{country_name}}</h1>
        <div class="b-team__text">
            {{{description}}}
        </div>
    </div>
    <div class="b-team__news">
        <h2>Новости чемпионата</h2>
        <div class="b-team__news__spiegel">
            <!--#include virtual="/include/tmpl-b-news-rubric-spiegel/has-xlarge-image/obj-article/project-hockey2016/is-spiegel/num-1/"-->
        </div>
        <div class="b-team__news__rubric">
            <!--#include virtual="/include/tmpl-b-news-rubric/has-large-image/obj-article/project-hockey2016/is-spiegel/num-5/offset-1/"-->
        </div>
    </div>
</div>

<div class="b-team__schedule b-schedule">
    <div class="b-schedule__body">        
        
        <div class="b-schedule__part">
            <div class="b-schedule__table">
                <table>
                {{# dates}}
                    <tr class="first">
                        <td colspan="12">{{date}} мая</td>
                    </tr>
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
                {{/ dates}}
                </table>
            </div>
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
        </div>
    </div>
</div>

<div class="b-team__consists">
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