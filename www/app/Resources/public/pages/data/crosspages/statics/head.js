module.exports = function(data){

	return {

		blocks: [

			(data.mod) ? RGInclude('custom/statics/'+ data.mod +'/index', 'styles') : RGInclude('static', 'styles'), // стили
			
			RGInclude('static', 'scripts'), // скрипты

			(data.mod) && RGInclude('custom/statics/'+ data.mod +'/index', 'scripts')
			
		]

	}
};