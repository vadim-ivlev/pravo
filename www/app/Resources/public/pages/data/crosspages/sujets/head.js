module.exports = function(data){

	return {

		blocks: [

			(data.mod) ? RGB('sujets.' + data.mod + '.builder:sujets-custom') : RGB('builder:sujets'), // builder
			
			(data.mod) ? RGInclude('custom/sujets/'+ data.mod +'/index', 'styles') : RGInclude('sujet', 'styles'), // стили
			
			RGInclude('sujet', 'scripts'), // скрипты

			(data.mod) && RGInclude('custom/sujets/'+ data.mod +'/index', 'scripts')  // кастомные скрипты
						
		]
	
	}
}