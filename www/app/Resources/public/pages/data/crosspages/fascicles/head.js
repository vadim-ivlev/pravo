module.exports = function(data){

	return {

		blocks: [
			
			(data.mod) ? RGInclude('custom/fascicles/'+ data.mod +'/index', 'styles') : RGInclude('fascicles', 'styles'), // стили

			RGInclude('fascicles', 'scripts'), // скрипты
			
			(data.mod) && RGInclude('custom/fascicles/'+ data.mod +'/index', 'scripts')
						
		]
	
	}
}