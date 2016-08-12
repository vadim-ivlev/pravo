<div class="b-scores__body">
    <h2>Турнирная таблица</h2>
    <div class="b-scores__head">
        <a class="b-scores__head__uri tableTabs" href="javascript://">
            <span>Групповой турнир</span>
        </a>
        <a class="b-scores__head__uri tableTabs" href="javascript://">
            <span>плей-офф</span>
        </a>
    </div>
    <a href="javascript://" class="b-scores__full-table">Подробная таблица</a>

    <div class="b-scores__part">
    <div class="b-scores__wrapper">
    {{# groups}}
        <div class="b-scores__group">
            <div class="b-scores__group-name">{{group_name}}</div>
            <table>
                <tr>
                    <td colspan="2">страна</td>
                    <td>И</td>
                    <td class="full full_tablet">В</td>
                    <td class="full">Н</td>
                    <td class="full full_tablet">П</td>
                    <td class="full">ЗМ</td>
                    <td class="full">ПМ</td>
                    <td class="full">РМ</td>
                    <td>О</td>
                </tr>
                {{# teams}}
                    <tr class="{{country}}">
                        <!-- <td>{{num}}</td> -->
                        <td><div class="b-icon-country b-icon-country_{{country}}"></div></td>
                        <td><a href="/spec/football2016-teams/team-{{country}}/">{{country_name}}</a></td>
                        <td>{{games}}</td>
                        <td class="full full_tablet">{{wins}}</td>
                        <td class="full">{{score_tie}}</td>
                        <td class="full full_tablet">{{loses}}</td>
                        <td class="full">{{win_goals}}</td>
                        <td class="full">{{lose_goals}}</td>
                        <td class="full">{{diff_goals}}</td>
                        <td>{{points}}</td>
                    </tr>
                {{/ teams}}
            </table>   
        </div>
    {{/ groups}}
    </div>
    <a href="javascript://" class="b-scores__full-table mobile">Подробная таблица</a>
    </div>



    <div class="b-scores__part">
    <div class="b-scores__playoff b-scores__wrapper">

        {{# playoff}}
        <div class="b-scores__playoff__title">
            {{group_name}}
        </div>
        <div class="b-scores__playoff__table {{attr}}">
            {{#games}}
            <div class="b-scores__playoff__block">
                {{# game_data}}
                <div class="b-scores__game-date">{{game_data}} в {{game_time}}</div>
                {{/ game_data}}
                <div class="b-scores__playoff__game-box">
                    <div class="b-scores__playoff__team">
                        <div class="b-icon-country b-icon-country_{{first_country}}"></div>
                        <a href="/spec/football2016-teams/team-{{first_country}}/">{{first_team}}</a>
                    </div>
                    <div class="b-scores__playoff__game-score">
                        {{# not_started}}
                            - : -
                        {{/ not_started}}
                        
                        {{^ not_started}}
                            {{# trans_status}}
                                <a href="{{text_link}}">
                                    <span>{{first_score}}</span> 
                                    <span>:</span> 
                                    <span>{{second_score}}</span>
                                </a>
                            {{/ trans_status}}
                            {{^ trans_status}}
                                <span>{{first_score}}</span> 
                                <span>:</span> 
                                <span>{{second_score}}</span>
                            {{/ trans_status}}    
                        {{/ not_started}}
                    </div>
                    <div class="b-scores__playoff__team">
                        <div class="b-icon-country b-icon-country_{{second_country}}"></div>
                        <a href="/spec/football2016-teams/team-{{second_country}}/">{{second_team}}</a>
                    </div>
                </div>
            </div>
            {{/games}}
         </div>
        {{/ playoff}}

    </div>
    </div>

</div>