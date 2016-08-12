var 
	
	FascicleWidgetObject = require('../scripts/FascicleWidget'),

	data = require('../data/b-fascicle-widget'),

	init = () => {

		RG.logger.debug('Fascicle widget init');

		getData(data.jsonUrl);

	},

	getData = (url) => {

		$.ajax({
			url: url, 
			dataType: 'json',
			success: function(response){

				RG.logger.debug('Fascicle widget response success');				

				renderComponent(response);

				RG.events.publish('FascicleWidget.load.response', response);

			},
			xhrFields: {
				withCredentials: false
		    }
		});

	},

	renderComponent = (parrent, response) => { 

		// Рендерим компонент
		let FascicleObject = new FascicleWidgetObject({
			data: {
				elems:parrent
			},
            magic: true,
            el: $('.fascicleWidgetLoader')
		});

	}

module.exports = {
    init
};