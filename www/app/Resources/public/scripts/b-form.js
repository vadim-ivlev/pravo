// // $.ajax({
// //     url: 'https://front.rg.ru/jurists/form/1/',
// //     success: function(data) {
// //         console.log(data);
// //         console.log(data.status);
// //         /*if(data.status == 200){
// //             $('.b-field__input_submit').on("click", function() {
// //                 window.location.href = '/jurists/main/0/html/';
// //             });
// //         }*/
// //     },
// //     error: function (data) {
// //         console.log(data);
// //     }
// // });
//
//
//
//
//
//
//
//
// var init = function() {
//
//     var submit = function() {
//
//         $.ajax({
//             url: 'https://front.rg.ru/jurists/form/1/',
//             success: function(data) {
//                 console.log(data);
//                 console.log(data.status);
//                 if(data.status == 200){
//                  $('.b-field__input_submit').on("click", function() {
//                  window.location.replace = '/jurists/main/0/html/';
//                  });
//                  }
//             },
//             error: function (data) {
//                 console.log(data);
//             }
//         });
//     };
//
//     $('.b-field__input_submit').on("click", function() {
//         submit();
//     });
// };
//
// module.exports = {
//     init
// };
//
/*Select = Ractive.extend(
	{
		oninit() {
			var self = this,
			items = this.get('items'),
			isObject = null;
	
			$.ajax({
				url: 'https://front.rg.ru/jurists/ask/json/',
				success: function(data) {
					var itemsDefault = self.get('items'),
					itemsNew = data.rubrics,
					itemsList = null;
	
					itemsList = itemsDefault.concat(itemsNew);
	
					self.set('items', itemsList);
				},
	
				error: function(data) {
					console.log(data);
				}
			});
		},
	}
);*/