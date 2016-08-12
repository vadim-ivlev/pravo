module.exports = function(data){

	return {

		blocks: [
			
			(data.mod) ? RGB('projects.' + data.mod + '.builder:project') : RGB('builder:project'), // builder
			
			(data.mod) ? RGInclude('custom/projects/'+ data.mod +'/index', 'styles') : RGInclude('project', 'styles'), // стили
			
			RGInclude('project', 'scripts'), // скрипты

			(data.mod) && RGInclude('custom/projects/'+ data.mod +'/index', 'scripts')
						
		]
	
	}
}