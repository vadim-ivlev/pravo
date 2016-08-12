module.exports = [
	{
		show: false,
		"class": "b-form__body_grey",
		title: "Форма Делового завтрака",
		name: 'business-breakfast',
		action: 'https://front.rg.ru/form/',
		method: 'post',
        id: 5,
		fieldset: [
			{
				field: [
					{
						tag: "rg-name",
						attrs: {
                            required: true,
                            name: "name",
							placeholder: "Пожалуйста, представьтесь",
                            sort: 1
						}
					}
				]
			},
            {
                field: [
                    {
                        tag: "rg-email",
                        attrs: {
                            placeholder: "E-mail",
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
                            placeholder: "Ваш вопрос",
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