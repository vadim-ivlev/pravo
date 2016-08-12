;(function(){

'use strict';

/*
 * Infograph class
 *
 */

Ractive.DEBUG = false;

var Infograph = Ractive.extend({

	onrender: function() {

		this.on('selectItem', this.selectItem);
		this.on('hideInfo', this.hideInfo);

	},

	// Methods
	selectItem: function(e) {

		var self = this;

		self.set('overlay', true);
		self.set('show', true);

		//root disable scroll
		document.getElementById('page').style.overflow = 'hidden';

		setTimeout(function(){
			self.set('medalInfoShow', true);
			self.setCurrentMedal(e.keypath);
		}, 100);

		return false;

	},

	hideInfo: function(e) {

		var self = this,
			target_id = e.node.id,
			cur_target_id = e.original.target.id

		if (target_id === cur_target_id) {
			self.set('overlay', false);
			self.set('medalInfoShow', false);

			//root enable scroll
			document.getElementById('page').style.overflow = 'auto';

			setTimeout(function(){
				self.set('show', false);
			}, 100);
		}

	},

	setCurrentMedal: function(medal) {

		var medal = this.get(medal);

		this.set('cur_medal', {
			title: medal.title,
			establish: medal.establish,
			desc: medal.desc,
			content: medal.content,
			medal_src: medal.medal_src,
			count: medal.count,
			not_get: medal.not_get
		});

	}

});

/*
 * Init
 *
 */

$(function() {

	var infograph = null,
		dataJSON = require('../../../../blocks/custom/projects/nagrady_pobedy/main/b-static-wrapper/data/infograph.json'),
		dataTMPL = require('../../../../blocks/custom/projects/nagrady_pobedy/main/b-static-wrapper/swig/infograph_tmpl.ihtml');

		infograph = new Infograph({
			el: '#page',
			template: dataTMPL
		});

		infograph.set('infograph_list', dataJSON);

		// remove process loader
		document.getElementById('page').style.background = 'none';
});

})();