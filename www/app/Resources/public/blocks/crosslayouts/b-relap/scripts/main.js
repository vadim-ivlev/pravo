var elems = null,
	getPars = null;

// Функция получения данных из сервиса relap.io
getPars = function(count, url) {
	$.ajax({
		async: false,
        url:'https://relap.io/api/v2/similar_pages_jsonp.js?url='+url+'&limit='+count+'&callback=relapCallBack&with_description=1',
        jsonp: false,
        jsonpCallback: "relapCallBack",
        // По удачному получению
        success: function(response){
			RG.logger.debug('Relap load script');

			// Запихиваем полученние объекты в массив
			elems = response.recs;

			// Выкидываем событие
			RG.events.publish('Relap.load.script', elems);
			RG.events.publish('Relap.load.groupId', response.rec_group_id);
		},
		crossDomain: true,
        dataType:'jsonp'
	});
}


module.exports = {
    getPars,
    elems
};