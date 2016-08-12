$(function(){
	/*
	 var $searchLastname = $('#search-lastname'),
	 $searchFirstName = $('#search-firstname'),
	 $searchMiddleName = $('#search-middlename'),
	 $searchDate = $('#search-date'),
	 $searchResultDiv = $('#search-result'),
	 searchResult = {};
	 */
	var dataTMPL = require('../../../../blocks/custom/projects/zvezdy_pobedy/main/b-head-info/swig/tmpl.ihtml');

	var ractive = new Ractive({

		// The `el` option can be a node, an ID, or a CSS selector.
		el: '#search_form',

		// We could pass in a string, but for the sake of convenience
		// we're passing the ID of the <script> tag above.
		template: dataTMPL,


		data: function() {

			return {
				loading: 1,
				first: 0
			}
		},

		checkValues: function(values) {

			var result = false;

			$.each(values, function(i, value){
				if (!!value) {
					result = true;
				}
			});

			RG.logger.log(values);

			if (!result) {
				this.set('errorNameMsg', null);
				this.set('errorNameMsg', 'Заполните поле');
			}

			return result;
		},

		onrender: function(){

			var self = this,
				url = '//outer.rg.ru/plain/grandfather_award/index.php?callback=?';

			/*self.observe("send.*",function(newvalue, oldvalue, keypath) {

				var firstname = self.get('send.first_name');
				var middlename = self.get('send.middle_name');
				var lastname = self.get('send.last_name');

				console.log(firstname + '||' + middlename + '||' + lastname);

				self.checkValues([firstname, middlename, lastname]);

				/!*if(firstname || middlename || lastname){
					self.set('disabled',0);
				} else {
					self.set('disabled',1);
				}*!/

				//self.set('fields', [firstname, middlename, lastname]);

			});*/

			self.on({

				send: function(e) {

					self.set('loading', 1);

					//send stat
					ga('send', 'event', 'Interface', 'Star wins click' );

					var searchResult = self.get('send');

					if(self.checkValues(searchResult)) {

						//searchResult.search_action = 1;

						//var $deffered = $.getJSON(url, searchResult);
						var $deffered = $.getJSON(url, $.extend({}, searchResult, { search_action: 1 }));

						$deffered.done(function(data){

							if(data.data) {

								self.set('list', data.data);

							} else {

								RG.logger.error(data.error)

							}

						});

						$deffered.always(function(data) {
							self.set('loading', 0);
							self.set('first', 1);
						});

						$deffered.fail(function(data){
							RG.logger.error(data)
						});
					}

					return false;
				}

			})

		}

	});

	/*
	 $('#search-button').on('click', function(e){

	 e.preventDefault();



	 var url = 'http://outer.rg.ru/plain/grandfather_award/index.php?callback=?';
	 searchResult.last_name = $searchLastname.val();
	 searchResult.first_name = $searchFirstName.val();
	 searchResult.middle_name = $searchMiddleName.val();
	 searchResult.birth_year = $searchDate.val();
	 searchResult.search_action = 1;






	 });


	 */

});





