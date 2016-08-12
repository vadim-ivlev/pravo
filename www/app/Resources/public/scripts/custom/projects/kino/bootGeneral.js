/*
 * Boot
 * Запуск модулей для всех страниц
 *
 */

// Запуск, по DOM Ready
$(function() {
// Content here

    /*
     * Setup Bttrlazyloading
     * Инициализация библиотеки лейзи лоада
     *
     */

    // Настройка пограничных разрешений
    // сравнение, как меньше, то есть
    // xs применяется, когда ширина экрана, меньше 450px
    $.bttrlazyloading.setRanges({
      'xs': 450, // phones
      'sm': 600, // tablets
      'md': 800, // desktop
      'lg': 1000 // extra desctop
    });

    // Подставляем нужный нам плейсхолдер
    $.bttrlazyloading.setOptions({
        placeholder: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHdpZHRoPSc2MHB4JyBoZWlnaHQ9JzYwcHgnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaWRZTWlkIiBjbGFzcz0idWlsLXJpbmctYWx0Ij48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0ibm9uZSIgY2xhc3M9ImJrIj48L3JlY3Q+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNDAiIHN0cm9rZT0iI2Y5ZjlmOSIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48L2NpcmNsZT48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0MCIgc3Ryb2tlPSIjZDdkZGU0IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hvZmZzZXQiIGR1cj0iM3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiBmcm9tPSIwIiB0bz0iNTAyIj48L2FuaW1hdGU+PGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ic3Ryb2tlLWRhc2hhcnJheSIgZHVyPSIzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIHZhbHVlcz0iMjAwLjggNTAuMTk5OTk5OTk5OTk5OTk7MSAyNTA7MjAwLjggNTAuMTk5OTk5OTk5OTk5OTkiPjwvYW5pbWF0ZT48L2NpcmNsZT48L3N2Zz4='
    });

    // Пробегаемся по всем элементам и подключаем библиотеку
    $('.material__cover__pic__item').bttrlazyloading();

    // Adaptive menu
    $('#menuBtnHamburger').sidr({
        name: 'mobileMenuTarget',
        source: '#menuBtnHamburgerSrc',
        side: 'right',
        displace : false,
        onOpen: function(){

            $('body').addClass('header-menuBtn-hamburger_open');

            $('#cboxOverlay').show();

            $('#hamburgerBlock').addClass('header-menuBtn-hamburger__layer--to-arrow');
            $('#hamburgerBlock').removeClass('header-menuBtn-hamburger__layer--from-arrow');

        },
        onClose: function(){

            $('body').removeClass('header-menuBtn-hamburger_open');

            $('#cboxOverlay').hide();
            
            $('#hamburgerBlock').addClass('header-menuBtn-hamburger__layer--from-arrow');
            $('#hamburgerBlock').removeClass('header-menuBtn-hamburger__layer--to-arrow');
        
        }
    });

    $('#cboxOverlay').on('click', function(){

        if($('body').hasClass('header-menuBtn-hamburger_open'))
            $.sidr('close', 'mobileMenuTarget');

    });


});