$(function() {

window.GallRoute = {
	
	parseHash: function(hash) {
	
		var hash_data = hash.substring(1).split('/'),
			gallery_meta = null,
			num_photo = null,
			hash_data_obj = {};
			
		if(!!hash_data[1]) {
			
			gallery_meta = hash_data[1].split('_');
			num_photo = hash_data[2];
				
			hash_data_obj.option_id = gallery_meta[0];
			hash_data_obj.gallery_id = gallery_meta[1];
			hash_data_obj.num_photo = num_photo;
			hash_data_obj.gall_builder_keypath = hash_data_obj.option_id + '_' + hash_data_obj.gallery_id;
			
			if (hash_data_obj.num_photo) {
			
				hash_data_obj.has_valid = true;
				
			} else {
			
				hash_data_obj.has_valid = false;
			
			}
		
		} else {
		
			hash_data_obj.has_valid = false;
		
		}
	
		this.hash_data = hash_data_obj;
	
	},
	
	setHash: function(hash_data) {
	
		if(!hash_data.clear_hash) {
		
			var option_id = (hash_data.option_id != undefined) ? hash_data.option_id : this.hash_data.option_id,
				gallery_id = (hash_data.gallery_id != undefined) ? hash_data.gallery_id : this.hash_data.gallery_id,
				num_photo = (hash_data.num_photo != undefined) ? hash_data.num_photo : 0;
			
			location.hash = '#/' + option_id + '_' + gallery_id + '/' + (num_photo*1 + 1) + '/';
			
			this.hash_data.option_id = option_id;
			this.hash_data.gallery_id = gallery_id;
			this.hash_data.num_photo = num_photo;
		
		} else {
		
			location.hash = '#/';
		
		}
			
		return this;
		
	},

	init: function() {
	
		var _this = this,
			hash = location.hash,
			GalleryBuilder = null,
			interval_gb_id = null;
			
		//get hash data
		_this.parseHash(hash);
		
		if (_this.hash_data.has_valid) {
			
			//if gallery from top5 else in current page 
			if (!$('#rgG' + _this.hash_data.option_id).length) {
				
				var option_id = _this.hash_data.option_id,
					gallery_id = _this.hash_data.gallery_id,
					num_photo = _this.hash_data.num_photo,
					
					$targetEl = $('.content-ar1');
				
					$targetEl.after($('<div>', { 'id': 'rgG1', 'class': 'rg-gall-any' }));

				var top_gall = rgG(option_id, gallery_id, { 
					setNoPrev: true,
					withoutDummy: true,
					showOverlay: true,
					deleteOnClose: function() {
						
						$('#rgG1').remove();
						window['gall_' + gallery_id] = null;
						
						_this.setHash({ clear_hash: true });
						
					} 
				});
		
			} else {
			
				interval_gb_id = setInterval(function() {
				
					GalleryBuilder = window['gall_' + _this.hash_data.gall_builder_keypath];
					
					//if gallsery found
					if (!!GalleryBuilder && !!GalleryBuilder._gallData) {
					
						clearInterval(interval_gb_id);
						
						GalleryBuilder.openMainGall();
						
						GalleryBuilder._meta.user_photo_index = (_this.hash_data.num_photo - 1);
						
						setTimeout(function() {
						
							$(window).scrollTop($('#rgG_'+ _this.hash_data.gall_builder_keypath).offset().top - 100);
							
						}, 500);
						
					}
					
				}, 1000);
			
			}
			
		}
	
	}

};

GallRoute.init();

});