{[ macro.RGBi(blocks[data.headerElem]) ]}

<!-- Body -->

{% if data.body.auth %}

    <table style="font-family: sans-serif; background: #f3f3f3" width="100%">
        <tr>
            <td>
                <table style="font-family: sans-serif; background: #ffffff; margin: 20px auto; padding: 55px 35px 30px 35px; display: block;" align="center" width="650">
                    <tr>

                        <td align="center" style="font-size:22px; font-weight: bold; text-transform:uppercase; padding-bottom: 30px;">
                            {[ data.body.auth.title ]}
                        </td>

                    </tr>
                    <tr>
                        <td align="center" style="font-size: 14px; padding-bottom: 10px;">
                            {[ data.body.auth.code.title ]}
                        </td>
                    </tr>
                    <tr>
                        <td style="padding-bottom: 35px;">
                            <table>
                                <tr>
                                    <td width="245px"></td>
                                    <td width="160px" style="padding: 17px 0; font-size: 20px; border: 3px solid #f26922;" align="center">{[ data.body.auth.code.mustache ]}</td>
                                    <td width="245px"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px;padding: 0 50px 30px 50px;line-height: 1.5; border-bottom: 1px solid #dedede;" align="center">
                            Для входа в личный кабинет вставьте код в специальное поле на странице, на которой вы вводили e-mail.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table>
                                <tr>
                                    <td style="font-size:14px; line-height: 1.5; vertical-align: top; padding-right: 25px; padding-top: 30px;">
                                        Если вы случайно закрыли страницу с полем для кода, перейдите по <a href="{{refer}}" style="color:#1f77bb; text-decoration: none;">ссылке</a> (откроется новая вкладка).
                                    </td>
                                    <td style="font-size:14px; line-height: 1.5; vertical-align: top; padding-top: 30px;">
                                        Также вы можете авторизоваться, перейдя по <a href="{{tunnel}}" style="color:#1f77bb; text-decoration: none;">ссылке</a> с автоматическим вводом кода.
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}


{% if data.body.doc %}

    <table style="font-family: arial; background: #f3f3f3" width="100%">
        <tr>
            <td>
                <table style="font-family: arial; background: #ffffff; margin: 20px auto; padding: 0 23px 20px 23px; display: block" align="center" width="650">

                    {{#documents}}

                        <tr>
                            <td style="border-bottom: 1px solid #dedede; padding:20px 0 25px 0;">
                                <table>

                                    <td width="30px" style="vertical-align: top; font-size: 14px; color: #999999; padding-top: 3px;">
                                        {{num}}.
                                    </td>

                                    <td>
                                        <table>
                                            <tr>
                                                <td>
                                                    <a href="{{url}}" style="font-size: 16px; padding-bottom: 4px; color:#1f77bb; text-decoration: none;">{{{ title }}}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: 12px; color: #59bd17; padding-bottom: 11px;">
                                                    {{ date }}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                </table>
                            </td>
                        </tr>

                    {{/documents}}

                    <tr>
                        <td align="center" style="font-size: 15px; padding-top: 30px; line-height: 1.2;">
                            {[ data.body.doc.description|safe ]}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}

{% if data.body.change %}

    <table style="font-family: arial; background: #f3f3f3" width="100%">
        <tr>
            <td>
                <table style="font-family: arial; background: #ffffff; margin: 20px auto; padding: 57px 0; display: block;" align="center" width="650">
                    <tr>

                        <td align="center" style="font-size:22px; font-weight: bold; text-transform:uppercase; padding-bottom: 29px;">
                            {[ data.body.change.title ]}
                        </td>

                    </tr>
                    <tr>
                        <td align="center" style="font-size: 14px; padding-bottom: 33px;">
                            {[ data.body.change.subTitle|safe ]}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:14px; padding: 0 100px;" align="center">
                            {[ data.body.change.confirm|safe ]}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}

{% if data.body.changeConf %}

    <table style="font-family: arial; background: #f3f3f3" width="100%">
        <tr>
            <td>
                <table style="font-family: arial; background: #ffffff; margin: 20px auto; padding: 57px 0; display: block;" align="center" width="650">
                    <tr>

                        <td align="center" style="font-size:22px; font-weight: bold; text-transform:uppercase; padding-bottom: 29px;">
                            {[ data.body.changeConf.title ]}
                        </td>

                    </tr>
                    <tr>
                        <td align="center" style="font-size: 14px; padding-bottom: 33px;">
                            {[ data.body.changeConf.subTitle|safe ]}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:14px; padding: 0 100px;" align="center">
                            {[ data.body.changeConf.confirm|safe ]}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}

{% if data.body.latest %}

    <table style="font-family: arial; background: #f3f3f3" width="100%">
        <tr>
            <td>
                <table style="font-family: arial, sans-serif; background: #ffffff; margin: 20px auto; padding: 10px 30px 20px 30px; display: block;" align="center" width="650">
                    {{#materials}}
                        <tr>
                            <td>
                                <table style="border-bottom: 1px solid #dedede; padding: 20px 0; display: block;">
                                    <tr>
                                        <td style="width:480px;">
                                            <table>
                                                <tr>
                                                    <td>
                                                        <a href="{{url}}" style="font-size:18px; font-weight: bold; color:#1f77bb; text-decoration: none;">{{{ title }}}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 16px;">
                                                        {{{zag}}}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td>
                                            <img width="100px" src="{{img}}" alt="{{{title}}}">
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    {{/materials}}
                    <tr>
                        <td align="center" style="padding-top: 20px; font-size:15px; line-height: 1.4; ">
                            {[ data.body.latest.description|safe ]}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}

{% if data.body.newOnSite %}

    <table style="font-family: arial; background: #f3f3f3" width="100%">
        {{#subscriptions}}
        <tr>
            <td>
                <table style="font-family: arial, sans-serif; background: #ffffff; margin: 20px auto; padding: 18px 20px 20px 20px; border-collapse: separate;" align="center" width="650">
                    <tr>
                        <td style="font-size: 13px; font-weight: bold; color: #f36821; text-transform: uppercase; padding-bottom: 10px;">
                            {{type}}
                        </td>
                    </tr>
                    {{#sujets}}
                    <tr>
                        <td style="font-weight: bold;">
                            <a href="{{url}}" style="font-size:20px; cursor: pointer; color:#1f77bb; text-decoration: none;">{{title}}</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="width:100%;">
                                {{#materials}}
                                <tr>
                                    <td style="border-bottom: 1px solid #dedede; padding: 10px 0;">
                                        <table>
                                            <tr>
                                                <td style="font-size: 13px; color: #999999; padding-right: 25px;">
                                                    {{time}}
                                                </td>
                                                <td style="font-size: 15px;">
                                                    <a style="color: #000; text-decoration: none;" href="{{url}}" style="font-size:13px; color:#1f77bb; text-decoration: none;">{{title}}</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                {{/materials}}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 10px 0 20px 0;">
                            <a href="{{ sujetLink }}" style="font-size:13px; color:#1f77bb; text-decoration: none;">Все материалы сюжета</a>
                        </td>
                    </tr>
                    {{/sujets}}
                    {{#comments}}
                    <tr>
                        <td>
                            <table style="width:100%;">
                                <tr>
                                    <td style="font-size: 15px; font-weight: bold; padding-top: 10px">
                                        <a href="{{ url }}" style="font-size:13px; color:#1f77bb; text-decoration: none;">{{title}}</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="font-size: 13px; color: #999999; border-bottom: 1px solid #dedede; padding: 5px 0 20px 0;">
                                        {{#published}}Опубликован ваш комментарий к этой статье{{/published}}{{^published}}Пользователь {{fullName}} в {{time}} {{#newComment}}опубликовал комментарий к этой статье{{/newComment}}{{#answer}}ответил на ваш комментарий в этой статье{{/answer}}{{#mention}}упомянул вас в комментариях к этой статье{{/mention}}{{/published}}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    {{/comments}}
                </table>
            </td>
        </tr>
        {{/subscriptions}}
    </table>


{% endif %}

{% if data.body.pubComment %}

    <table style="font-family: arial; background: #f3f3f3" width="100%">
        <tr>
            <td>
                <table style="font-family: arial; background: #ffffff; margin: 20px auto; padding: 57px 100px; display: block;" align="center" width="650">
                    <tr>

                        <td align="center" style="font-size:22px; font-weight: bold; text-transform:uppercase; padding-bottom: 29px;">
                            {[ data.body.pubComment.title ]}
                        </td>

                    </tr>
                    <tr>
                        <td style="padding-bottom: 25px; border-bottom: 1px solid #dedede; margin-bottom: 20px;">
                            <table align="center">
                                <tr>
                                    <td style="padding-right: 15px;">
                                        <img src="//rg.ru/res/images/mailing/quotes.png" alt="">
                                    </td>
                                    <td>
                                        {[ data.body.pubComment.comment ]}
                                    </td>
                                </tr>
                            </table>
                        </td>

                    </tr>
                    <tr>
                        <td align="center" style="font-size: 14px; color: #999999; padding-bottom: 11px; padding-top: 20px;">
                            {[ data.body.pubComment.with ]}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size:17px; font-weight: bold;" align="center">
                            {[ data.body.pubComment.article ]}
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}

{% if data.body.text_subscribers %}

    <table style="font-family: arial, sans-serif; background: #f3f3f3;" width="100%">
        <tr>
            <td>
                <table style="font-family: arial, sans-serif; background: #ffffff; margin: 20px auto; padding: 60px; display: block;" align="center" width="650">
                    <tr>
                        <td style="font-size: 24px; text-align: center; text-transform: uppercase; font-weight: bold; padding-bottom: 30px;" >
                            {[ data.body.text_subscribers.title ]}
                        </td>
                    </tr>
                    {% for text in data.body.text_subscribers.text %}
                    <tr>
                        <td style="font-size: 15px;">
                            <p style="margin-bottom: 30px;">{[ text ]}</p>
                        </td>
                    </tr>
                    {% endfor %}
                    <tr>
                        <td style="padding-top: 30px; padding-bottom: 30px; margin-top: 10px; font-size: 18px; font-weight: bold; text-transform: uppercase; text-align: center; border-top: 1px solid #dedede">
                            <p>{[ data.body.text_subscribers.link.title|safe ]}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}

{% if data.body.text_subscribers_on_docs %}

    <table style="font-family: arial, sans-serif; background: #f3f3f3" width="100%">
        <tr>
            <td>
                <table style="font-family: arial, sans-serif; background: #ffffff; margin: 20px auto; padding: 60px; display: block;" align="center" width="650">
                    <tr>
                        <td style="font-size: 24px; text-align: center; text-transform: uppercase; font-weight: bold; padding-bottom: 30px;" >
                            {[ data.body.text_subscribers_on_docs.title ]}
                        </td>
                    </tr>
                    {% for text in data.body.text_subscribers_on_docs.text %}
                        <tr>
                            <td style="font-size: 15px;">
                                <p style="margin-bottom: 30px;">{[ text ]}</p>
                            </td>
                        </tr>
                    {% endfor %}
                    <tr>
                        <td style="padding-top: 30px; padding-bottom: 30px; margin-top: 10px; font-size: 18px; font-weight: bold; text-transform: uppercase; text-align: center; border-top: 1px solid #dedede">
                            <p>{[ data.body.text_subscribers_on_docs.link.title ]}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center;">
                            <a href="{[ data.body.text_subscribers_on_docs.link.url ]}" style="font-size:15px; color:#1f77bb;">{[ data.body.text_subscribers_on_docs.link.url ]}</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}

{% if data.body.text_subscribe_on_docs %}

    <table style="font-family: arial, sans-serif; background: #f3f3f3" width="100%">
        <tr>
            <td>
                <table style="font-family: arial, sans-serif; background: #ffffff; margin: 20px auto; padding: 60px; display: block;" align="center" width="650">
                    <tr>
                        <td style="font-size: 24px; text-align: center; text-transform: uppercase; font-weight: bold; padding-bottom: 30px;" >
                            {[ data.body.text_subscribe_on_docs.title|safe ]}
                        </td>
                    </tr>
                    {% for text in data.body.text_subscribe_on_docs.text %}
                        <tr>
                            <td style="font-size: 15px;">
                                <p style="margin: 0 0 30px 0;">{[ text|safe ]}</p>
                            </td>
                        </tr>
                    {% endfor %}
                    <tr>
                        <td style="font-size: 15px;">
                            <p style="margin: 0;">
                                Приятного чтения!
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table style="font-family: arial; background: #ffffff;" align="center" width="650">

                                {{#documents}}

                                <tr>
                                    <td style="border-bottom:1px solid #dedede;padding:30px 0 30px 0;">
                                        <table>

                                            <td width="30px" style="vertical-align: top; font-size: 14px; color: #999999; padding-top: 3px;">
                                                {{num}}.
                                            </td>

                                            <td>
                                                <table>
                                                    <tr>
                                                        <td>
                                                            <a href="{{url}}" style="font-size: 16px; color:#1f77bb; text-decoration: none;">{{{ title }}}</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size: 12px; color: #59bd17; ">
                                                            {{ date }}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>

                                        </table>
                                    </td>
                                </tr>

                                {{/documents}}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="margin: 30px 0 0 0; font-size: 18px; font-weight: bold; text-transform: uppercase; text-align: center;">
                            <p style="margin: 30px 0 0 0;">{[ data.body.text_subscribe_on_docs.link.title|safe ]}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}

{% if data.body.text_nots_for_new %}

    <table style="font-family: arial, sans-serif; background: #f3f3f3" width="100%">
        <tr>
            <td>
                <table style="font-family: arial, sans-serif; background: #ffffff; margin: 20px auto; padding: 60px; display: block;" align="center" width="650">
                    <tr>
                        <td style="font-size: 24px; text-align: center; text-transform: uppercase; font-weight: bold; padding-bottom: 30px;" >
                            {[ data.body.text_nots_for_new.title ]}
                        </td>
                    </tr>
                    {% for text in data.body.text_nots_for_new.text %}
                        <tr>
                            <td style="font-size: 15px;">
                                <p style="margin: 0 0 30px 0;">{[ text|safe ]}</p>
                            </td>
                        </tr>
                    {% endfor %}
                    <tr>
                        <td>
                            <table style="font-family: arial, sans-serif; background: #ffffff;" align="center" width="650">
                                {{#materials}}
                                    <tr>
                                        <td style="margin: 0; padding: 0;">
                                            <table style="border-bottom:1px solid #dedede; padding:20px 0">
                                                <tr>
                                                    <td style="width:540px;">
                                                        <table>
                                                            <tr>
                                                                <td>
                                                                    <a href="{{url}}" style="font-size:18px; font-weight: bold; color:#1f77bb; text-decoration: none;">{{{ title }}}</a>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td style="font-size: 15px; ">
                                                                    {{{zag}}}
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td>
                                                        <img width="100px" src="{{img}}" alt="{{{title}}}">
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                {{/materials}}
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 15px;">
                            <p style="text-align: center; margin: 30px 0 0 0;">Следите за обновлениями сайта: скоро будут запущены новые рассылки - по рубрикам, спецпроектам и другие.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 18px; font-weight: bold; text-transform: uppercase; text-align: center;">
                            <p style="margin: 30px 0 0 0;">{[ data.body.text_nots_for_new.link.title|safe ]}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

{% endif %}

<!-- / Body -->

{[ macro.RGBi(blocks[data.footerElem]) ]}