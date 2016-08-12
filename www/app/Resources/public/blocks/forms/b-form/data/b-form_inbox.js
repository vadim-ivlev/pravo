module.exports = [
	{
		show: true,
		"class": "b-form_grey",
		name: 'inbox',
		action: 'https://front.rg.ru/form/',
		method: 'post',
		notice: '* - поля, обязательные для заполнения',
        id: 1,
		fieldset: [
			{
				field: [
					{
						tag: "rg-name",
						attrs: {
							type: "text",
							label: "Пожалуйста, представьтесь",
							required: true,
							placeholder: "Имя",
							name: "name"
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-email",
						attrs: {
							type: "text",
							label: "Ваш e-mail",
							placeholder: "e-mail",
							name: "email",
							required: true
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-select",
						mod: "white",
						attrs: {
							name: "theme",
							label: "Тема",
							items: [
								{
									value: 0,
									content: "Выбрать тему:"
								},
								{
									value: 1,
									content: "О работе сайта"
								},
								{
									value: 2,
									content: "Использование материалов \"РГ\""
								},
								{
									value: 3,
									content: "Ошибка в материале"
								},
								{
									value: 4,
									content: "Реклама в газете"
								},
								{
									value: 5,
									content: "Реклама на сайте"
								},
								{
									value: 6,
									content: "Подписка на \"РГ\""
								},
								{
									value: 7,
									content: "Подписка на электронный архив \"РГ\""
								},
								{
									value: 8,
									content: "Вопросы по подписке и доставке"
								},
								{
									value: 9,
									content: "Справки о письмах"
								},
								{
									value: 10,
									content: "Пресс-центр \"РГ\""
								},
								{
									value: 11,
									content: "Главному редактору \"РГ\""
								},
								{
									value: 12,
									content: "Шеф-редактору сайта"
								},
								{
									value: 13,
									content: "Другие вопросы"
								},
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
							type: "text",
							name: "theme_message",
							label: "Тема сообщения",
							placeholder: "Тема"
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-textarea",
						attrs: {
							type: "textarea",
							placeholder: "Текст сообщения",
							name: "message",
							label: "Ваше сообщение",
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
							text: "Отправить",
							type: "submit"
						}
					}
				]
			}
		],
		message: {
			attrs: {
                txt: "Ваше сообщение успешно отправленно.</br>В ближайшее время мы обязательно с Вами свяжемся.",
				button: "Отправить ещё сообщение"
			}
		}
	}
];