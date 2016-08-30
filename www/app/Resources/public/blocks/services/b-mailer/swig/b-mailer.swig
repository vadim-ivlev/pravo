{[ macro.RGBi(blocks[data.headerElem]) ]}

<!-- Body -->

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

<!-- / Body -->

{[ macro.RGBi(blocks[data.footerElem]) ]}