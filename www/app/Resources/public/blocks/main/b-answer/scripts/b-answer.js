$(function () {
	if(getCookie('rating') != undefined){
        $(".js-link-btn-thanx").addClass('b-link-btn_thanx-disabled');		
	}
	function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
});

var init = function() {

    var thanx = function() {
        let id = $('.js-link-btn-thanx').attr('id');

        $.ajax({
            url: 'https://pravo.rg.ru/rating/' + id + '/',
            success: function (data) {
                function getCookie(name) {
                    var matches = document.cookie.match(new RegExp(
                        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                    ));
                    return matches ? decodeURIComponent(matches[1]) : undefined;
                }

                if((data.status == 200 || data.status == 500) && getCookie('rating') == undefined){
                    $(".b-rate__value").html(data.rating);

                    var now = new Date();
                    var expireTime = now.getTime() + 100000*360000;

                    function setCookie(name, value, expires, path, domain, secure) {

                        expires instanceof Date ? expires = expires.toGMTString() : typeof(expires) == 'number' && (expires = (new Date(+(new Date) + expires * 1e3)).toGMTString());
                        var r = [name + "=" + escape(value)], s, i;
                        for(i in s = {expires: expires, path: path, domain: domain}){
                            s[i] && r.push(i + "=" 
                                
                                + s[i]);
                        }
                        return secure && r.push("secure"), document.cookie = r.join(";"), true;
                    }

                    setCookie('rating', id, expireTime);
                } else {
                    $(".b-rate__value").html('Вы уже сказали спасибо.');
                    $(".b-rate__value").css({'font-size' : '10px'});
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    };

    $('.js-link-btn-thanx').on("click", function() {
        thanx();
        $(".js-link-btn-thanx").addClass('b-link-btn_thanx-disabled');
    });
};

module.exports = {
    init
};

