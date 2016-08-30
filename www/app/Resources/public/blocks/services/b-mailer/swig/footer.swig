<!-- Footer -->
<table style="font-family: arial, sans-serif; display: block; margin: 20px auto;" width="650px">
    <tr>
        <td>
            <table align="center" style="border-spacing: 6px 18px;" width="650">
                <tr>
                    <td style="width: 100px">
                        <a href="mailto:dev@rg.ru" style="font-size:12px; color:#1f77bb">Техподдержка</a>
                    </td>
                    <td style="width: 100px">
                        <a href="//rg.ru/account/profile&#35;letter" style="font-size:12px; color:#1f77bb">Личный кабинет</a>
                    </td>
                    {{#unsubscribe}}
                        <td style="width: 135px">
                            <a href="{{unsubscribe}}" style="font-size:12px; color:#1f77bb">Отписаться от рассылки</a>
                        </td>
                    {{/unsubscribe}}

                    <td style="width: 0px">
                    </td>
                    {% for socLinks in data.socLinks %}
                        <td style="width: 30px; height: 30px;">
                            <a style="display: block; width: 100%; height: 100%;" title="{[ socLinks.name ]}" target="_blank" href="{[ socLinks.url ]}">
                                <img src="//rg.ru/res/images/mailing/{[ socLinks.name ]}_soc_icon.png" alt="">
                            </a>
                        </td>
                    {% endfor %}
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table align="center" width="650">
                <tr>
                    <td align="center" style=" border-top: 1px solid #dedede; font-size: 13px; color:#999999; padding-top: 27px; line-height: 1.6;">
                        {[ data.meta ]}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td>
            <table align="center" width="650" style="padding-top: 15px;">
                <tr>
                    <td align="center" style="font-size: 13px; font-weight: bold;">
                        {[ data.copy ]}
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
<!-- / Footer -->