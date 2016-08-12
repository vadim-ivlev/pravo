var RelapObject = require('../../blocks/crosslayouts/b-relap/scripts/Relap'),
	
	blocks = [],
	relapElems = null,
	neededElems = null,
	count = 0,
	url = RG.meta.getMaterialUrl(),	
	relapObjects = {},

	// Инициализация
	init = () => {
		RG.logger.debug('Relap init');
		getParams();


		// Подписываемя на срабатывание скрипта получения данных релапа
	    RG.events.subscribe('Relap.load.groupId', function(topic, data){

	    	// Прилепляем в правый сайдбар
			$('.b-relap_rightSideBar').stick_in_parent({
		        parent: '.l-page__wrapper',
		        offset_top: 20,
		        recalc_every: 1
		    });

			// Смотрим где находимся, чтою с тестовых не отправлять пиксели
			if (RG.config.env !== 'dev') {

		        $('.b-relap').appear();

		        // Грузим пиксель инициализации
		        $('.b-relap').one('appear', function(e) {
		        	$('.b-relap').append('<img src="https://relap.io/api/v2/pixel.gif?rgid='+data+'">');
		        });

		        // Клик на новость из релапа
		        $('a.b-relap__item__link').on('click', function(){
		            var thisRecId = $(this).data('rec');

		            // Аппендим пиксель отслеживания клика
		            $('.b-relap').append('<img src="https://relap.io/api/v2/pixel.gif?rid='+thisRecId+'">');
		        });
		    
		    } else {
		    	RG.logger.log('relap\'s RG.config.env === \'dev\'');
		    }

	    });
	},

	// Подстановка в blocks data-параметров из элемента
	getParams = () => {
		
		$('.relapLoader').each(function(i, el){

			// Добавляем рандомный айди
			$(el).attr('id', `relapLoader_${Math.random().toString(36).substring(10)}`);

			// Считаем нужное кол-во новостей
			count = count + $(el).data('limit');
			blocks[i] = $(el);
			blocks[i].id = $(el).attr('id');

		});

		getData();

	},

    // Забираем данные с релапа
	getData = () => {
		
		$.ajax({
			async: false,
	        url:'https://relap.io/api/v2/similar_pages_jsonp.js?url='+url+'&limit='+count+'&callback=relapCallBack&with_description=1',
	        jsonp: false,
	        jsonpCallback: "relapCallBack",
	        // По удачному получению
	        success: function(response){
				RG.logger.debug('Relap load script');

				// Запихиваем полученние объекты в массив
				relapElems = response.recs;

				$.each(blocks, function(i, el){
					el.relaps = relapElems.splice(0, $(el).data('limit'));
					renderComponent(el);
				})

				// Выкидываем событие
				RG.events.publish('Relap.load.groupId', response.rec_group_id);
			},
			crossDomain: true,
	        dataType:'jsonp'
		});

	},

	renderComponent = (parrent) => { 

		// Рендерим компонент
		relapObjects[parrent.id] = new RelapObject({
			template: require('../../blocks/crosslayouts/b-relap/b-relap.ihtml'),
			data: {
				elems:parrent.relaps,
				title:parrent.data('title')
			},
            magic: true,
            el: parrent
		});

	};

module.exports = {
    init
};