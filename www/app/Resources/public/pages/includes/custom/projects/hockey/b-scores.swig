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
        <table>
            <tr>
                <td colspan="3">{{group_name}}</td>
                <td>И</td>
                <td class="full">В</td>
                <td class="full">ВО</td>
                <td class="full">ВБ</td>
                <td class="full">П</td>
                <td class="full">ПО</td>
                <td class="full">ПБ</td>
                <td class="full">Ш</td>
                <td>О</td>
            </tr>
            {{# teams}}
                <tr>
                    <td>{{num}}</td>
                    <td><div class="b-icon-country b-icon-country_{{country}}"></div></td>
                    <td><a href="/spec/hockey2016-teams/team-{{country}}/">{{country_name}}</a></td>
                    <td>{{games}}</td>
                    <td class="full">{{wins}}</td>
                    <td class="full">{{overtimes_wins}}</td>
                    <td class="full">{{bullits_wins}}</td>
                    <td class="full">{{loses}}</td>
                    <td class="full">{{overtimes_loses}}</td>
                    <td class="full">{{bullits_loses}}</td>
                    <td class="full">{{win_goals}}</td>
                    <td>{{points}}</td>
                </tr>
            {{/ teams}}
        </table>   
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
                <div class="b-scores__game-date">{{game_data}} мая в {{game_time}}</div>
                {{/ game_data}}
                <div class="b-scores__playoff__game-box">
                    <div class="b-scores__playoff__team">
                        <div class="b-icon-country b-icon-country_{{first_country}}"></div>
                        {{first_team}}
                    </div>
                    <div class="b-scores__playoff__game-score">
                        {{# not_started}}
                            - : -
                        {{/ not_started}}
                        
                        {{^ not_started}}
                            <span>{{first_score}}</span> 
                            <span>:</span> 
                            <span>{{second_score}}</span>
                        {{/ not_started}}
                    </div>
                    <div class="b-scores__playoff__team">
                        <div class="b-icon-country b-icon-country_{{second_country}}"></div>
                        {{second_team}}
                    </div>
                </div>
            </div>
            {{/games}}
         </div>
        {{/ playoff}}

    </div>
    </div>

</div>