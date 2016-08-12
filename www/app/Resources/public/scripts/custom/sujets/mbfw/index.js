
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

RG.MediaNormalize = RG.MediaNormalize || require('../../../modules/MediaNormalize');
// Инициализация нормализации
RG.MediaNormalize.init();

$(function() {
// Запускаем нормализацию размеров
    RG.events.publish(`${RG.MediaNormalize._modulePrefix}.run`);

    $(window).on('resize', function(){
        RG.events.publish(`${RG.MediaNormalize._modulePrefix}.run`);
    });
});