module.exports = [
	{
		show: true,
		"class": "b-form__body_grey",
		title: "Откликнуться на вакансию",
        action: 'https://front.rg.ru/form/',
		notice: "* - поля, обязательные для заполнения",
        id: 3,
        method: "post",
        name: "vacancies",
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
							placeholder: "Имя",
                            highlight: true
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
                            highlight: true
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-select",
						attrs: {
							label: "Выберите вакансию",
							name: "vacancies",
							mod: "white",
							required: true,
                            placeholder: "Тип вакансии",
                            items: [
                            	{
                                    value: "",
                                    content: "Выберите вакансию",
								},
								{
                                    value: "redactor",
                                    content: "Редактор",
								}
							]
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-url",
						attrs: {
							label: "Ссылка на резюме",
							name: "resume",
                            format: "url",
                            placeholder: "Ссылка на резюме",
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-textarea",
						attrs: {
							label: "Ваше сообщение",
							name: "message",
							placeholder: "Текст сообщения",
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