/*
 * Контроллер блока документов на главной
 *
 */

var
	
	init = () => {

		var $title = $('.b-docs .b-docs__title');

		$title.each(function(e, el){

			var $el = $(el),
				$link = $el.find('.b-docs__link'),

				bufferText = null,
				textLength = null,
				matchIndex = null;

			// Получаем текст ссылки
			bufferText = $link.html();

			// Длина текста
			textLength = bufferText.length;

			// Индекс первой ковычки
			matchIndex = bufferText.indexOf('"');

			// Добавляем вступление
			$link.before(bufferText.substring(0, matchIndex));

			// Меняем ссылку
			$link.html(bufferText.substring(matchIndex, textLength));

		});

	};

module.exports = {
	init
};