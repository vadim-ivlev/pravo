/**
 * Created by esolovyev on 25.11.2015.
 */

/**
 * Конфигурационный
 * @type {string}
 */
var Config = {

        // Фильры страницы документов
        documentsFilters: {
            themes: [

                {
                    value: 'tema/gos',
                    name: 'Власть'
                },
                {
                    value: 'tema/ekonomika',
                    name: 'Экономика'
                },
                {
                    value: 'tema/regional',
                    name: 'В регионах'
                },
                {
                    value: 'tema/mir',
                    name: 'В мире'
                },
                {
                    value: 'tema/bezopasnost',
                    name: 'Происшествия'
                },
                {
                    value: 'tema/obshestvo',
                    name: 'Общество'
                },
                {
                    value: 'tema/sport',
                    name: 'Спорт'
                },
                {
                    value: 'tema/kultura',
                    name: 'Культура'
                }
            ],
            org: [
                {
                    name: 'Все ведомства',
                    value: 'all',
                    check: true,
                    
                },
                {
                    name: 'Президент',
                    value: 'org/prezident',
                    subDepartments: [
                        {
                            name: 'Администрация Президента',
                            value: 'org/prezident/admin',
                            
                            
                        },
                        {
                            name: 'Совет Безопасности',
                            value: 'org/prezident/sovbez',
                            
                            
                        },
                        {
                            name: 'Государственный Совет',
                            value: 'org/prezident/gossovet',
                            
                            
                        },
                        {
                            name: 'Полпреды Президента в федеральных округах',
                            value: 'org/prezident/polpred',
                            
                            
                        },
                        {
                            name: 'Главное управление специальных программ',
                            value: 'org/prezident/gusp',
                            
                            
                        },
                        {
                            name: 'Общественная палата',
                            value: 'org/prezident/palata',
                            
                            
                        },
                        {
                            name: 'Совет по правам человека',
                            value: 'org/prezident/sovet',
                            
                            
                        },
                        {
                            name: 'Уполномоченный по правам ребенка',
                            value: 'org/prezident/detombudsmen',
                            
                            
                        },
                        {
                            name: 'Уполномоченный по правам человека',
                            value: 'org/prezident/prava',
                            
                            
                        },
                        {
                            name: 'Управление делами Президента',
                            value: 'org/prezident/upravdelami',
                            
                            
                        }
                    ]
                },
                {
                    name: 'Законодательная власть',
                    value: 'org/zakon',
                    subDepartments: [
                        {
                            name: 'Госдума',
                            value: 'org/zakon/gosduma',
                            
                            
                        },
                        {
                            name: 'Совет Федерации',
                            value: 'org/zakon/sovfed',
                            
                            
                        }
                    ]
                },
                {
                    name: 'Правительство',
                    value: 'org/pravitelstvo',
                    subDepartments: [
                        {
                            name: 'Председатель Правительства',
                            value: 'org/pravitelstvo/premier',
                            
                            
                        },
                        {
                            name: 'Вице-премьеры',
                            value: 'org/pravitelstvo/vicepremijery',
                            
                            
                        },
                        {
                            name: 'Президиум',
                            value: 'org/pravitelstvo/prezidium',
                            
                            
                        },
                        {
                            name: 'Аппарат Правительства',
                            value: 'org/pravitelstvo/apparat',
                            
                            
                        },
                        {
                            name: 'Министерство иностранных дел',
                            value: 'org/pravitelstvo/mid',
                            
                            
                        },
                        {
                            name: 'Государственная фельдъегерская служба (ГФС)',
                            value: 'org/pravitelstvo/feldegeri',
                            
                            
                        },
                        {
                            name: 'Служба внешней разведки (СВР)',
                            value: 'org/pravitelstvo/razvedka',
                            
                            
                        },
                        {
                            name: 'Федеральная служба охраны (ФСО)',
                            value: 'org/pravitelstvo/fso',
                            
                            
                        },
                        {
                            name: 'Федеральная служба по финансовому мониторингу (Росфинмониторинг)',
                            value: 'org/pravitelstvo/fedmonitoring',
                            
                            
                        },
                        {
                            name: 'Генеральная прокуратура',
                            value: 'org/pravitelstvo/genprok',
                            
                            
                        },
                        {
                            name: 'Следственный комитет (СК)',
                            value: 'org/pravitelstvo/sledkom',
                            
                            
                        },
                        {
                            name: 'Министерство культуры',
                            value: 'org/pravitelstvo/minkultmk',
                            
                            
                        },
                        {
                            name: 'Министерство по делам Крыма',
                            value: 'org/pravitelstvo/minkrym',
                            
                            
                        },
                        {
                            name: 'Министерство по делам Северного Кавказа',
                            value: 'org/pravitelstvo/minsevkavkaz',
                            
                            
                        },
                        {
                            name: 'Министерство по развитию Дальнего Востока',
                            value: 'org/pravitelstvo/daliniy',
                            
                            
                        },
                        {
                            name: 'Министерство спорта',
                            value: 'org/pravitelstvo/minsport',
                            
                            
                        },
                        {
                            name: 'Министерство строительства и жилищно-коммунального хозяйства (Минстрой)',
                            value: 'org/pravitelstvo/stroitelstvozhkh',
                            
                            
                        },
                        {
                            name: 'Министерство транспорта',
                            value: 'org/pravitelstvo/mintranssvyaz',
                            
                            
                        },
                        {
                            name: 'Министерство труда и социальной защиты',
                            value: 'org/pravitelstvo/trud',
                            
                            
                        },
                        {
                            name: 'Министерство энергетики',
                            value: 'org/pravitelstvo/minenergo',
                            
                            
                        },
                        {
                            name: 'Федеральная антимонопольная служба (ФАС)',
                            value: 'org/pravitelstvo/fedantimonopol',
                            
                            
                        },
                        {
                            name: 'Федеральная служба государственной статистики (Росстат)',
                            value: 'org/pravitelstvo/statistika',
                            
                            
                        },
                        {
                            name: 'Федеральная миграционная служба (ФМС)',
                            value: 'org/pravitelstvo/migracia',
                            
                            
                        },
                        {
                            name: 'Федеральная служба по надзору в сфере защиты прав потребителей и благополучия человека (Роспотребнадзор)',
                            value: 'org/pravitelstvo/potrebnadzor',
                            
                            
                        },
                        {
                            name: 'Рособоронзаказ',
                            value: 'org/pravitelstvo/oboronzakaz',
                            
                            
                        },
                        {
                            name: 'Федеральная служба по регулированию алкогольного рынка (Росалкогольрегулирование)',
                            value: 'org/pravitelstvo/posalk',
                            
                            
                        },
                        {
                            name: 'Федеральная служба по финансовым рынкам (ФСФР)',
                            value: 'org/pravitelstvo/fktsb',
                            
                            
                        },
                        {
                            name: 'Федеральная служба по экологическому, технологическому и атомному надзору (Ростехнадзор)',
                            value: 'org/pravitelstvo/atom',
                            
                            
                        },
                        {
                            name: 'Федеральное космическое агентство (Роскосмос)',
                            value: 'org/pravitelstvo/kosmos',
                            
                            
                        },
                        {
                            name: 'Федеральное агентство по обустройству государственной границы (Росграница)',
                            value: 'org/pravitelstvo/rosgranica',
                            
                            
                        },
                        {
                            name: 'Федеральное агентство научных организаций (ФАНО)',
                            value: 'org/pravitelstvo/fano',
                            
                            
                        },
                        {
                            name: 'Министерство внутренних дел',
                            value: 'org/pravitelstvo/mvd',
                            
                            
                        },
                        {
                            name: 'Министерство по чрезвычайным ситуациям',
                            value: 'org/pravitelstvo/emercom',
                            
                            
                        },
                        {
                            name: 'Министерство обороны',
                            value: 'org/pravitelstvo/minoboroni',
                            
                            
                        },
                        {
                            name: 'Министерство юстиции',
                            value: 'org/pravitelstvo/minyust',
                            
                            
                        },
                        {
                            name: 'Федеральная служба безопасности (ФСБ)',
                            value: 'org/pravitelstvo/fsb',
                            
                            
                        },
                        {
                            name: 'Федеральная служба по контролю за оборотом наркотиков (ФСКН)',
                            value: 'org/pravitelstvo/narkomitet',
                            
                            
                        },
                        {
                            name: 'Министерство здравоохранения и социального развития',
                            value: 'org/pravitelstvo/minzdravsoc',
                            
                            
                        },
                        {
                            name: 'Министерство образования и науки',
                            value: 'org/pravitelstvo/minobrnauka',
                            
                            
                        },
                        {
                            name: 'Министерство природных ресурсов и экологии',
                            value: 'org/pravitelstvo/minprirody',
                            
                            
                        },
                        {
                            name: 'Министерство промышленности и торговли',
                            value: 'org/pravitelstvo/minpromenergo',
                            
                            
                        },
                        {
                            name: 'Министерство регионального развития',
                            value: 'org/pravitelstvo/minreg',
                            
                            
                        },
                        {
                            name: 'Министерство связи и массовых коммуникаций',
                            value: 'org/pravitelstvo/svyazj',
                            
                            
                        },
                        {
                            name: 'Министерство сельского хозяйства',
                            value: 'org/pravitelstvo/minselhoz',
                            
                            
                        },
                        {
                            name: 'Министерство финансов',
                            value: 'org/pravitelstvo/minfin',
                            
                            
                        },
                        {
                            name: 'Министерство экономического развития',
                            value: 'org/pravitelstvo/minekonom',
                            
                            
                        },
                        {
                            name: 'Федеральная таможенная служба (ФТС)',
                            value: 'org/pravitelstvo/fts',
                            
                            
                        },
                        {
                            name: 'Федеральная служба по тарифам (ФСТ)',
                            value: 'org/pravitelstvo/slujba-tarif',
                            
                            
                        }
                    ]
                },
                {
                    name: 'Судебная власть',
                    value: 'org/sudvlast',
                    subDepartments: [
                        {
                            name: 'Конституционный суд',
                            value: 'org/sudvlast/konstsud',
                            
                            
                        },
                        {
                            name: 'Верховный суд',
                            value: 'org/sudvlast/sudobshyurisdik/verhsud',
                            
                            
                        },
                        {
                            name: 'Суды общей юрисдикции',
                            value: 'org/sudvlast/sudobshyurisdik',
                            
                            
                        },
                        {
                            name: 'Военные суды',
                            value: 'org/sudvlast/voensud',
                            
                            
                        }
                    ]
                },
                {
                    name: 'Госфонды и контрольные органы',
                    value: 'org/goskontrol',
                    subDepartments: [
                        {
                            name: 'Агентство стратегических инициатив',
                            value: 'org/goskontrol/asi',
                        },
                        {
                            name: 'Российский фонд прямых инвестиций',
                            value: 'org/goskontrol/investicii',

                        },
                        {
                            name: 'Российский фонд федерального имущества (РФФИ)',
                            value: 'org/goskontrol/gosfond',

                        },
                        {
                            name: 'Счетная палата',
                            value: 'org/goskontrol/schet',

                        },
                        {
                            name: 'Пенсионный фонд',
                            value: 'org/goskontrol/pensii',
                        },
                        {
                            name: 'Федеральный фонд обязательного медицинского страхования',
                            value: 'org/goskontrol/ffomc',
                        },
                        {
                            name: 'Фонд социального страхования',
                            value: 'org/goskontrol/sotcial',
                        },
                        {
                            name: 'Центральная избирательная комиссия',
                            value: 'org/goskontrol/cik',
                        },
                        {
                            name: 'Центральный банк России',
                            value: 'org/goskontrol/zbrf',
                        }
                    ]
                }
            ],
            doctype: [
                {
                    name: 'Все типы',
                    value: 'any',
                },
                {
                    name: 'Федеральный закон',
                    value: 'fedzakon',
                },
                {
                    name: 'Постановление',
                    value: 'postanov',
                },
                {
                    name: 'Указ',
                    value: 'ukaz',

                },
                {
                    name: 'Приказ',
                    value: 'prikaz',
                },
                {
                    name: 'Сообщение',
                    value: 'soobshenie',
                },
                {
                    name: 'Распоряжение',
                    value: 'raspr',

                },
                {
                    name: 'Законопроект',
                    value: 'zakonoproekt',
                }
            ],
            statuses: [
                {
                    value: 'publishing',
                    name: 'Опубликован'
                },
                {
                    value: 'effective',
                    name: 'Вступает в силу'
                },
                {
                    value: 'lost',
                    name: 'Утратил силу'
                },
            ]
        },

        // Фильтры страницы поиска
        searchFilters: {
            themes: [

                {
                    value: 'tema/gos',
                    name: 'Власть'
                },
                {
                    value: 'tema/ekonomika',
                    name: 'Экономика'
                },
                {
                    value: 'tema/regional',
                    name: 'В регионах'
                },
                {
                    value: 'tema/mir',
                    name: 'В мире'
                },
                {
                    value: 'tema/bezopasnost',
                    name: 'Происшествия'
                },
                {
                    value: 'tema/obshestvo',
                    name: 'Общество'
                },
                {
                    value: 'tema/sport',
                    name: 'Спорт'
                },
                {
                    value: 'tema/kultura',
                    name: 'Культура'
                }
            ],
            materialTypes: [

                {
                    value: 'art',
                    name: 'Новости'
                },
                {
                    value: 'dok',
                    name: 'Документы'
                },
                {
                    value: 'fot',
                    name: 'Фоторепортажи'
                },
            ],

            origins: [

                {
                    value: 'rg',
                    name: 'Российская газета'
                },
                {
                    value: 'rodina',
                    name: 'Родина'
                },
            ],

            projects: [

                {
                    value: 'sila',
                    name: 'Русское оружие'
                },
                {
                    value: 'digital',
                    name: 'Digital'
                },
                {
                    value: 'kino',
                    name: 'Кинократия'
                }
            ],

            periods: [
                {
                    value: 'any',
                    name: 'Любой'
                },
                {
                    value: 'today',
                    name: 'За сегодня'
                },
                {
                    value: 'yestarday',
                    name: 'За вчера'
                },
                {
                    value: 'week',
                    name: 'За неделю'
                },
                {
                    value: 'month',
                    name: 'За месяц'
                },
                {
                    value: 'year',
                    name: 'За год'
                }
            ]

        }
    };

module.exports = Config;
