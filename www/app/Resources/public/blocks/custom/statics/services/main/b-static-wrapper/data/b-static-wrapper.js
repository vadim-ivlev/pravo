module.exports =
	{
		row: {
			itemMobile: {
				title: "Мобильные приложения «Российской газеты»",
				itemLeft: {
					list: [
						"Главные новости дня, видео и фоторепортажи.",
						"Новости по разделам.",
						"Свежий выпуск «РГ».",
						"Круглосуточное обновление.",
						"Удобная навигация."
					],
					text: "Мобильные приложения «РГ» разработаны для устройств с операционными системами Android, iOS и WP. Все материалы приложений доступны бесплатно.",
					images: [
						{
							imgUrl:"/res/images/custom/statics/services/apple-store.png",
							link: "http://itunes.apple.com/app/id399188282"
						},
						{
							imgUrl:"/res/images/custom/statics/services/google-play.png",
							link: "https://play.google.com/store/apps/details?id=com.rg.android.newspaper.main"
						},
						{
							imgUrl:"/res/images/custom/statics/services/windows-store.png",
							link: "http://www.windowsphone.com/ru-RU/apps/144edb8d-227e-48af-a3a2-7a75e142cdf2"
						}

					]
				},
				itemRight: {
					imageUrl: "/res/images/custom/statics/services/mobile_apps.png"
				}
			},
			itemRss: {
				title: "RSS-ленты",
				item: [
					{
						position: "has-left",
						table: [
							{
								title: "Главное",
								item: [
									{
										text: "Все материалы",
										rss: "/tema/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/rss.xml"
									},
									{
										text: "Документы",
										rss: "/tema/doc-any/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/doc-any/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/doc-any/rss.xml"
									}

								]
							},
							{
								title: "Издания",
								item: [
									{
										text: "«Российская газета»",
										rss: "/tema/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/rss.xml"
									},
									{
										text: "«Российская газета - Неделя»",
										rss: "/tema/izd-subbota/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/izd-subbota/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/izd-subbota/rss.xml"
									}

								]
							},
							{
								title: "Рубрики",
								item: [
									{
										text: "Государство",
										rss: "/tema/gos/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/gos/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/gos/rss.xml"
									},
									{
										text: "Экономика",
										rss: "/tema/ekonomika/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/ekonomika/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/ekonomika/rss.xml"
									},
									{
										text: "В мире",
										rss: "/tema/mir/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/mir/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/mir/rss.xml"
									},
									{
										text: "Происшествия",
										rss: "/tema/bezopasnost/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/bezopasnost/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/bezopasnost/rss.xml"
									},
									{
										text: "Общество",
										rss: "/tema/obshestvo/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/obshestvo/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/obshestvo/rss.xml"
									},
									{
										text: "Культура",
										rss: "//rg.ru/tema/kultura/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/kultura/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/kultura/rss.xml"
									},
									{
										text: "Спорт",
										rss: "/tema/sport/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/tema/sport/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/tema/sport/rss.xml"
									}

								]
							}
						]
					},
					{
						position: "has-right",
						table: [
							{
								title: "Регионы",
								item: [
									{
										text: "Башкортостан",
										rss: "/org/filial/bashkortostan/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/bashkortostan/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/bashkortostan/rss.xml"
									},
									{
										text: "Волга-Кама",
										rss: "/org/filial/volga-kama/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/volga-kama/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/volga-kama/rss.xml"
									},
									{
										text: "Восточная Сибирь",
										rss: "/org/filial/enisey/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/enisey/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/enisey/rss.xml"
									},
									{
										text: "Дальний Восток",
										rss: "/org/filial/dvostok/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/dvostok/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/dvostok/rss.xml"
									},
									{
										text: "Кубань. Северный Кавказ",
										rss: "/org/filial/kuban/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/kuban/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/kuban/rss.xml"
									},
									{
										text: "Пермский край",
										rss: "/org/filial/permkray/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/permkray/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/permkray/rss.xml"
									},
									{
										text: "Приволжье",
										rss: "/org/filial/privolzhe/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/privolzhe/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/privolzhe/rss.xml"
									},
									{
										text: "Северо-Запад",
										rss: "/org/filial/szapad/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/szapad/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/szapad/rss.xml"
									},
									{
										text: "Сибирь",
										rss: "/org/filial/sibir/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/sibir/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/sibir/rss.xml"
									},
									{
										text: "Средняя Волга",
										rss: "/org/filial/svolga/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/svolga/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/svolga/rss.xml"
									},
									{
										text: "Урал и Западная Сибирь",
										rss: "/org/filial/ural/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/ural/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/ural/rss.xml"
									},
									{
										text: "Центральная Россия",
										rss: "/org/filial/roscentr/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/roscentr/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/roscentr/rss.xml"
									},
									{
										text: "Юг России",
										rss: "/org/filial/jugrossii/rss.xml",
										yandex: "http://lenta.yandex.ru/settings.xml?name=feed&url=//rg.ru/org/filial/jugrossii/rss.xml",
										google: "http://www.google.com/reader/view/feed///rg.ru/org/filial/jugrossii/rss.xml"
									}
								]
							}
						]
					}
				]
			},
			itemSoc: {
				title: "«Российская газета» в социальных сетях",
				cols: [
					{
						item: [
							{
								title:
								{
									itemClass: "vk",
									text: "Вконтакте"
								},
								link: [
									{
										href: "http://vk.com/rgru",
										text: "Российская газета"
									},
									{
										href: "http://vk.com/pravoznat",
										text: "РГ: Право знать"
									},
									{
										href: "https://vk.com/rgru_sport",
										text: "РГ: Спорт"
									},
									{
										href: "https://vk.com/rgsila",
										text: "РГ: Русское оружие"
									},
									{
										href: "https://vk.com/cinemacracy",
										text: "РГ: Кинократия"
									},
									{
										href: "https://vk.com/rgrodina",
										text: "Журнал \"Родина\""
									},
									/*{
										href: "http://vk.com/rg_iskusstvo",
										text: "Искусство видеть"
									},
									{
										href: "http://vk.com/rg_neformat",
										text: "Неформат"
									},*/
									{
										href: "https://vk.com/rg_cfo",
										text: "Новости ЦФО"
									},
									{
										href: "https://vk.com/rg_ufo",
										text: "Новости Ростова-на-Дону"
									},
									{
										href: "https://vk.com/rg_sfo",
										text: "Новости Новосибирска"
									},
									{
										href: "https://vk.com/rg_urfo",
										text: "Новости Екатеринбурга"
									},
									{
										href: "https://vk.com/rosgazufa",
										text: "Новости Уфы"
									},
									{
										href: "https://vk.com/rg_dfo",
										text: "Новости Хабаровска"
									},
									{
										href: "https://vk.com/rosgazvolga",
										text: "Новости Казани"
									},
									{
										href: "https://vk.com/rg_szfo",
										text: "Новости Санкт-Петербурга"
									},
									{
										href: "https://vk.com/rg_kfo",
										text: "Новости Симферополя"
									}
									/*{
										href: "http://vk.com/rg_skfo",
										text: "Северный Кавказ"
									},
									{
										href: "http://vk.com/rg_pfo",
										text: "Приволжье"
									}*/
								]
							}

						]
					},
					{
						item: [
							{
								title:
									{
										itemClass: "facebook",
										text: "Facebook"
									},
								link: [
									{
										href: "http://www.facebook.com/www.rg.ru",
										text: "Российская Газета"
									},
									{
										href: "https://www.facebook.com/pravoznat/",
										text: "РГ: Право знать"
									},
									{
										href: "https://www.facebook.com/rgru.sport/",
										text: "РГ: Спорт"
									},
									{
										href: "https://www.facebook.com/RG-Digital-622259384561100/",
										text: "RG Digital"
									},
									{
										href: "https://www.facebook.com/rgsila/",
										text: "РГ: Русское оружие"
									},
									{
										href: "https://www.facebook.com/rg.iskusstvo",
										text: "РГ: Кинократия"
									},
									{
										href: "https://www.facebook.com/rodina.rg.ru/",
										text: "Журнал \"Родина\""
									},
									{
										href: "https://www.facebook.com/rgrunners/",
										text: "РГ: Пора бежать"
									}
									/*{
										href: "http://www.facebook.com/rg.iskusstvo",
										text: "Искусство видеть"
									}*/
								]
							},
							{
								title:
									{
										itemClass: "ok",
										text: "Одноклассники"
									},
								link: [
									/*{
										href: "http://www.odnoklassniki.ru/group/50915241820226",
										text: "РГ в Одноклассниках"
									}*/
									{
										href: "http://www.ok.ru/rg.ru/topics",
										text: "Российская Газета"
									}
								]
							},
							{
								title:
									{
										itemClass: "google",
										text: "Google+"
									},
								link: [
									{
										href: "https://plus.google.com/117827783884199956272/posts",
										text: "Российская Газета"
									}
								]
							},
							{
								title:
									{
										itemClass: "instagram",
										text: "Instagram"
									},
								link: [
									{
										href: "http://instagram.com/online_rg",
										text: "Российская Газета"
									},
									{
										href: "http://instagram.com/rgrunners",
										text: "РГ: Пора бежать"
									}
								]
							}
						]
					},
					{
						item: [
							{
								title:
								{
									itemClass: "youtube",
									text: "Youtube"
								},
								link: [
									/*{
										href: "http://www.youtube.com/user/videorgru",
										text: "Видеоматериалы РГ"
									}*/
									{
										href: "https://www.youtube.com/channel/UClKBOVJcZdQUZ23hIKlo4zw",
										text: "Российская Газета"
									}
								]
							},
							{
								title:
									{
										itemClass: "twitter",
										text: "Twitter"
									},
								link: [
									{
										href: "http://twitter.com/#!/rgrus",
										text: "Российская Газета"
									},
									{
										href: "https://twitter.com/HistoryRodina",
										text: "Журнал \"Родина\""
									},
									{
										href: "http://twitter.com/rgrunners",
										text: "РГ: Пора бежать"
									},
									{
										href: "http://twitter.com/#!/rg_gos",
										text: "Власть"
									},
									{
										href: "http://twitter.com/#!/rg_nalogi",
										text: "Налоги"
									},
									{
										href: "http://twitter.com/#!/rg_zakon",
										text: "Законы"
									},
									{
										href: "http://twitter.com/#!/rg_sila",
										text: "Силовой блок"
									},
									{
										href: "http://twitter.com/#!/rg_avto",
										text: "Авто"
									},
									{
										href: "http://twitter.com/#!/rg_internet",
										text: "Интернет"
									},
									{
										href: "http://twitter.com/#!/rg_business",
										text: "Бизнес"
									},
									{
										href: "http://twitter.com/#!/rg_incident",
										text: "Происшествия"
									},
									{
										href: "http://twitter.com/#!/rg_foto",
										text: "Фото"
									},
									{
										href: "http://twitter.com/#!/rg_sport",
										text: "Спорт"
									},
									{
										href: "http://twitter.com/#!/rg_football",
										text: "Футбол"
									}
								]
							}
							/*{
								title:
								{
									itemClass: "pinterest",
									text: "Pinterest"
								},
								link: [
									{
										href: "http://pinterest.com/rgru/",
										text: "РГ на Pinterest"
									}
								]
							},
							{
								title:
								{
									itemClass: "livejournal",
									text: "Livejournal"
								},
								link: [
									{
										href: "http://rgru.livejournal.com/",
										text: "РГ в LiveJournal"
									}
								]
							}*/
						]
					},
					{
						item: [
							{
								link: [
									{
										href: "http://twitter.com/rg_cfo",
										text: "Центр России"
									},
									{
										href: "http://twitter.com/rg_szfo",
										text: "Северо-Запад"
									},
									{
										href: "http://twitter.com/rg_ufo",
										text: "Юг России"
									},
									{
										href: "http://twitter.com/rg_skfo",
										text: "Северный Кавказ"
									},
									{
										href: "http://twitter.com/rg_pfo",
										text: "Приволжье"
									},
									{
										href: "http://twitter.com/rg_urfo",
										text: "Урал"
									},
									{
										href: "http://twitter.com/rg_sfo",
										text: "Сибирь"
									},
									{
										href: "http://twitter.com/rg_dfo",
										text: "Дальний Восток"
									}
								]
							},
							{
								title:
								{
									itemClass: "telegram",
									text: "Telegram"
								},
								link: [
									{
										href: "https://telegram.me/rgrunews",
										text: "Российская Газета | Новости"
									},
									{
										href: "https://telegram.me/rgdigital",
										text: "RG Digital | Новости технологий"
									},
									{
										href: "http://telegram.me/rgruavto",
										text: "РГ Авто | Новости для автолюбителей"
									},
									{
										href: "https://telegram.me/cinemacracy",
										text: "\"Кинократия\""
									}
								]
							}
						]
					}
				]
			}
		}
	};