
/**************************************************************************************
 МОДУЛИ
 *************************************************************************************/

var Tolinker = require('../../../modules/Tolinker');

RG.FascicleWidget = RG.FascicleWidget || require('../../../../blocks/crosslayouts/b-fascicle-widget/scripts/main');

$(function() {

	// var todayDay = moment().format('D');

	// RG.logger.debug('!!!!!!!!!!!!!!!');
	// RG.logger.debug($('.b-calendar__grid__month__day'));
	
	// var arr = [],
	// 	cnt = 0;
	// $('.ui-datepicker-calendar td').each(function(i, el){ 
	// 	i++;
	// 	if ((i % 8) === 0) { 
	// 		cnt++;
	// 	}
	// 	arr.push($(el));
	// });
	// RG.logger.log(arr[0]);
	// $('.ui-datepicker-calendar .forDelete').remove();

	// var table = $('<tr class="edited"/>').appendTo('.ui-datepicker-calendar');
	// for (var i = 0; i < arr.length; i++) { 		
	// 	if (((i % 7) === 0) && i !== 0) { 
	// 		table = $('<tr class="edited"/>').appendTo('.ui-datepicker-calendar');
	// 	}
	// 	$(table).append($(arr[i]));
	// }

	// $('.b-calendar__date_link').each(function(i, el){ 
	// 	let txt = $(el).text() * 1;
	// 	if (txt >= 5 && txt <= 21) { 
	// 		if (txt == todayDay) { 
	// 			$(el).addClass('is-active').css('display','block');
	// 			$(el).next('span').hide();
	// 		} else if (txt < todayDay) { 
	// 			$(el).css('display','block');
	// 			$(el).next('span').hide();
	// 		}
	// 	} else { 

	// 	}
	// });
    
});