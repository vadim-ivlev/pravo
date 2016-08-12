module.exports = {
	general: {
		title: "Подписка через SMS на любое издание!\</br> Оформите подписку на 1 месяц!\</br> Всего 4 шага!",
		img: "/res/images/custom/statics/special_offer_02/sms.png",
		table: [
			{
				title: "Выберите издание и найдите соответствующий текст сообщения",
				row: [
					{
						col: [
							"Издание",
							"Стоимость на 1 мес., руб.",
							"текст сообщения"
						]
					},
					{
						col: [
							"Российская газета",
							"386,00",
							"РГ1"
						]
					},
					{
						col: [
							"Российская газета «Неделя»",
							"84,00",
							"РГН1"
						]
					},
					{
						col: [
							"Родина",
							"152,00",
							"РОДИНА1"
						]
					},
					{
						col: [
							"Библиотечка «Российской газеты»",
							"443,00",
							"БРГ1"
						]
					},
					{
						col: [
							"Новые законы и нормативные акты",
							"664,00",
							"НЗНА1"
						]
					}
				]
			},
			{
				title: "Отправьте бесплатную SMS, с нужным текстом сообщения, на короткий номер 3443"
			},
			{
				title: "Подтвердите оформление подписки и списание суммы заказа с номера своего мобильного телефона ответным SMS по предложенному меню"
			},
			{
				title: "Дождитесь звонка оператора для уточнения контактов, почтового адреса и начала доставки"
			}
		],
		meta: {
			title: "ВНИМАНИЕ!",
			list: [
				"Отправка SMS не тарифицируется",
				"При оплате выбранной подписки проверьте  баланс Вашего телефона",
				"Услуга предоставляется согласно \<a href='https://mixplat.ru/requirements/carriers/' target='_blank' class='b-link b-link_blue b-link_inner'>требованиям\</a> сотовых операторов МТС, Билайн, Мегафон и Теле2",
				"Оператор связывается с Вами по рабочим дням  с 10-00 до 18-00",
				"Доставка подписки осуществляется силами ФГУП «Почта России» до почтового ящика"
			]
		}
	},
	item: [
		{
			img: {
				url: "/res/images/custom/statics/special_offer_02/edu.png",
				alt: "Льготная подписка для студентов и преподавателей"
			},
			title: "Льготная подписка для студентов и преподавателей",
			text: [
				{
					item: [
						"Воспользоваться подпиской по льготным ценам могут преподаватели и студенты дневных отделений вузов и организаций среднего профессионального образования всех регионов России.",
						"\<b>Для оформления подписки необходимо выслать в редакцию:\</b>"
					]
				},
				{
					list: [
						"студентам - копию студенческого билета",
						"преподавателям - копию удостоверения преподавателя",
						"и предоставить информацию по адресу доставки. "
					]
				},
				{
					item: [
						"После получения данных вам будет выслана квитанция на оплату подписки через банк или промо-код для оплаты через сайт."
					]
				}
			],

			subTitle: "Стоимость подписки на второе полугодие 2016 года",
			select: [
				{
					item: "1 тарифная зона",
					value: 1
				},
				{
					item: "2 тарифная зона",
					value: 2
				},
				{
					item: "3 тарифная зона",
					value: 3
				},
				{
					item: "4 тарифная зона",
					value: 4
				},
				{
					item: "5 тарифная зона",
					value: 5
				},
				{
					item: "Республика Крым",
					value: 6
				}
			],
			part:[
				{
					item: "Подписка на 1 месяц",
					value: "sub-1-month"
				},
				{
					item: "Подписка на 6 месяцев",
					value: "sub-6-months"
				}
			],

			table: [
				{
					unit: [
						{
							title: "Издания",
							subtitle: [
								"Название"
							],
							rg: [
								"Российская газета"
							],
							rgWeek: [
								"Российская газета, включая РГ-Неделя"
							]
						},
						{
							title: "Подписка на 1 месяц",
							id: "sub-1-month",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"50201",
								"368,00",
								"196,67"
							],
							rgWeek: [
								"50202",
								"433,00",
								"233,99"
							]
						},
						{

							title: "Подписка на 6 месяцев",
							id: "sub-6-months",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"15589",
								"1 896,00",
								"1 180,02"
							],
							rgWeek: [
								"15588",
								"2 166,00",
								"1 403,94"
							]

						}

					],
					value: 1,
					hint: "Цены указаны в рублях с учетом НДС.",
					text: "г. Москва, Московская область, г. Санкт-Петербург, Ленинградская область, Республика Адыгея, Республика Дагестан, Республика Ингушетия, Кабардино-Балкарская Республика, Карачаево-Черкесская Республика, Республика Марий Эл, Республика Мордовия, Республика Северная Осетия-Алания, Чувашская Республика, Астраханская область, Белгородская область, Брянская область, Владимирская область, Волгоградская область, Воронежская область, Ивановская область, Калининградская область, Калужская область, Костромская область, Краснодарский край, Курская область, Липецкая область, Нижегородская область, Новгородская область, Орловская область, Пензенская область, Псковская область, Ростовская область, Рязанская область, Самарская область, Саратовская область, Смоленская область, Ставропольский край, Тамбовская область, Тверская область, Тульская область, Ульяновская область, Ярославская область, Чеченская Республика, Республика Татарстан."

				},
				{
					unit: [
						{
							title: "Издания",
							subtitle: [
								"Название"
							],
							rg: [
								"Российская газета"
							],
							rgWeek: [
								"Российская газета, включая РГ-Неделя"
							]
						},
						{
							title: "Подписка на 1 месяц",
							id: "sub-1-month",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"50201",
								"393,00",
								"221,63"
							],
							rgWeek: [
								"50202",
								"463,00",
								"263,68"
							]
						},
						{

							title: "Подписка на 6 месяцев",
							id: "sub-6-months",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"15589",
								"2 028,00",
								"1 329,76"
							],
							rgWeek: [
								"15588",
								"2 322,00",
								"1 582,08"
							]

						}

					],
					value: 2,
					hint: "Цены указаны в рублях с учетом НДС.",
					text: "Республика Калмыкия, Республика Башкортостан, Республика Карелия, Удмуртская Республика, Вологодская область, Кировская область, Курганская область, Оренбургская область, Пермский край, Свердловская область, Тюменская область, Челябинская область, Алтайский край, Республика Бурятия, Республика Коми, Республика Тыва, Республика Хакасия, Архангельская область, Иркутская область, Красноярский край, Новосибирская область, Омская область."

				},
				{
					unit: [
						{
							title: "Издания",
							subtitle: [
								"Название"
							],
							rg: [
								"Российская газета"
							],
							rgWeek: [
								"Российская газета, включая РГ-Неделя"
							]
						},
						{
							title: "Подписка на 1 месяц",
							id: "sub-1-month",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"50201",
								"394,00",
								"222,34"
							],
							rgWeek: [
								"50202",
								"464,00",
								"264,20"
							]
						},
						{

							title: "Подписка на 6 месяцев",
							id: "sub-6-months",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"15589",
								"2 034,00",
								"1 334,06"
							],
							rgWeek: [
								"15588",
								"2 328,00",
								"1 585,18"
							]

						}

					],
					value: 3,
					hint: "Цены указаны в рублях с учетом НДС.",
					text: "Приморский край, Кемеровская область, Томская область, Забайкальский край, Республика Алтай, Амурская область, Мурманская область, Еврейская АО, Хабаровский край, Ханты-Мансийский АО."

				},
				{
					unit: [
						{
							title: "Издания",
							subtitle: [
								"Название"
							],
							rg: [
								"Российская газета"
							],
							rgWeek: [
								"Российская газета, включая РГ-Неделя"
							]
						},
						{
							title: "Подписка на 1 месяц",
							id: "sub-1-month",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"50201",
								"447,00",
								"275,76"
							],
							rgWeek: [
								"50202",
								"527,00",
								"327,62"
							]
						},
						{

							title: "Подписка на 6 месяцев",
							id: "sub-6-months",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"15589",
								"2 322,00",
								"1 654,54"
							],
							rgWeek: [
								"15588",
								"2 670,00",
								"1 965,72"
							]

						}

					],
					value: 4,
					hint: "Цены указаны в рублях с учетом НДС.",
					text: "Магаданская область, Республика Саха (Якутия), Сахалинская область, Ненецкий АО, Ямало-Ненецкий АО, Камчатский край."

				},
				{
					unit: [
						{
							title: "Издания",
							subtitle: [
								"Название"
							],
							rg: [
								"Российская газета"
							],
							rgWeek: [
								"Российская газета, включая РГ-Неделя"
							]
						},
						{
							title: "Подписка на 1 месяц",
							id: "sub-1-month",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"50201",
								"583,00",
								"411,64"
							],
							rgWeek: [
								"50202",
								"688,00",
								"488,81"
							]
						},
						{

							title: "Подписка на 6 месяцев",
							id: "sub-6-months",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"15589",
								"3 054,00",
								"2 469,85"
							],
							rgWeek: [
								"15588",
								"3 540,00",
								"2 932,84"
							]

						}

					],
					value: 5,
					hint: "Цены указаны в рублях с учетом НДС.",
					text: "Чукотский АО."

				},
				{
					unit: [
						{
							title: "Издания",
							subtitle: [
								"Название"
							],
							rg: [
								"Российская газета"
							],
							rgWeek: [
								"Российская газета, включая РГ-Неделя"
							]
						},
						{
							title: "Подписка на 1 месяц",
							id: "sub-1-month",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"50201",
								"280,00",
								"150,47"
							],
							rgWeek: [
								"50202",
								"330,00",
								"179,03"
							]
						},
						{

							title: "Подписка на 6 месяцев",
							id: "sub-6-months",
							subtitle: [
								"Индекс",
								"Без скидки",
								"Со скидкой"
							],
							rg: [
								"15589",
								"1 440,00",
								"902,82"
							],
							rgWeek: [
								"15588",
								"1 644,00",
								"1 074,15"
							]

						}

					],
					value: 6,
					hint: "Цены указаны в рублях с учетом НДС."

				}
			]
		}
	]
};