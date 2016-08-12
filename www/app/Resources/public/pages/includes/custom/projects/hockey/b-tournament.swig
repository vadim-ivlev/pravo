<div class="b-tournament__body">
    <h2>Турнирная таблица</h2>
    {{# groups}}
        <table>
            <tr>
                <td colspan="3">{{group_name}}</td>
                <td>И</td>
                <td>О</td>
            </tr>
            {{# teams}}
                <tr>
                    <td>-</td>
                    <td><div class="b-icon-country b-icon-country_{{country}}"></div></td>
                    <td>{{country_name}}</td>
                    <td>{{games}}</td>
                    <td>{{points}}</td>
                </tr>
            {{/ teams}}
        </table>    
    {{/ groups}}
</div>