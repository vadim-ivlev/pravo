// $(function () {
//     let site = window.location.href;
//     let target = "rg.ru";
//
//     let urlTargetPosition = site.indexOf(target);
//
//     if( urlTargetPosition != -1 ) {
//
//         let urlSubstring = site.substring(urlTargetPosition + target.length);
//         //console.log(urlSubstring);
//         $.each($('.b-categories_sidebar').find('.b-categories__item'), function(){
//             console.log($(this).find('a.b-categories__link').attr('href') + ' = ' + urlSubstring );
//             if( $(this).find('a.b-categories__link').attr('href') == urlSubstring ) {
//                 $(this).addClass('b-categories__item_active');
//             }
//         });
//     }
// });