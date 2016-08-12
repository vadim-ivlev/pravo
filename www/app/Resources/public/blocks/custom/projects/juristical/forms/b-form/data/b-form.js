module.exports = [
	{
		show: true,
		"class": "b-form__body_grey",
		title: "Задайте вопрос",
        action: 'https://front.rg.ru/jurists/form/1/',
		notice: "* - поля, обязательные для заполнения",
        id: 1,
        method: "post",
        name: "question",
		fieldset: [
			{
				field: [
					{
						tag: "rg-name",
						attrs: {
							label: "Пожалуйста, представьтесь",
							name: "name",
							required: true,
							format: "name",
							placeholder: "ФИО",
							highlight: true,
							type: "text"
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-name",
						attrs: {
							label: "Населенный пункт",
							name: "location",
							placeholder: "Ваш населенный пункт",
							highlight: true,
							type: "text"
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-email",
						attrs: {
							label: "Ваш e-mail",
							name: "email",
                            format: "email",
							required: true,
							placeholder: "ivanov@ivanov.ru",
                            highlight: true,
							type: "text"
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-select",
						attrs: {
							label: "Выберите рубрику",
							name: "select",
							mod: "white",
							required: true,
                            placeholder: "Выберите рубрику",
                            items: [
								{
									value: 0,
									content: "-- Выберите рубрику из списка --"
								}
							]
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-input",
						attrs: {
							label: "Ваш вопрос кратко",
							name: "input",
							required: true,
                            placeholder: "Введите вопрос",
							maxlength: {
								size: 150,
								show: true,
								backward: true
							},
							type: "text"
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-textarea",
						attrs: {
							label: "Ваш вопрос развернуто",
							name: "message",
							placeholder: "Введите текст",
							maxlength: {
								size: 1800,
								show: true,
								backward: true
							}
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-checkbox",
						mod: "agree",
						attrs: {
							label: "Принимаю <a class='b-link b-link_blue' href='/jurists/rules/html/' target='_blank'>правила</a> оказания юридических консультаций",
							name: "confirmation",
							type: "checkbox",
							required: true
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-submit",
						mod: "type_comment",
						attrs: {
							text: "Опубликовать",
							type: "submit"
						}
					}
				]
			}
		],
		message: {
			attrs: {
				title: "Ваш вопрос отправлен в редакцию рубрики &quot;Юридическая консультация&quot;",
				txt: "Все вопросы модерируются. Согласно <a class=\"b-link b-link_blue\" href=\"/jurists/rules/html/\">Правилам оказания юридических консультаций на сайте &laquo;Российской газеты&raquo;</a>, ваш вопрос может быть отклонен модераторами без объяснения причин. Пожалуйста, не пытайтесь отправить вопрос повторно.",
				button: "Задать вопрос"
			}
		}
	}
];