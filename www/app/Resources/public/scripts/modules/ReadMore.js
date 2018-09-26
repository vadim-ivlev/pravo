/*
 * Модуль формирования врезок
 *
 */

 var ReadMore = function() {

 	var articleText = document.querySelector('.js-answer-text'),
 		toReplacePositions = articleText.innerHTML.match(/\(\(\d+\)\)/gi),
		outletsJson = JSON.parse(document.querySelector('.outlets-json').innerHTML);

  	articleText.innerHTML = articleText.innerHTML.replace(/\<p.+\(\(\d+\)\)\<\/p\>/gi, m => {
  		let obj = outletsJson.find(el => {
  			return el.id === m.match(/(\d+)/gi)[0];    
  		});
  		// if (!/outlets-json/gi.test(m)) {
  		return `<div class="b-read-more b-read-more_${obj.float}"><a class="b-read-more__link" href="${obj.href}">${obj.title}</a></div>`
  		// }
  		// return m;
	});

 };

 module.exports = ReadMore;