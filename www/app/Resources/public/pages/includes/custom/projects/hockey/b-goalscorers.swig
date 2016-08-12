<div class="b-goalscorers__body">
    <h2>статистика бомбардиров</h2>
    <!-- <a href="javascript://" class="b-goalscorers__full-table">Все бомбардиры</a> -->
    <table>
        <tr class="mobile top">
            <td>Игрок</td>
            <td>Г+П</td>
            <td>Г</td>
            <td>П</td>
            <td>И</td>
        </tr>
        <tr class="tablet top">
            <td colspan="2">&nbsp;</td>
            <td>Игрок</td>
            <td class="tablet">Амплуа</td>
            <td>Г+П</td>
            <td>Г</td>
            <td>П</td>
            <td>И</td>
        </tr>
        {{# goalscorers}}
            <tr class="tablet">
                <td>{{num}}</td>
                <td><div class="b-icon-country b-icon-country_{{url_country}}"></div></td>
                <td>{{name}}</td>
                <td>{{prof}}</td>
                <td>{{score}}</td>
                <td>{{goals}}</td>
                <td>{{assist}}</td>
                <td>{{games}}</td>
            </tr>
            <tr class="mobile">
                <td colspan="5" class="inline">
                    <div class="b-icon-country b-icon-country_{{url_country}}"></div>
                    {{name}}
                </td>
            </tr>
            <tr class="mobile">
                <td>{{prof}}</td>
                <td>{{score}}</td>
                <td>{{goals}}</td>
                <td>{{assist}}</td>
                <td>{{games}}</td>
            </tr>
        {{/ goalscorers}}
    </table>
    <!-- <a href="javascript://" class="b-goalscorers__full-table mobile">все бомбардиры</a>     -->
</div>