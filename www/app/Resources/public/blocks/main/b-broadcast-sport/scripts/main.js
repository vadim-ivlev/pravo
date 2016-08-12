var init = () => { 

    RG.logger.debug('BroadcastSport');

    var     

        // элемент меню
        elem = $('.b-broadcast-sport__menu'),
        
        // спасение от прыгающего меню + зацепка для прыгания вверх
        stickSide = $('.b-broadcast-sport__menu__spacer').offset().top,
        
        // обёртка
        wrapper = $('.b-broadcast-sport__wrapper'),
        
        // нижняя граница обёртки
        bottomSide = wrapper.offset().top + wrapper.outerHeight(),
        
        // размер прокрутки сраницы
        windowScroll = $(window).scrollTop();

    // проверка позиции скролла при загрузке
    if (windowScroll > stickSide && windowScroll < bottomSide-71) {

        $(elem).addClass('is-fixed');

    } else {

        $(elem).removeClass('is-fixed');

    }

    $(window).on('scroll', function() {

        // меняем размер прокрутки сраницы
        windowScroll = $(window).scrollTop();

        // проверка позиции скролла при скролле
        if (windowScroll > stickSide && windowScroll < (bottomSide-71)) {

            $(elem).addClass('is-fixed');

            $('a', elem).on('click', function(){ 

                // если меню зафиксированно
                if($(elem).hasClass('is-fixed')) {

                    // првоеряем на существование методов, ибо почему-то в фф и хром они разные :(
                    if (document.documentElement.scrollTop) { 

                        // сопсно это фф
                        document.documentElement.scrollTop = stickSide;

                    } else if (document.body.scrollTop) { 

                        // сопсно это хром
                        document.body.scrollTop = stickSide;

                    }
                }
            });

        } else {

            $(elem).removeClass('is-fixed');

        }

        // переинициализируем нижнюю границу, ведь высота контента у вкладок разная
        bottomSide = wrapper.offset().top + wrapper.outerHeight();

    });


};


module.exports = {
    init
};

