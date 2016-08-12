module.exports = [
	{
		show: false,
		"class": "b-form__body_grey",
		title: "АККРЕДИТАЦИЯ",
		name: 'accreditation-mc',
		action: 'https://front.rg.ru/form/',
		method: 'post',
		headNotice: "<p>Тел: +7 (499) 257-59-79; +7 (903) 171-81-99</p><p>Адрес медиацентра: Москва, ул. Правды, д.24, стр.4, 9-й этаж (м. Савеловская). Аккредитация представителей СМИ на мероприятия осуществляется по электронной почте <a href=\"mailto:mediacentr@rg.ru\">mediacentr@rg.ru</a> или через оформление онлайн заявки.</p><p>Вход для представителей СМИ при предъявлении паспорта и редакционного удостоверения. Медиацентр \"Российской газеты\" оставляет за собой право отказа в аккредитации без объяснения причин.</p><p>Подписаться на новости медиацентра вы можете <a target=\"_blank\" href=\"http://mc.rg.ru/\">здесь</p><p>Мы в Instagram: rgmediacentr</p>",
        id: 4,
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
						tag: "rg-email",
						attrs: {
							placeholder: "e-mail",
							name: "email",
							required: true,
							sort: 2
						}
					}
				]
			},
			{
				field: [
					{
						tag: "rg-input",
						attrs: {
							placeholder: "Телефон",
							name: "phone",
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
                            placeholder: "Ваш комментарий",
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
				txt: "Ваша заявка отправлена.</br>В ближайшее время мы обязательно с Вами свяжемся.",
				button: "Отправить ещё заявку"
			}
		}
	}
];