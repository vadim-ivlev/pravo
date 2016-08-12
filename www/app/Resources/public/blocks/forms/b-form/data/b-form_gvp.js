module.exports = [
	{
		show: true,
		"class": "b-form__body_grey",
		title: "Задать вопрос ГВП",
		name: 'gvp',
		action: 'https://front.rg.ru/form/',
		method: 'post',
        id: 2,
		fieldset: [
			{
				field: [
					{
						tag: "rg-name",
						attrs: {
                            required: true,
                            name: "name",
							placeholder: "Имя",
                            sort: 1
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-input",
						attrs: {
                            name: "city",
							type: "text",
                            required: true,
							placeholder: "Город",
                            sort: 2
						}
					}
				]
			},
            {
                field: [
                    {
                        tag: "rg-email",
                        attrs: {
                            placeholder: "e-mail",
                            name: "email",
                            required: true,
                            sort: 3
                        }
                    }
                ]
            },
            {
                field: [
                    {
                        tag: "rg-textarea",
                        attrs: {
                            placeholder: "Текст сообщения",
                            name: "message",
                            required: true,
                            sort: 4
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
				txt: "Спасибо, Ваш вопрос успешно отправлен",
				button: "Задать ещё вопрос"
			}
		}
	}
];