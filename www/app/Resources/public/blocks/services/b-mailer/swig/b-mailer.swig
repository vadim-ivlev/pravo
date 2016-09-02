{[ macro.RGBi(blocks[data.headerElem]) ]}

<!-- Body -->



    <table style="font-family: arial; background: #f3f3f3; color: #000;" width="100%">
        <tr>
            <td>
                <table style="font-family: arial; background: #ffffff; margin: 30px auto 20px; display: block; width: 650px" align="center" width="650">

                    <tr>
                        <td style="width: 30px" width="30"></td>
                        <td style="border-bottom: 1px solid #dedede; padding:20px 0 18px 0;">
                            {% if (data[mod]) %}
                            
                                <table>
                                    <tr>
                                        <td>
                                            <h1 style="font-size: 22px; font-family: Arial, sans-serif; margin: 0;">{[ data[mod].title | safe ]}</h1>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 16px; font-family: Arial, sans-serif;">{[ data[mod].text | safe ]}</td>
                                    </tr>
                                    <tr>
                                        <td style="height: 15px;" height="15"></td>
                                    </tr>
                                    <tr>
                                        <td style="font-size: 13px; font-family: Arial, sans-serif; color: #999; line-height: 22px;">
                                            {% if mod !== "rejected" %}
                                                {[ data[mod].text_grey | safe ]}
                                            {% endif %}
                                        </td>
                                    </tr>
                                </table>
                                    
                            {% endif %}
                        </td>
                        <td style="width: 30px" width="30"></td>
                    </tr>

                    <tr>
                        <td style="width: 30px" width="30"></td>
                        <td align="center" style="font-size: 14px; font-weight: bold; font-family: Arial, sans-serif; padding-top: 25px;">
                            {[ data.signature | safe ]}
                        </td>
                        <td style="width: 30px" width="30"></td>
                    </tr>
                    <tr>
                        <td colspan="3" style="height: 20px;" height="20"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>



<!-- / Body -->

{[ macro.RGBi(blocks[data.footerElem]) ]}