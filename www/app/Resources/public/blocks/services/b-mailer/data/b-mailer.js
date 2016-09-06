module.exports = {
	
	headerElem: "header",
	footerElem: "footer",

	sent: {
		title: "<span style='color: #000;'>Ваш вопрос отправлен на модерацию</span>",
		text: "<p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Здравствуйте!</p><p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Вы задали вопрос в разделе <a style='color: #1f77bb; text-decoration: none;' href='https://pravo.rg.ru#letter/pravo/msg'>&laquo;Юридическая консультация&raquo;</a> на сайте <a style='color: #1f77bb; text-decoration: none;' href='https://rg.ru#letter/pravo'>&laquo;Российской газеты&raquo;</a>.</p><p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Все вопросы модерируются. Согласно <a style='color: #1f77bb; text-decoration: none;' href='https://pravo.rg.ru/rules/#letter/pravo/rules'>Правилам оказания юридических услуг на сайте &quot;Российской газеты&quot;</a>, ваш вопрос может быть отклонен модераторами без объяснения причин.</p><p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>В любом случае, вы получите уведомление на ваш адрес электронной почты о том, принят ли ваш вопрос к рассмотрению или нет. После публикации ответа вам также придет уведомление со ссылкой на него.</p>",
		text_grey: "<p style='margin-top: 0; margin-bottom: 0;'>Все вопросы на сайте &quot;Российской газеты&quot; имеют автора (ваши имя и фамилия, указанные при отправке вопроса). Текст вопроса может быть отредактирован редакцией без согласования с его автором.</p>"
	},
	rejected: {
		title: "<span style='color: #f32121'>Ваш вопрос отклонен</span>",
		text: "<p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Здравствуйте!</p><p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Вы задали вопрос в разделе <a style='color: #1f77bb; text-decoration: none;' href='https://pravo.rg.ru#letter/pravo/msg'>&laquo;Юридическая консультация&raquo;</a> на сайте <a style='color: #1f77bb; text-decoration: none;' href='https://rg.ru#letter/pravo'>&laquo;Российской газеты&raquo;</a>.</p><p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>К сожалению, ваш вопрос отклонен модератором, что допускается <a style='color: #1f77bb; text-decoration: none;' href='https://pravo.rg.ru/rules/#letter/pravo/rules'>Правилами оказания юридических услуг на сайте &quot;Российской газеты&quot;</a>, условия которых вы приняли перед отправкой вопроса.</p>"
	},
	accepted: {
		title: "<span style='color: #59bd17;'>Ваш вопрос принят</span>",
		text: "<p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Здравствуйте!</p><p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Вы задали вопрос в разделе <a style='color: #1f77bb; text-decoration: none;' href='https://pravo.rg.ru#letter/pravo/msg'>&laquo;Юридическая консультация&raquo;</a> на сайте <a style='color: #1f77bb; text-decoration: none;' href='https://rg.ru#letter/pravo'>&laquo;Российской газеты&raquo;</a>.</p><p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Ваш вопрос принят модератором. После подготовки и публикации ответа вы получите ссылку на него.</p>",
		text_grey: "<p style='margin-top:0; margin-bottom: 0;'>Все вопросы на сайте &quot;Российской газеты&quot; имеют автора (ваши имя и фамилия, указанные при отправке вопроса). Текст вопроса может быть отредактирован редакцией без согласования с его автором.</p>"
	},
	published: {
		title: "<span style='color: #000;'>Опубликован ответ на ваш вопрос</span>",
		text: "<p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Здравствуйте!</p><p style='line-height: 24px; margin-top: 10px; margin-bottom: 0;'>Вы задали вопрос в разделе <a style='color: #1f77bb; text-decoration: none;' href='https://pravo.rg.ru#letter/pravo/msg'>&laquo;Юридическая консультация&raquo;</a> на сайте <a style='color: #1f77bb; text-decoration: none;' href='https://rg.ru#letter/pravo'>&laquo;Российской газеты&raquo;</a>.</p><p style='line-height: 24px; margin-bottom: 0;'>Ответ на него опубликован и доступен по этой <a style='color: #1f77bb; text-decoration: none;' href='{{ answer_link }}'>ссылке</a>.</p>",
		text_grey: "<p style='margin-top:0; margin-bottom: 0;'>Напоминаем, что все вопросы на сайте &quot;Российской газеты&quot; имеют автора (ваши имя и фамилия, указанные при отправке вопроса). Текст вопроса может быть отредактирован редакцией без согласования с его автором.</p><p>Если вы решили связаться с юристом, ответившим на ваш вопрос, обращаем ваше внимание, что любые юридические консультации за пределами сайта &quot;Российской газеты&quot;, как правило, платные. &quot;Российская газета&quot; не несет никакой ответственности за их качество и стоимость.</p>"
	},

	signature: "Редакция раздела <a style='color: #000; text-decoration: none;' href='https://pravo.rg.ru#letter/pravo/footer'>&laquo;Юридическая консультация&raquo;</a> на сайте &laquo;Российской газеты&raquo;"

};