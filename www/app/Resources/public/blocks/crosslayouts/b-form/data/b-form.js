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
							placeholder: "Имя Фамилия",
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
							label: "Ваш город",
							name: "location",
							placeholder: "Город",
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
							placeholder: "E-mail",
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
							label: "Ваш вопрос",
							name: "input",
							required: true,
                            placeholder: "Введите вопрос",
							maxlength: {
								size: 500,
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
							label: "Пояснения к вопросу",
							name: "message",
							placeholder: "Введите текст пояснения",
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
							label: "Принимаю <a class='b-link b-link_blue' href='/rules/'>правила</a> оказания юридических консультаций",
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
				txt: "Все вопросы модерируются. Согласно <a class='b-link b-link_blue' href='/rules/'>Правилам оказания юридических консультаций на сайте &laquo;Российской газеты&raquo;</a>, ваш вопрос может быть отклонён модераторами без объяснения причин. Пожалуйста, не пытайтесь отправить вопрос повторно. О всех этапах работы с вопросом вы будете уведомлены по электронной почте, указанной при отправке вопроса.",
				button: "Задать вопрос"
			}
		}
	}
];