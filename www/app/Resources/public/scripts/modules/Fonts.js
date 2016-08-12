// @fontLsKey - ключ шрифта в Local Storage
// Проверяем, если в Local Storage нет CSS файла со шрифтом
// то грузим по ссылке @fontUrl, сохраняем в Local Storage и вставляем в head инлайном

(function() {

	var

		// сохраняем в переменную глобальный localStorage
		localStorage = window.localStorage,

		// ключ шрифта в Local Storage
		fontLsKey = 'notoFamily_v1',

		// ссылка на шрифт
		fontUrl = '/res/fonts/rg/noto.woff.min.css',

		localFont = null,

		// Проверка на переполнение хранилища
		isQuotaExceeded = function(e) {

			var quotaExceeded = false;

			if (e) {

				if (e.code) {

					switch (e.code) {
						case 22:
							quotaExceeded = true;
							break;

						case 1014:
							// Firefox
							if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
								quotaExceeded = true;
							}
							break;
					}

				} else if (e.number === -2147024882) {

					// Internet Explorer 8
					quotaExceeded = true;
				}

			}

			return quotaExceeded;
		},
	
		// Создаем снлайн стили со шрифтом
		createStyle = function(txt) {
		 
			var style = document.createElement('style');
			
				style.textContent = txt;
				style.rel = 'stylesheet';

				document.head.appendChild(style);
		};

		// Запускаем модуль
		try {

			localFont = localStorage.getItem(fontLsKey);

			// Если в локальном хранилище есть шрифт
			if (!!localFont) {
			
				// Вставляем его
				createStyle(localFont);
				
			} else {
			
				// Если нет - загружаем асинхронно
				// и сохраняем в локальное хранилище
				var request = new XMLHttpRequest();

					request.open('GET', fontUrl, true);

					request.onload = function() {
					
						if (request.status >= 200 && request.status < 400) {

								try {
							
									// Вставляем шрифт
									createStyle(request.responseText);

									// Сохраняем в браузер
									localStorage.setItem(fontLsKey, request.responseText);

								} catch(error) {

									// Проверяем, если хранилище полное
									if (isQuotaExceeded(error)) {
										throw new Error('Локальное хранилище переполнено');
									}

								}
							
						}
						
					}

					request.send();
			}

		} catch(error) {
			throw new Error(error);
		}

})();